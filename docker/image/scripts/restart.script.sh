#!/bin/bash

# restart.script.sh — Restart a project container environment

SCRIPT_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIRECTORY/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  printf "\n❌ Required environment file not found: %s\n\n" "$ENV_FILE"
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

for required_variable in IMAGE_LABEL IMAGE_REPOSITORY CONTAINER_PREFIX CONTAINER_ENVIRONMENTS RESTART_STAGING_PORT RESTART_PRODUCTION_PORT RESTART_BACKUP_PORT RESTART_HEALTH_CHECK_API; do
  if [[ -z "${!required_variable:-}" ]]; then
    printf "\n❌ %s is not set in %s\n\n" "$required_variable" "$ENV_FILE"
    exit 1
  fi
done

clear
printf "\n\n🚀 Restarting a %s container...\n\n\n" "$IMAGE_LABEL"

printf "All %s Docker containers:\n\n" "$IMAGE_LABEL"
docker ps -a --filter "name=$CONTAINER_PREFIX"

printf "\n\n"
read -p "Enter the ${IMAGE_LABEL} container to restart [ ${CONTAINER_ENVIRONMENTS// / | } ]: " ENVIRONMENT 

if [[ ! " $CONTAINER_ENVIRONMENTS " =~ " $ENVIRONMENT " ]]; then
  printf "\n\n❌ Usage: $0 [ ${CONTAINER_ENVIRONMENTS// / | } ] for %s\n\n" "$IMAGE_LABEL"
  exit 1
fi

COMPOSE_FILE="$COMPOSE_PATH/docker-compose.$ENVIRONMENT.yml"
CONTAINER_NAME="${CONTAINER_PREFIX}-${ENVIRONMENT}"

if [ ! -f "$COMPOSE_FILE" ]; then
  printf "\n\n❌ %s compose file not found: %s\n\n" "$IMAGE_LABEL" "$COMPOSE_FILE"
  exit 1
fi

case "$ENVIRONMENT" in
  staging) CONTAINER_PORT="$RESTART_STAGING_PORT"; ENV_FILE_NAME="$RESTART_STAGING_ENV_FILE_NAME" ;;
  production) CONTAINER_PORT="$RESTART_PRODUCTION_PORT"; ENV_FILE_NAME="$RESTART_PRODUCTION_ENV_FILE_NAME" ;;
  backup) CONTAINER_PORT="$RESTART_BACKUP_PORT"; ENV_FILE_NAME="$RESTART_BACKUP_ENV_FILE_NAME" ;;
esac

# Extract VERSION_TAG dynamically from the running container's image
VERSION_TAG=$(docker inspect --format='{{.Config.Image}}' "$CONTAINER_NAME" | cut -d':' -f2)

if [ -z "$VERSION_TAG" ]; then
  printf "\n❌ Unable to determine the %s VERSION_TAG from container: %s\n\n" "$IMAGE_LABEL" "$CONTAINER_NAME"
  exit 1
else
  printf "\nℹ️ Using %s VERSION_TAG: %s\n\n" "$IMAGE_LABEL" "$VERSION_TAG"
fi

printf "\n🛑 Stopping %s container: %s\n\n" "$IMAGE_LABEL" "$CONTAINER_NAME"
docker stop "$CONTAINER_NAME" >/dev/null 2>&1 || printf "\n\nℹ️ No running %s container to stop.\n\n" "$IMAGE_LABEL"

printf "\n🗑  Removing %s container: %s\n\n" "$IMAGE_LABEL" "$CONTAINER_NAME"
docker rm "$CONTAINER_NAME" >/dev/null 2>&1 || printf "\n\nℹ️ No %s container to remove.\n\n" "$IMAGE_LABEL"

printf "\n🚀 Restarting %s container %s with VERSION_TAG=%s\n\n" "$IMAGE_LABEL" "$CONTAINER_NAME" "$VERSION_TAG"

if env VERSION_TAG="$VERSION_TAG" CONTAINER_NAME="$IMAGE_REPOSITORY" ENV_FILE_NAME="$ENV_FILE_NAME" docker-compose -f "$COMPOSE_FILE" up -d; then
  printf "\n\n✅ %s restart complete using VERSION_TAG=%s\n\n" "$IMAGE_LABEL" "$VERSION_TAG"

  printf "%s Docker container:\n\n" "$IMAGE_LABEL"
  docker ps --filter "name=$CONTAINER_NAME"
  printf "\n\n"

  printf "🔍 Verifying %s container is healthy...\n\n" "$IMAGE_LABEL"
  sleep 5

  RESPONSE=$(curl -fsSL "http://localhost:$CONTAINER_PORT$RESTART_HEALTH_CHECK_API" 2>/dev/null)

  if [ -n "$RESPONSE" ]; then
    echo "✅ ${IMAGE_LABEL} health check passed"
  else
    echo "$RESPONSE"
    echo "⚠️ ${IMAGE_LABEL} health check failed"
  fi

  printf "\n\n"
else
  printf "\n\n❌ Failed to restart %s container.\n\n" "$IMAGE_LABEL"
  exit 1
fi
