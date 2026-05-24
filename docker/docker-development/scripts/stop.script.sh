#!/bin/sh
# stop.script.sh — Stop the development environment

clear
printf "\n\n🛑 Stopping development environment...\n\n"

cd "$(dirname "$0")/../../.." || exit 1

printf "Docker containers:\n\n"
docker ps -a --filter "name=sdux_apache" --filter "name=sdux_node"

printf "\n"
docker compose down

printf "\n\n✅ Development environment stopped.\n\n"
