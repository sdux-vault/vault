#!/bin/bash

clear; 

# Define allowed environments with optional numeric aliases
declare -A ENV_MAP=(
  ["1"]="staging"
  ["2"]="production"
  ["3"]="backup"
  ["staging"]="staging"
  ["production"]="production"
  ["backup"]="backup"
)

# Ordered keys for display
ORDERED_KEYS=("1" "2" "3")

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
  ENVIRONMENT="${ENV_MAP[$1]}"
else
  printf "\n\n🚀 Login to a container ...\n\n\n"
  echo "Available Environments:"
  for key in "${ORDERED_KEYS[@]}"; do
    echo "  $key. ${ENV_MAP[$key]}"
  done
  echo ""
  read -p "Enter environment [name or number]: " INPUT
  ENVIRONMENT="${ENV_MAP[$INPUT]}"
fi

# Validate
if [ -z "$ENVIRONMENT" ]; then
  echo ""
  echo "❌ Invalid environment. Must be one of: $(get_valid_options)"
  exit 1
fi

# Login
printf "\n\nLogging into container: sdux-$ENVIRONMENT\n\n\n"
docker exec -it "sdux-$ENVIRONMENT" /bin/sh