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

for required_variable in COMPOSE_PATH IMAGE_REPOSITORY IMAGE_LABEL CONTAINER_PREFIX BACKUP_CONTAINER_PORT BACKUP_HEALTH_CHECK_API; do
  if [[ -z "${!required_variable:-}" ]]; then
    printf "\n❌ %s is not set in %s\n\n" "$required_variable" "$ENV_FILE"
    exit 1
  fi
done

COMPOSE_DIR="$COMPOSE_PATH"
BACKUP_COMPOSE="${COMPOSE_DIR}/docker-compose.backup.yml"
IMAGE_NAME="$IMAGE_REPOSITORY"
CONTAINER_NAME="${CONTAINER_PREFIX}-backup"
CONTAINER_PORT="$BACKUP_CONTAINER_PORT"
HEALTH_CHECK_API="$BACKUP_HEALTH_CHECK_API"
HEALTH_CHECK_STATUS="${BACKUP_HEALTH_CHECK_STATUS:-}"
BACKUP_ENV_FILE_NAME="${BACKUP_ENV_FILE_NAME:-}"
SHARED_INDEX_PATH="${BACKUP_SHARED_INDEX_PATH:-}"

clear
printf "\n\n🚀 Mounting specified %s image to backup ...\n\n\n" "$IMAGE_LABEL"

printf "All %s Docker containers:\n\n" "$IMAGE_LABEL"
docker ps -a --filter "name=$IMAGE_NAME"

printf "\n\n\n\n%s Docker images:\n\n" "$IMAGE_LABEL"
mapfile -t image_tags < <(docker image ls --format '{{.Repository}} {{.Tag}}' | grep -E "^(${IMAGE_NAME}) v" | awk '{print $2}')

if [ ${#image_tags[@]} -eq 0 ]; then
  printf "⚠️ No %s images found.\n\n" "$IMAGE_LABEL"
  exit 1
fi

for i in "${!image_tags[@]}"; do
  echo "$((i+1)). ${IMAGE_LABEL} ${image_tags[$i]}"
done

printf "\n\n"

read -p "Enter the number of the ${IMAGE_LABEL} image to mount for backup (x to exit): " selection

if [[ "$selection" == "x" || "$selection" == "X" ]]; then
  printf "\n\nGood-bye.\n\n"
  exit 0
fi

if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt ${#image_tags[@]} ]; then
  printf "\n\n❌ Invalid %s image selection.\n\n" "$IMAGE_LABEL"
  exit 1
fi

VERSION_TAG="${image_tags[$((selection-1))]}"
printf "\n📦 Using %s version tag: %s\n\n" "$IMAGE_LABEL" "$VERSION_TAG"

if [[ -n "$SHARED_INDEX_PATH" ]]; then
  printf "\n📄 Publishing the generated %s backup index...\n\n" "$IMAGE_LABEL"
  SHARED_INDEX_DIR=$(dirname "$SHARED_INDEX_PATH")
  mkdir -p "$SHARED_INDEX_DIR"

  if [ -d "$SHARED_INDEX_PATH" ]; then
    rmdir "$SHARED_INDEX_PATH" 2>/dev/null || {
      printf "\n\n❌ Expected a file but found a non-empty directory: %s\n\n" "$SHARED_INDEX_PATH"
      exit 1
    }
  fi

  INDEX_BOOTSTRAP_CONTAINER="${CONTAINER_PREFIX}-index-bootstrap-$$"
  docker create --name "$INDEX_BOOTSTRAP_CONTAINER" "${IMAGE_NAME}:${VERSION_TAG}" >/dev/null
  docker cp \
    "$INDEX_BOOTSTRAP_CONTAINER:/usr/share/nginx/html/index.html" \
    "$SHARED_INDEX_PATH"
  docker rm "$INDEX_BOOTSTRAP_CONTAINER" >/dev/null

  if [ ! -s "$SHARED_INDEX_PATH" ]; then
    printf "\n\n❌ Generated %s backup index is missing or empty: %s\n\n" "$IMAGE_LABEL" "$SHARED_INDEX_PATH"
    exit 1
  fi

  printf "✅ Published %s backup index: %s\n\n" "$IMAGE_LABEL" "$SHARED_INDEX_PATH"
fi

printf "\n🛑 Stopping %s backup container...\n\n" "$IMAGE_LABEL"
docker stop "$CONTAINER_NAME" >/dev/null 2>&1 || printf "\n\nℹ️ No running %s backup container to stop.\n\n" "$IMAGE_LABEL"

printf "\n 🗑 Removing %s backup container...\n\n" "$IMAGE_LABEL"
docker rm "$CONTAINER_NAME" >/dev/null 2>&1 || printf "\n\nℹ️ No %s backup container to remove.\n\n" "$IMAGE_LABEL"

printf "\n🚀 Starting new %s backup container from version %s...\n\n" "$IMAGE_LABEL" "$VERSION_TAG"
if env VERSION_TAG="$VERSION_TAG" CONTAINER_NAME="$IMAGE_NAME" ENV_FILE_NAME="$BACKUP_ENV_FILE_NAME" docker-compose -f "$BACKUP_COMPOSE" up -d; then
  printf "\n\n✅ %s version %s successfully promoted to backup.\n\n" "$IMAGE_LABEL" "$VERSION_TAG"

  printf "🔍 Verifying %s backup container is healthy...\n\n" "$IMAGE_LABEL"
  printf "%s Docker container:\n\n" "$IMAGE_LABEL"
  docker ps --filter "name=$CONTAINER_NAME"
  printf "\n\n"
  sleep 5

  RESPONSE=$(curl -sSL -w "%{http_code}" -o /tmp/health_response.txt "http://localhost:$CONTAINER_PORT$HEALTH_CHECK_API" 2>/dev/null)
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
  printf "\n\n❌ Failed to promote %s version %s to backup.\n\n" "$IMAGE_LABEL" "$VERSION_TAG"
  exit 1
fi
