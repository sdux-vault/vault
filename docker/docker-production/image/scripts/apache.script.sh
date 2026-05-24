#!/bin/bash

clear; 

# Define allowed environments with optional numeric aliases
declare -A ENV_MAP=(
  ["1"]="start"
  ["2"]="stop"
  ["3"]="restart"
  ["4"]="status"
  ["start"]="start"
  ["stop"]="stop"
  ["restart"]="restart"
  ["status"]="status"
)

# Ordered keys for display
ORDERED_KEYS=("1" "2" "3" "4")

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
  printf "\n\n🚀 Apache control ...\n\n\n"
  echo "Available Commands:"
  for key in "${ORDERED_KEYS[@]}"; do
    echo "  $key. ${ENV_MAP[$key]}"
  done
  echo ""
  read -p "Enter command [name or number]: " INPUT
  COMMAND="${ENV_MAP[$INPUT]}"
fi

# Validate
if [ -z "$COMMAND" ]; then
  echo ""
  echo "❌ Invalid command . Must be one of: $(get_valid_options)"
  exit 1
fi

# Take Action 
sudo /opt/bitnami/ctlscript.sh $COMMAND apache
sleep 2
sudo pkill -f "/opt/bitnami/scripts/apache/$COMMAND.sh"
printf "\n\nRunning Apache Processes\n\n"
ps ax | grep apache
