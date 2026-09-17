#!/bin/bash

set -e

SCRIPT_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIRECTORY/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  printf "\n❌ Required environment file not found: %s\n\n" "$ENV_FILE"
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

for required_variable in COMPOSE_PATH CONTAINER_PREFIX IMAGE_LABEL CONTAINER_PORT HEALTH_CHECK_API; do
  if [[ -z "${!required_variable:-}" ]]; then
    printf "\n❌ %s is not set in %s\n\n" "$required_variable" "$ENV_FILE"
    exit 1
  fi
done

COMPOSE_FILE="${COMPOSE_FILE:-$COMPOSE_PATH/docker-compose.production.yml}"
CONTAINER_NAME="$CONTAINER_PREFIX"
SHARED_INDEX_PATH="${SHARED_INDEX_PATH:-}"

clear
printf "\n\n🚀 Promoting specified %s image to production...\n\n\n" "$IMAGE_LABEL"

printf "All %s Docker containers:\n\n" "$IMAGE_LABEL"
docker ps -a --filter "name=$CONTAINER_NAME"

printf "\n\n"
CONTAINER_PORT="3100"
HEALTH_CHECK_API="/"
HEALTH_CHECK_STATUS=""

printf "\n\n\n\n%s Docker images:\n\n" "$IMAGE_LABEL"
mapfile -t image_tags < <(docker image ls --format '{{.Repository}} {{.Tag}}' | grep -E "^(${CONTAINER_NAME}) v" | awk '{print $2}')

