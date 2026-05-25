#!/bin/bash

# remove-orphans.script.sh — Remove stopped Docker containers

clear;
printf "\n\n🧹 Remove stopped containers...\n\n\n"

printf "All Docker containers:\n\n"
docker ps -a
printf "\n\n"

STOPPED=$(docker ps -a --filter "status=exited" --format '{{.Names}}')

if [ -z "$STOPPED" ]; then
  printf "✅ No stopped containers to remove.\n\n"
  exit 0
fi

printf "Stopped containers:\n\n"
docker ps -a --filter "status=exited"
printf "\n\n"

read -p "Remove all stopped containers? (Y/n): " CONFIRM

if [[ "$CONFIRM" != "Y" && "$CONFIRM" != "y" ]]; then
  printf "\n\nℹ️ Cancelled. No containers were removed.\n\n"
  exit 0
fi

docker container prune -f

printf "\n\n✅ Cleanup complete.\n\n"

printf "Docker containers:\n\n"
docker ps -a
printf "\n\n"
