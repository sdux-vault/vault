#!/bin/sh
# restart.script.sh — Restart the development environment

clear
printf "\n\n🔁 Restarting development environment...\n\n"

SCRIPT_DIR="$(dirname "$0")"

"$SCRIPT_DIR/stop.script.sh"
"$SCRIPT_DIR/start.script.sh"