if [ ${#image_tags[@]} -eq 0 ]; then
  printf "⚠️ No %s images found for ${CONTAINER_NAME}.\n\n" "$IMAGE_LABEL"
  exit 1
fi

for i in "${!image_tags[@]}"; do
  echo "$((i+1)). ${IMAGE_LABEL} ${image_tags[$i]}"
done

printf "\n\n"

# Prompt for the version
read -p "Enter the number of the ${IMAGE_LABEL} image to promote to production (x to exit): " selection

if [[ "$selection" == "x" || "$selection" == "X" ]]; then
  printf "\n\nGood-bye from %s production promotion.\n\n" "$IMAGE_LABEL"
  exit 0
fi

if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt ${#image_tags[@]} ]; then
  printf "\n\n❌ Invalid %s image selection.\n\n" "$IMAGE_LABEL"
  exit 1
fi

VERSION_TAG="${image_tags[$((selection-1))]}"
printf "\nℹ️ Using %s VERSION_TAG: %s\n\n" "$IMAGE_LABEL" "$VERSION_TAG"

if [[ -n "$SHARED_INDEX_PATH" ]]; then
  # Publish the generated index before the frontend container starts with its
  # read-only bind mount. Projects without this setting skip this step.
  printf "\n📄 Publishing the generated %s production index...\n\n" "$IMAGE_LABEL"
  SHARED_INDEX_DIR=$(dirname "$SHARED_INDEX_PATH")
  mkdir -p "$SHARED_INDEX_DIR"

  if [ -d "$SHARED_INDEX_PATH" ]; then
    rmdir "$SHARED_INDEX_PATH" 2>/dev/null || {
      printf "\n\n❌ Expected the %s index file but found a non-empty directory: %s\n\n" "$IMAGE_LABEL" "$SHARED_INDEX_PATH"
      exit 1
    }
  fi

  INDEX_BOOTSTRAP_CONTAINER="${CONTAINER_NAME}-index-bootstrap-$$"
  docker create --name "$INDEX_BOOTSTRAP_CONTAINER" "${CONTAINER_NAME}:${VERSION_TAG}" >/dev/null
  docker cp \
    "$INDEX_BOOTSTRAP_CONTAINER:/usr/share/nginx/html/index.html" \
    "$SHARED_INDEX_PATH"
  docker rm "$INDEX_BOOTSTRAP_CONTAINER" >/dev/null

  if [ ! -s "$SHARED_INDEX_PATH" ]; then
    printf "\n\n❌ Generated %s production index is missing or empty: %s\n\n" "$IMAGE_LABEL" "$SHARED_INDEX_PATH"
    exit 1
  fi

  printf "✅ Published %s production index: %s\n\n" "$IMAGE_LABEL" "$SHARED_INDEX_PATH"
fi

# Step 3: Stop and remove existing container if running
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}-staging$"; then
  printf "\n🛑 Stopping existing %s staging container: ${CONTAINER_NAME}-staging\n\n" "$IMAGE_LABEL"
  docker stop "${CONTAINER_NAME}-staging" >/dev/null 2>&1 || printf "\n\nℹ️ No running %s staging container to stop.\n\n" "$IMAGE_LABEL"

  printf "\n🗑  Removing existing %s staging container: ${CONTAINER_NAME}-staging\n\n" "$IMAGE_LABEL"
  docker rm "${CONTAINER_NAME}-staging" >/dev/null 2>&1 || printf "\n\nℹ️ No %s staging container to remove.\n\n" "$IMAGE_LABEL"
else
  printf "\nℹ️ No existing %s staging container named ${CONTAINER_NAME}-staging. Skipping stop/remove.\n\n" "$IMAGE_LABEL"
fi


if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}-production$"; then
  # Stop and remove production container
  printf "\n🛑 Stopping existing %s production container: ${CONTAINER_NAME}-production\n\n" "$IMAGE_LABEL"
  docker stop "${CONTAINER_NAME}-production" >/dev/null 2>&1 || printf "\n\nℹ️ No running %s production container to stop.\n\n" "$IMAGE_LABEL"

  printf "\n🛑 REMOVING existing %s production container: ${CONTAINER_NAME}-production\n\n" "$IMAGE_LABEL"
  docker rm "${CONTAINER_NAME}-production" >/dev/null 2>&1 || printf "\n\nℹ️ No %s production container to remove.\n\n" "$IMAGE_LABEL"
else
  printf "\nℹ️ No existing %s production container named ${CONTAINER_NAME}-production. Skipping stop/remove.\n\n" "$IMAGE_LABEL"
fi

# Launch production using the tagged image
printf "\n🚀 Starting new %s production container from version %s...\n\n" "$IMAGE_LABEL" "$VERSION_TAG"
echo $COMPOSE_FILE

if env VERSION_TAG="$VERSION_TAG" CONTAINER_NAME="$CONTAINER_NAME" docker-compose -f "$COMPOSE_FILE" up -d; then
  printf "✅ %s version %s successfully promoted to production.\n\n" "$IMAGE_LABEL" "$VERSION_TAG"

  printf "🔍 Verifying %s production container is healthy...\n\n" "$IMAGE_LABEL"
  printf "%s Docker container:\n\n" "$IMAGE_LABEL"
  docker ps --filter "name=$CONTAINER_NAME"
  printf "\n\n"
  sleep 5

  RESPONSE=$(curl -sSL -w "%{http_code}" -o /tmp/health_response.txt http://localhost:$CONTAINER_PORT$HEALTH_CHECK_API 2>/dev/null)
  BODY=$(cat /tmp/health_response.txt)

  if [ "$RESPONSE" = "200" ] && {
    [[ -z "${HEALTH_CHECK_STATUS:-}" ]] ||
      echo "$BODY" | grep -q '"status":"'"$HEALTH_CHECK_STATUS"'"';
  }; then
    echo "✅ ${IMAGE_LABEL} health check passed"
  else
    echo "⚠️ ${IMAGE_LABEL} health check failed"
    echo "${IMAGE_LABEL} response ($RESPONSE): $BODY"
  fi

  printf "\n\n"
else
  printf "\n\n❌ Failed to promote %s version %s to production.\n\n" "$IMAGE_LABEL" "$VERSION_TAG"
  exit 1
fi
