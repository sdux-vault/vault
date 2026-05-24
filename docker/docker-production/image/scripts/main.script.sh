#!/bin/bash

SCRIPTS_DIR="./scripts"
SCRIPT_SUFFIX=".script.sh"

# Check for CLI argument
if [ $# -gt 0 ]; then
  ARG_SCRIPT="$SCRIPTS_DIR/$1$SCRIPT_SUFFIX"
  if [ -f "$ARG_SCRIPT" ]; then
    echo "🚀 Running $ARG_SCRIPT via command-line argument"
    chmod +x "$ARG_SCRIPT"
    exec "$ARG_SCRIPT"
    exit 0
  else
    echo "❌ Script '$1$SCRIPT_SUFFIX' not found in $SCRIPTS_DIR"
    exit 1
  fi
fi

# Find all executable script files in the scripts directory
mapfile -t SCRIPT_FILES < <(find "$SCRIPTS_DIR" -maxdepth 1 -type f -name "*$SCRIPT_SUFFIX" | sort)

if [ ${#SCRIPT_FILES[@]} -eq 0 ]; then
  echo "❌ No scripts found in $SCRIPTS_DIR"
  exit 1
fi

echo "📜 Available Scripts:"
i=1
for script in "${SCRIPT_FILES[@]}"; do
  script_name=$(basename "$script")
  echo "  $i. $script_name"
  ((i++))
done

echo ""
read -p "➡️  Enter the number of the script to run: " selection
echo ""

# Validate numeric input
if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt "${#SCRIPT_FILES[@]}" ]; then
  echo "❌ Invalid selection."
  exit 1
fi

SELECTED_SCRIPT="${SCRIPT_FILES[$((selection - 1))]}"
echo "🚀 Running $SELECTED_SCRIPT"
echo ""

# Make sure the script is executable
chmod +x "$SELECTED_SCRIPT"
exec "$SELECTED_SCRIPT"