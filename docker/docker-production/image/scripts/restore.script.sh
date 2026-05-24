#!/bin/bash

set -e

COMPOSE_DIR="./docker-compose-files"
PRODUCTION_COMPOSE="${COMPOSE_DIR}/docker-compose.production.yml"
CONTAINER_NAME="sdux-production"
CONTAINER_PORT="3100"

clear; 

printf "\n\n♻️ Promoting restore to production...\n\n\n"

printf "Docker containers:\n\n"
docker ps -a --filter "name=sdux"

printf "\n\n\n\nDocker images:\n\n"
docker image ls --filter "reference=sdux"

printf "\n\n\n"

# Prompt for the version
read -p "Enter the image version to restore (e.g. v1.3.3): " VERSION_TAG
if [ -z "$VERSION_TAG" ]; then
   printf "\n\n❌ Error: You must provide a version tag. Usage: ./restore.script.sh v1.3.3\n\n"
  exit 1
else
  printf "\nℹ️ Using VERSION_TAG: $VERSION_TAG\n\n"
fi

# Stop production container if running
printf "\n🛑 Stopping sdux-production container...\n\n"
docker stop $CONTAINER_NAME >/dev/null 2>&1 || printf "\n\n ℹ️ No running production container to stop.\n\n"

printf "\n🗑 Removing sdux-production container...\n\n"
docker rm $CONTAINER_NAME >/dev/null 2>&1 || printf "\n\nℹ️ No production container to remove.\n\n"

# Launch production using the tagged image
printf "\n🚀 Starting new production container from version $VERSION_TAG...\n\n"
if env VERSION_TAG="$VERSION_TAG" docker-compose -f "$PRODUCTION_COMPOSE" up -d; then
  printf "\n\n✅ Version $VERSION_TAG successfully restored to production.\n\n"

  printf "🔍 Verifying container is healthy...\n\n"
  printf "Docker container:\n\n"
  docker ps --filter "name=$CONTAINER_NAME"
  printf "\n\n"
  sleep 5

  RESPONSE=$(curl -fsSL http://localhost:$CONTAINER_PORT/ 2>/dev/null)

  if [ -n "$RESPONSE" ]; then
    echo "✅ Health check passed"
  else
    echo "$RESPONSE"
    echo "⚠️ Health check failed"
  fi

  printf "\n\n"
else
  printf "\n\n❌ Failed to promote version $VERSION_TAG to production.\n\n"
  exit 1
fi

