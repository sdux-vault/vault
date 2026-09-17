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

if [[ -z "${IMAGE_LABEL:-}" ]]; then
  printf "\n❌ IMAGE_LABEL is not set in %s\n\n" "$ENV_FILE"
  exit 1
fi

clear

# Define allowed environments with optional numeric aliases
declare -A ENV_MAP=(
  ["1"]="start"
  ["2"]="stop"
  ["3"]="restart"
  ["4"]="status"
  ["5"]="configtest"
  ["start"]="start"
  ["stop"]="stop"
  ["restart"]="restart"
  ["status"]="status"
  ["configtest"]="configtest"
)

# Ordered keys for display
ORDERED_KEYS=("1" "2" "3" "4" "5")

# Generate a dynamic list of allowed keys for validation message
get_valid_options() {
  local -a unique_values=()
  local -a unique_keys=()

  for key in "${!ENV_MAP[@]}"; do
    [[ ! " ${unique_values[*]} " =~ " ${ENV_MAP[$key]} " ]] && unique_values+=("${ENV_MAP[$key]}")
    [[ "$key" =~ ^[0-9]+$ ]] && unique_keys+=("$key")
  done

  echo "${unique_keys[*]} or ${unique_values[*]}"
}

# Resolve input
if [ -n "$1" ]; then
  COMMAND="${ENV_MAP[$1]}"
else
  printf "\n\n🚀 %s Apache control...\n\n\n" "$IMAGE_LABEL"
  echo "Available ${IMAGE_LABEL} Apache commands:"
  for key in "${ORDERED_KEYS[@]}"; do
    echo "  $key. ${ENV_MAP[$key]}"
  done
  echo ""
  read -p "Enter ${IMAGE_LABEL} Apache command [name or number]: " INPUT
  COMMAND="${ENV_MAP[$INPUT]}"
fi

# Validate
if [ -z "$COMMAND" ]; then
  echo ""
  echo "❌ Invalid ${IMAGE_LABEL} Apache command. Must be one of: $(get_valid_options)"
  exit 1
fi

# Take Action 
if [ "$COMMAND" = "configtest" ]; then
  sudo /opt/bitnami/apache/bin/apachectl configtest
else
  sudo /opt/bitnami/ctlscript.sh $COMMAND apache
  sleep 2
  sudo pkill -f "/opt/bitnami/scripts/apache/$COMMAND.sh"
  printf "\n\n%s Apache processes\n\n" "$IMAGE_LABEL"
  ps ax | grep apache
fi

exec "$SCRIPT_DIRECTORY/../main.script.sh"
