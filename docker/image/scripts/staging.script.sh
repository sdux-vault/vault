#!/bin/bash

# staging.script.sh — Load and run the staging container with Docker Compose

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

for required_variable in BUILD_PATH COMPOSE_PATH CONTAINER_PREFIX IMAGE_LABEL STAGING_CONTAINER_PORT STAGING_HEALTH_CHECK_API; do
  if [[ -z "${!required_variable:-}" ]]; then
    printf "\n❌ %s is not set in %s\n\n" "$required_variable" "$ENV_FILE"
    exit 1
  fi
done

COMPOSE_FILE="$COMPOSE_PATH/docker-compose.staging.yml"
CONTAINER_NAME="$CONTAINER_PREFIX"
CONTAINER_PORT="$STAGING_CONTAINER_PORT"
HEALTH_CHECK_API="$STAGING_HEALTH_CHECK_API"
HEALTH_CHECK_STATUS="${STAGING_HEALTH_CHECK_STATUS:-}"
SHARED_INDEX_PATH="${STAGING_SHARED_INDEX_PATH:-}"

clear

printf "\n\n♻️ Loading a %s tarfile and staging..." "$IMAGE_LABEL"

printf "\n\n"

printf "All %s Docker containers:\n\n" "$IMAGE_LABEL"
docker ps -a --filter "name=$CONTAINER_NAME"

printf "\n\n\n\n%s Docker images:\n\n" "$IMAGE_LABEL"
docker image ls --format '{{.Repository}} {{.Tag}}' | grep -E "^(${CONTAINER_NAME}) v"

printf "\n\n📂 Available build files in $BUILD_PATH:\n\n"
mapfile -t build_files < <(ls -t "$BUILD_PATH"/"$CONTAINER_NAME"*.tar.gz 2>/dev/null)

if [ ${#build_files[@]} -eq 0 ]; then
  printf "\n\n⚠️ No %s build files found.\n\n" "$IMAGE_LABEL"
  exit 1
fi

for i in "${!build_files[@]}"; do
  size=$(ls -lh "${build_files[$i]}" | awk '{print $5}')
  date=$(ls -lh "${build_files[$i]}" | awk '{print $6, $7, $8}')
  echo "$((i+1)). ${IMAGE_LABEL} $(basename ${build_files[$i]}) ($size, $date)"
done

printf "\n\n"

# Step 0: Check version tag parameter
read -p "Enter the number of the ${IMAGE_LABEL} build to stage (x to exit): " selection

if [[ "$selection" == "x" || "$selection" == "X" ]]; then
  printf "\n\nGood-bye from %s staging.\n\n" "$IMAGE_LABEL"
  exit 0
fi

if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt ${#build_files[@]} ]; then
  printf "\n\n❌ Invalid %s build selection.\n\n" "$IMAGE_LABEL"
  exit 1
fi

TAR_NAME="${build_files[$((selection-1))]}"
VERSION_TAG=$(basename "$TAR_NAME" | sed "s/${CONTAINER_NAME}-//" | sed 's/\.tar\.gz//')
printf "\nℹ️ Using %s VERSION_TAG: %s\n\n" "$IMAGE_LABEL" "$VERSION_TAG"

# Step 1: Validate required files
printf "\nStep 1: Starting %s staging load script...\n\n" "$IMAGE_LABEL"
for file in "$TAR_NAME" "$COMPOSE_FILE"; do
  if [ ! -f "$file" ]; then
    printf "\n\n❌ Required %s staging file not found: %s\n\n" "$IMAGE_LABEL" "$file"
    exit 1
  fi
done

# Step 2: Load the Docker image
printf "\nStep 2: Loading %s Docker image from %s...\n\n" "$IMAGE_LABEL" "$TAR_NAME"
docker load < "$TAR_NAME"

if [[ -n "$SHARED_INDEX_PATH" ]]; then
  # Publish the generated index before the frontend container starts with its
  # read-only bind mount. Projects without this setting skip this step.
  printf "\nStep 3: Publishing the generated %s staging index...\n\n" "$IMAGE_LABEL"
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
    printf "\n\n❌ Generated %s staging index is missing or empty: %s\n\n" "$IMAGE_LABEL" "$SHARED_INDEX_PATH"
    exit 1
  fi

  printf "✅ Published %s staging index: %s\n\n" "$IMAGE_LABEL" "$SHARED_INDEX_PATH"
fi

# Step 4: Stop and remove existing container if running
printf "\n🚀 Launching %s staging container using %s...\n\n" "$IMAGE_LABEL" "$COMPOSE_FILE"

if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}-staging$"; then
  printf "\n🛑 Stopping existing %s staging container: ${CONTAINER_NAME}-staging\n\n" "$IMAGE_LABEL"
  docker stop "${CONTAINER_NAME}-staging" >/dev/null 2>&1 || printf "\n\nℹ️ No running %s staging container to stop.\n\n" "$IMAGE_LABEL"

  printf "\n🗑  Removing existing %s staging container: ${CONTAINER_NAME}-staging\n\n" "$IMAGE_LABEL"
  docker rm "${CONTAINER_NAME}-staging" >/dev/null 2>&1 || printf "\n\nℹ️ No %s staging container to remove.\n\n" "$IMAGE_LABEL"
else
  printf "\nℹ️ No existing %s staging container named ${CONTAINER_NAME}-staging. Skipping stop/remove.\n\n" "$IMAGE_LABEL"
fi

# Step 5: Start new container
printf "\n🚀 Launching %s staging container using %s\n\n" "$IMAGE_LABEL" "$COMPOSE_FILE"
if env VERSION_TAG="$VERSION_TAG" CONTAINER_NAME="$CONTAINER_NAME" docker-compose -f "$COMPOSE_FILE" up -d; then
  printf "\n\n✅ %s staging container started successfully.\n\n" "$IMAGE_LABEL"

  printf "\n%s Docker container:\n\n" "$IMAGE_LABEL"
  docker ps --filter "name=$CONTAINER_NAME"
  printf "\n\n"

  printf "🔍 Verifying %s staging container is healthy...\n\n" "$IMAGE_LABEL"
  sleep 5

  RESPONSE=$(curl -sSL -w "%{http_code}" -o /tmp/health_response.txt http://localhost:$CONTAINER_PORT$HEALTH_CHECK_API 2>/dev/null)
  BODY=$(cat /tmp/health_response.txt)

  if [ "$RESPONSE" = "200" ] && {
    [[ -z "$HEALTH_CHECK_STATUS" ]] ||
      echo "$BODY" | grep -q '"status":"'"$HEALTH_CHECK_STATUS"'"';
  }; then
    echo "✅ ${IMAGE_LABEL} health check passed"
  else
    echo "⚠️ ${IMAGE_LABEL} health check failed"
    echo "${IMAGE_LABEL} response ($RESPONSE): $BODY"
  fi

  printf "\n\n"
else
  printf "❌ Failed to start %s staging container." "$IMAGE_LABEL"
  exit 1
fi

# Return to main menu
exec "$SCRIPT_DIRECTORY/main.script.sh"
