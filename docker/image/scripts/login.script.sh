#!/bin/bash

SCRIPT_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIRECTORY/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  printf "\n❌ Required environment file not found: %s\n\n" "$ENV_FILE"
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

if [[ -z "${IMAGE_REPOSITORY:-}" ]]; then
  printf "\n❌ IMAGE_REPOSITORY is not set in %s\n\n" "$ENV_FILE"
  exit 1
fi

IMAGE_LABEL="${IMAGE_LABEL:-$IMAGE_REPOSITORY}"

if [[ -z "${CONTAINER_PREFIX:-}" ]]; then
  printf "\n❌ CONTAINER_PREFIX is not set in %s\n\n" "$ENV_FILE"
  exit 1
fi

if [[ -z "${CONTAINER_ENVIRONMENTS:-}" ]]; then
  printf "\n❌ CONTAINER_ENVIRONMENTS is not set in %s\n\n" "$ENV_FILE"
  exit 1
fi

read -r -a ENVIRONMENT_NAMES <<< "$CONTAINER_ENVIRONMENTS"

if [ ${#ENVIRONMENT_NAMES[@]} -eq 0 ]; then
  printf "\n❌ CONTAINER_ENVIRONMENTS is empty in %s\n\n" "$ENV_FILE"
  exit 1
fi

clear

# Define allowed environments with optional numeric aliases
declare -A ENV_MAP=()
ORDERED_KEYS=()

for index in "${!ENVIRONMENT_NAMES[@]}"; do
  key=$((index + 1))
  environment="${ENVIRONMENT_NAMES[$index]}"
  ENV_MAP["$key"]="$environment"
  ENV_MAP["$environment"]="$environment"
  ORDERED_KEYS+=("$key")
done

# Generate the valid input values for the validation message.
get_valid_options() {
  echo "${ORDERED_KEYS[*]} or ${ENVIRONMENT_NAMES[*]}"
}

# Resolve input
if [ -n "$1" ]; then
  ENVIRONMENT="${ENV_MAP[$1]}"
else
  printf "\n\n🚀 Log in to a %s container\n\n" "$IMAGE_LABEL"
  echo "Available ${IMAGE_LABEL} environments:"
  for key in "${ORDERED_KEYS[@]}"; do
    echo "  $key. ${ENV_MAP[$key]}"
  done
  echo ""
  read -r -p "Enter environment [name or number]: " INPUT
  ENVIRONMENT="${ENV_MAP[$INPUT]}"
fi

# Validate
if [ -z "$ENVIRONMENT" ]; then
  echo ""
  printf "❌ Invalid %s environment. Choose one of: %s\n\n" "$IMAGE_LABEL" "$(get_valid_options)"
  exit 1
fi

CONTAINER_NAME="${CONTAINER_PREFIX}-${ENVIRONMENT}"

printf "\n🔐 Logging into %s environment container: %s\n\n" \
  "$IMAGE_LABEL" "$CONTAINER_NAME"
docker exec -it "$CONTAINER_NAME" /bin/sh
