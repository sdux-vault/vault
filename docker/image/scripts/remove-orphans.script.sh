#!/bin/bash

# remove-orphans.script.sh — Remove stopped project containers

SCRIPT_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIRECTORY/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  printf "\n❌ Required environment file not found: %s\n\n" "$ENV_FILE"
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

for required_variable in IMAGE_LABEL CONTAINER_PREFIX; do
  if [[ -z "${!required_variable:-}" ]]; then
    printf "\n❌ %s is not set in %s\n\n" "$required_variable" "$ENV_FILE"
    exit 1
  fi
done

clear
printf "\n\n🧹 Remove stopped %s containers...\n\n\n" "$IMAGE_LABEL"

printf "All %s Docker containers:\n\n" "$IMAGE_LABEL"
docker ps -a --filter "name=$CONTAINER_PREFIX"
printf "\n\n"

STOPPED=$(docker ps -a \
  --filter "status=exited" \
  --filter "name=$CONTAINER_PREFIX" \
  --format '{{.Names}}')

if [ -z "$STOPPED" ]; then
  printf "✅ No stopped %s containers to remove.\n\n" "$IMAGE_LABEL"
  exit 0
fi

printf "Stopped %s containers:\n\n" "$IMAGE_LABEL"
docker ps -a --filter "status=exited" --filter "name=$CONTAINER_PREFIX"
printf "\n\n"

read -p "Remove all stopped $IMAGE_LABEL containers? (Y/n): " CONFIRM

if [[ "$CONFIRM" != "Y" && "$CONFIRM" != "y" ]]; then
  printf "\n\nℹ️ Cancelled. No %s containers were removed.\n\n" "$IMAGE_LABEL"
  exit 0
fi

docker container rm $STOPPED >/dev/null

printf "\n\n✅ %s cleanup complete.\n\n" "$IMAGE_LABEL"

printf "%s Docker containers:\n\n" "$IMAGE_LABEL"
docker ps -a --filter "name=$CONTAINER_PREFIX"
printf "\n\n"
