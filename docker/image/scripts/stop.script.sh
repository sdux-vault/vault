#!/bin/bash

# stop.script.sh — Stop a project container environment

SCRIPT_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIRECTORY/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  printf "\n❌ Required environment file not found: %s\n\n" "$ENV_FILE"
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

for required_variable in IMAGE_LABEL CONTAINER_PREFIX CONTAINER_ENVIRONMENTS; do
  if [[ -z "${!required_variable:-}" ]]; then
    printf "\n❌ %s is not set in %s\n\n" "$required_variable" "$ENV_FILE"
    exit 1
  fi
done

clear
printf "\n\n🚀 Stop a %s container...\n\n\n" "$IMAGE_LABEL"

printf "All %s Docker containers:\n\n" "$IMAGE_LABEL"
docker ps -a --filter "name=$CONTAINER_PREFIX"

printf "\n\n"
read -p "Enter the ${IMAGE_LABEL} container to stop [ ${CONTAINER_ENVIRONMENTS// / | } ]: " ENVIRONMENT 

if [[ ! " $CONTAINER_ENVIRONMENTS " =~ " $ENVIRONMENT " ]]; then
  printf "\n\n❌ Usage: $0 [ ${CONTAINER_ENVIRONMENTS// / | } ] for %s\n\n" "$IMAGE_LABEL"
  exit 1
fi

CONTAINER_NAME="${CONTAINER_PREFIX}-${ENVIRONMENT}"

printf "\n\n🛑 Stopping %s container: %s\n\n" "$IMAGE_LABEL" "$CONTAINER_NAME"
docker stop "$CONTAINER_NAME" >/dev/null 2>&1 || printf "\n\nℹ️ No running %s container to stop.\n\n" "$IMAGE_LABEL"

printf "%s Docker containers:\n\n" "$IMAGE_LABEL"
docker ps -a --filter "name=$CONTAINER_PREFIX"
