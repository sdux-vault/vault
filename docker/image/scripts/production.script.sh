#!/bin/bash

set -e

COMPOSE_PATH="./docker-compose-files"
COMPOSE_FILE="$COMPOSE_PATH/docker-compose.production.yml"
CONTAINER_NAME="sdux"

clear; 
printf "\n\n🚀 Promoting specified image to production...\n\n\n"

printf "Docker containers:\n\n"
docker ps -a --filter "name=$CONTAINER_NAME"

printf "\n\n"
CONTAINER_PORT="3100"
HEALTH_CHECK_API="/"
HEALTH_CHECK_STATUS=""

printf "\n\n\n\nDocker images:\n\n"
mapfile -t image_tags < <(docker image ls --format '{{.Repository}} {{.Tag}}' | grep -E "^(${CONTAINER_NAME}) v" | awk '{print $2}')

if [ ${#image_tags[@]} -eq 0 ]; then
  printf "⚠️ No images found for ${CONTAINER_NAME}.\n\n"
  exit 1
fi

for i in "${!image_tags[@]}"; do
  echo "$((i+1)). ${CONTAINER_NAME} ${image_tags[$i]}"
done

printf "\n\n"

# Prompt for the version
read -p "Enter the number of the image to promote to production (x to exit): " selection

if [[ "$selection" == "x" || "$selection" == "X" ]]; then
  printf "\n\nGood-bye.\n\n"
  exit 0
fi

if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt ${#image_tags[@]} ]; then
  printf "\n\n❌ Invalid selection.\n\n"
  exit 1
fi

VERSION_TAG="${image_tags[$((selection-1))]}"
printf "\nℹ️ Using VERSION_TAG: $VERSION_TAG\n\n"


# Step 3: Stop and remove existing container if running
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}-staging$"; then
  printf "\n🛑 Stopping existing container: ${CONTAINER_NAME}-staging\n\n"
  docker stop "${CONTAINER_NAME}-staging" >/dev/null 2>&1 || printf "\n\nℹ️ No running staging container to stop.\n\n"

  printf "\n🗑  Removing existing container: ${CONTAINER_NAME}-staging\n\n"
  docker rm "${CONTAINER_NAME}-staging" >/dev/null 2>&1 || printf "\n\nℹ️ No running staging container to remove.\n\n"
else
  printf "\nℹ️ No existing container named ${CONTAINER_NAME}-staging. Skipping stop/remove.\n\n"
fi


if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}-production$"; then
  # Stop and remove production container
  printf "\n🛑 Stopping existing container: ${CONTAINER_NAME}-production\n\n"
  docker stop "${CONTAINER_NAME}-production" >/dev/null 2>&1 || printf "\n\nℹ️ No running production container to stop.\n\n"

  printf "\n🛑 REMOVING existing container: ${CONTAINER_NAME}-production\n\n"
  docker rm "${CONTAINER_NAME}-production" >/dev/null 2>&1 || printf "\n\nℹ️ No production container to remove.\n\n"
else
  printf "\nℹ️ No existing container named ${CONTAINER_NAME}-production. Skipping stop/remove.\n\n"
fi

# Launch production using the tagged image
printf "\n🚀 Starting new production container from version $VERSION_TAG...\n\n"
echo $COMPOSE_FILE

if env VERSION_TAG="$VERSION_TAG" CONTAINER_NAME="$CONTAINER_NAME" docker-compose -f "$COMPOSE_FILE" up -d; then
  printf "✅ Version $VERSION_TAG successfully promoted to production.\n\n"

  printf "🔍 Verifying container is healthy...\n\n"
  printf "Docker container:\n\n"
  docker ps --filter "name=$CONTAINER_NAME"
  printf "\n\n"
  sleep 5

  RESPONSE=$(curl -sSL -w "%{http_code}" -o /tmp/health_response.txt http://localhost:$CONTAINER_PORT$HEALTH_CHECK_API 2>/dev/null)
  BODY=$(cat /tmp/health_response.txt)

  if [ "$RESPONSE" = "200" ]; then
    echo "✅ Health check passed"
  else
    echo "⚠️ Health check failed"
    echo "Response ($RESPONSE): $BODY"
  fi

  printf "\n\n"
else
  printf "\n\n❌ Failed to promote version $VERSION_TAG to production.\n\n"
  exit 1
fi
