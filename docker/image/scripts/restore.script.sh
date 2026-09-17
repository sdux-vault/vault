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

for required_variable in COMPOSE_PATH IMAGE_REPOSITORY IMAGE_LABEL CONTAINER_PREFIX RESTORE_CONTAINER_PORT RESTORE_HEALTH_CHECK_API; do
  if [[ -z "${!required_variable:-}" ]]; then
    printf "\n❌ %s is not set in %s\n\n" "$required_variable" "$ENV_FILE"
    exit 1
  fi
done

PRODUCTION_COMPOSE="$COMPOSE_PATH/docker-compose.production.yml"
CONTAINER_NAME="${CONTAINER_PREFIX}-production"
CONTAINER_PORT="$RESTORE_CONTAINER_PORT"
HEALTH_CHECK_API="$RESTORE_HEALTH_CHECK_API"
HEALTH_CHECK_STATUS="${RESTORE_HEALTH_CHECK_STATUS:-}"
ENV_FILE_NAME="${RESTORE_ENV_FILE_NAME:-}"

clear

printf "\n\n♻️ Restoring %s to production...\n\n\n" "$IMAGE_LABEL"

printf "All %s Docker containers:\n\n" "$IMAGE_LABEL"
docker ps -a --filter "name=$CONTAINER_PREFIX"

printf "\n\n\n\n%s Docker images:\n\n" "$IMAGE_LABEL"
docker image ls --filter "reference=$IMAGE_REPOSITORY"

printf "\n\n\n"

# Prompt for the version
read -p "Enter the ${IMAGE_LABEL} image version to restore (e.g. v1.3.3): " VERSION_TAG
if [ -z "$VERSION_TAG" ]; then
   printf "\n\n❌ Error: You must provide a %s version tag. Usage: ./restore.script.sh v1.3.3\n\n" "$IMAGE_LABEL"
  exit 1
else
  printf "\nℹ️ Using %s VERSION_TAG: %s\n\n" "$IMAGE_LABEL" "$VERSION_TAG"
fi

printf "\n🛑 Stopping %s production container...\n\n" "$IMAGE_LABEL"
docker stop "$CONTAINER_NAME" >/dev/null 2>&1 || printf "\n\n ℹ️ No running %s production container to stop.\n\n" "$IMAGE_LABEL"

printf "\n🗑 Removing %s production container...\n\n" "$IMAGE_LABEL"
docker rm "$CONTAINER_NAME" >/dev/null 2>&1 || printf "\n\nℹ️ No %s production container to remove.\n\n" "$IMAGE_LABEL"

printf "\n🚀 Starting new %s production container from version %s...\n\n" "$IMAGE_LABEL" "$VERSION_TAG"
if env VERSION_TAG="$VERSION_TAG" CONTAINER_NAME="$IMAGE_REPOSITORY" ENV_FILE_NAME="$ENV_FILE_NAME" docker-compose -f "$PRODUCTION_COMPOSE" up -d; then
  printf "\n\n✅ %s version %s successfully restored to production.\n\n" "$IMAGE_LABEL" "$VERSION_TAG"

  printf "🔍 Verifying %s production container is healthy...\n\n" "$IMAGE_LABEL"
  printf "%s Docker container:\n\n" "$IMAGE_LABEL"
  docker ps --filter "name=$CONTAINER_NAME"
  printf "\n\n"
  sleep 5

  RESPONSE=$(curl -fsSL "http://localhost:$CONTAINER_PORT$HEALTH_CHECK_API" 2>/dev/null)

  if [ -n "$RESPONSE" ] && {
    [[ -z "$HEALTH_CHECK_STATUS" ]] ||
      echo "$RESPONSE" | grep -q '"status":"'"$HEALTH_CHECK_STATUS"'"';
  }; then
    echo "✅ ${IMAGE_LABEL} health check passed"
  else
    echo "$RESPONSE"
    echo "⚠️ ${IMAGE_LABEL} health check failed"
  fi

  printf "\n\n"
else
  printf "\n\n❌ Failed to restore %s version %s to production.\n\n" "$IMAGE_LABEL" "$VERSION_TAG"
  exit 1
fi
