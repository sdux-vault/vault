#!/bin/bash

set -e

COMPOSE_DIR="./docker-compose-files"
BACKUP_COMPOSE="${COMPOSE_DIR}/docker-compose.backup.yml"
IMAGE_NAME="sdux"
CONTAINER_NAME="sdux-backup"
CONTAINER_PORT="5100"
SHARED_INDEX_PATH="/home/bitnami/docker-production/sdux-angular/shared/index.backup.html"

clear; 
printf "\n\n🚀 Mounting specified image to backup ...\n\n\n"

printf "Docker containers:\n\n"
docker ps -a --filter "name=$IMAGE_NAME"

printf "\n\n\n\nDocker images:\n\n"
mapfile -t image_tags < <(docker image ls --format '{{.Repository}} {{.Tag}}' | grep -E "^(${IMAGE_NAME}) v" | awk '{print $2}')

if [ ${#image_tags[@]} -eq 0 ]; then
  printf "⚠️ No images found for ${IMAGE_NAME}.\n\n"
  exit 1
fi

for i in "${!image_tags[@]}"; do
  echo "$((i+1)). ${IMAGE_NAME} ${image_tags[$i]}"
done

printf "\n\n"

# Prompt for the version
read -p "Enter the number of the image to mount for backup (x to exit): " selection

if [[ "$selection" == "x" || "$selection" == "X" ]]; then
  printf "\n\nGood-bye.\n\n"
  exit 0
fi

if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt ${#image_tags[@]} ]; then
  printf "\n\n❌ Invalid selection.\n\n"
  exit 1
fi

VERSION_TAG="${image_tags[$((selection-1))]}"
printf "\n📦 Using version tag: $VERSION_TAG\n\n"

# Publish the generated index for the social metadata service before the
# frontend container starts with its read-only bind mount.
printf "\n📄 Publishing the generated backup index...\n\n"
SHARED_INDEX_DIR=$(dirname "$SHARED_INDEX_PATH")
mkdir -p "$SHARED_INDEX_DIR"

if [ -d "$SHARED_INDEX_PATH" ]; then
  rmdir "$SHARED_INDEX_PATH" 2>/dev/null || {
    printf "\n\n❌ Expected a file but found a non-empty directory: $SHARED_INDEX_PATH\n\n"
    exit 1
  }
fi

INDEX_BOOTSTRAP_CONTAINER="sdux-index-bootstrap-$$"
docker create --name "$INDEX_BOOTSTRAP_CONTAINER" "${IMAGE_NAME}:${VERSION_TAG}" >/dev/null
docker cp \
  "$INDEX_BOOTSTRAP_CONTAINER:/usr/share/nginx/html/index.html" \
  "$SHARED_INDEX_PATH"
docker rm "$INDEX_BOOTSTRAP_CONTAINER" >/dev/null

if [ ! -s "$SHARED_INDEX_PATH" ]; then
  printf "\n\n❌ Generated backup index is missing or empty: $SHARED_INDEX_PATH\n\n"
  exit 1
fi

printf "✅ Published backup index: $SHARED_INDEX_PATH\n\n"

# Stop and remove backup container if running
printf "\n🛑 Stopping sdux-backup container...\n\n"
docker stop sdux-backup >/dev/null 2>&1 || printf "\n\nℹ️ No running backup container to stop.\n\n"

printf "\n 🗑 Removing sdux-backup container...\n\n"
docker rm sdux-backup >/dev/null 2>&1 || printf "\n\nℹ️ No backup container to remove.\n\n"

# Launch backup using the tagged image
printf "\n🚀 Starting new backup container from version $VERSION_TAG...\n\n"
if env VERSION_TAG="$VERSION_TAG" CONTAINER_NAME="$IMAGE_NAME" docker-compose -f "$BACKUP_COMPOSE" up -d; then
  printf "\n\n✅ Version $VERSION_TAG successfully promoted to backup.\n\n"

  printf "🔍 Verifying container is healthy...\n\n"
  printf "Docker container:\n\n"
  docker ps --filter "name=$CONTAINER_NAME"
  printf "\n\n"
  sleep 5

  RESPONSE=$(curl -sSL -w "%{http_code}" -o /tmp/health_response.txt http://localhost:$CONTAINER_PORT/ 2>/dev/null)
  BODY=$(cat /tmp/health_response.txt)

  if [ "$RESPONSE" = "200" ]; then
    echo "✅ Health check passed"
  else
    echo "⚠️ Health check failed"
    echo "Response ($RESPONSE): $BODY"
  fi

  printf "\n\n"
else
  printf "\n\n❌ Failed to promote version $VERSION_TAG to backup.\n\n"
  exit 1
fi
