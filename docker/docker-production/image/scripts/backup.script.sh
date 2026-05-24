#!/bin/bash

set -e

COMPOSE_DIR="./docker-compose-files"
BACKUP_COMPOSE="${COMPOSE_DIR}/docker-compose.backup.yml"
IMAGE_NAME="sdux"
CONTAINER_NAME="sdux-backup"
CONTAINER_PORT="5100"

clear; 
printf "\n\n🚀 Mounting specified image to backup ...\n\n\n"

printf "Docker containers:\n\n"
docker ps -a --filter "name=$IMAGE_NAME"

printf "\n\n\n\nDocker images:\n\n"
docker image ls --filter "reference=$IMAGE_NAME"

printf "\n\n"

# Prompt for the version
read -p "Enter the image version to mount for the backup (e.g. v1.3.3): " VERSION_TAG
if [ -z "$VERSION_TAG" ]; then
  printf "\n❌ Error: You must provide a version tag. Usage: ./mount-backup.script.sh v1.3.3\n\n"
  exit 1
else
  printf "\n📦 Using version tag: $VERSION_TAG\n\n"
fi

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
