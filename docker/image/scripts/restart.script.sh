#!/bin/bash

# restart.script.sh — Restart a specific SDuX container environment (staging, production, backup)

clear; 
printf "\n\n🚀 Restarting a container ...\n\n\n"

printf "Docker containers:\n\n"
docker ps -a --filter "name=sdux"

COMPOSE_DIR="./docker-compose-files"

printf "\n\n"
read -p "Enter the container to restart [ staging | production | backup ]: " ENVIRONMENT 

if [ -z "$ENVIRONMENT" ] || [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" && "$ENVIRONMENT" != "backup" ]]; then
  printf "\n\n❌ Usage: $0 [ staging | production | backup ]\n\n"
  exit 1
fi

COMPOSE_FILE="$COMPOSE_DIR/docker-compose.$ENVIRONMENT.yml"
CONTAINER_NAME="sdux-$ENVIRONMENT"

if [ ! -f "$COMPOSE_FILE" ]; then
  printf "\n\n❌ Compose file not found: $COMPOSE_FILE\n\n"
  exit 1
fi

if [ "$ENVIRONMENT" = "staging" ]; then
  CONTAINER_PORT=4100
elif [ "$ENVIRONMENT" = "production" ]; then
  CONTAINER_PORT=3100
elif [ "$ENVIRONMENT" = "backup" ]; then
  CONTAINER_PORT=5100
fi

# Extract VERSION_TAG dynamically from the running container's image
VERSION_TAG=$(docker inspect --format='{{.Config.Image}}' "$CONTAINER_NAME" | cut -d':' -f2)

if [ -z "$VERSION_TAG" ]; then
  printf "\n❌ Unable to determine VERSION_TAG from container: $CONTAINER_NAME\n\n"
  exit 1
else
  printf "\nℹ️ Using VERSION_TAG: $VERSION_TAG\n\n"
fi

printf "\n🛑 Stopping container: $CONTAINER_NAME\n\n"
docker stop "$CONTAINER_NAME" >/dev/null 2>&1 || printf "\n\nℹ️ No running container to stop.\n\n"

printf "\n🗑  Removing container: $CONTAINER_NAME\n\n"
docker rm "$CONTAINER_NAME" >/dev/null 2>&1 || printf "\n\nℹ️ No container to remove.\n\n"

printf "\n🚀 Restarting $CONTAINER_NAME with VERSION_TAG=$VERSION_TAG\n\n"

if env VERSION_TAG="$VERSION_TAG" docker-compose -f "$COMPOSE_FILE" up -d; then
  printf "\n\n✅ Restart complete using VERSION_TAG=$VERSION_TAG\n\n"

  printf "Docker container:\n\n"
  docker ps --filter "name=$CONTAINER_NAME"
  printf "\n\n"

  printf "🔍 Verifying container is healthy...\n\n"
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
  printf "\n\n❌ Failed to restart container.\n\n"
  exit 1
fi
