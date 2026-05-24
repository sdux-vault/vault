#!/bin/bash

# stop.script.sh — Stop a specific SDuX container environment (staging, production, backup)

clear; 
printf "\n\n🚀 Stop a container ...\n\n\n"

printf "Docker containers:\n\n"
docker ps -a --filter "name=sdux"

printf "\n\n"
read -p "Enter the container to stop [ staging | production | backup ]: " ENVIRONMENT 

if [ -z "$ENVIRONMENT" ] || [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" && "$ENVIRONMENT" != "backup"
 ]]; then
  printf "\n\n❌ Usage: $0 [ staging | production | backup ]\n\n"
  exit 1
fi

CONTAINER_NAME="sdux-$ENVIRONMENT"

printf "\n\n🛑 Stopping container: $CONTAINER_NAME\n\n"
docker stop "$CONTAINER_NAME" >/dev/null 2>&1 || printf "\n\nℹ️ No running container to stop.\n\n"

printf "Docker containers:\n\n"
docker ps -a --filter "name=sdux"