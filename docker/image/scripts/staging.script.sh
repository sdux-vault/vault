#!/bin/bash

# staging.script.sh — Load and run the staging container with Docker Compose

set -e

TAR_PATH="./builds"
COMPOSE_PATH="./docker-compose-files"
COMPOSE_FILE="$COMPOSE_PATH/docker-compose.staging.yml"
CONTAINER_NAME="sdux"
CONTAINER_PORT="4100"

clear; 

printf "\n\n♻️ Loading a tarfile and staging..."

printf "\n\n"
HEALTH_CHECK_API="/"
HEALTH_CHECK_STATUS=""

printf "Docker containers:\n\n"
docker ps -a --filter "name=$CONTAINER_NAME"

printf "\n\n📂 Available build files in ./builds:\n\n"
ls -lh $TAR_PATH/$CONTAINER_NAME*.tar.gz 2>/dev/null || printf "\n\n⚠️ No build files found.\n\n"

printf "\n\n"

# Step 0: Check version tag parameter
read -p "Enter the tar file version to stage (e.g. v1.3.3): " VERSION_TAG
if [ -z "$VERSION_TAG" ]; then
  printf "\n\n❌ Error: Version tag required. Usage: ./staging.script.sh v1.3.3\n\n"
  exit 1
else
  printf "\nℹ️ Using VERSION_TAG: $VERSION_TAG\n\n"
fi


TAR_NAME="$TAR_PATH/$CONTAINER_NAME-$VERSION_TAG.tar.gz"

# Step 1: Validate required files
printf "\nStep 1: Starting staging load script...\n\n"
for file in "$TAR_NAME" "$COMPOSE_FILE"; do
  if [ ! -f "$file" ]; then
    printf "\n\n❌ Required file not found: $file\n\n"
    exit 1
  fi
done

# Step 2: Load the Docker image
printf "\nStep 2: Loading Docker image from $TAR_NAME...\n\n"
docker load < "$TAR_NAME"

printf "\n🚀 Launching staging container using $STAGING_COMPOSE...\n\n"

# Step 3: Stop and remove existing container if running
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}-staging$"; then
  printf "\n🛑 Stopping existing container: ${CONTAINER_NAME}-staging\n\n"
  docker stop "${CONTAINER_NAME}-staging" >/dev/null 2>&1 || printf "\n\nℹ️ No running staging container to stop.\n\n"

  printf "\n🗑  Removing existing container: ${CONTAINER_NAME}-staging\n\n"
  docker rm "${CONTAINER_NAME}-staging" >/dev/null 2>&1 || printf "\n\nℹ️ No running staging container to remove.\n\n"
else
  printf "\nℹ️ No existing container named ${CONTAINER_NAME}-staging. Skipping stop/remove.\n\n"
fi

# Step 4: Start new container
printf "\n🚀 Launching staging container using $COMPOSE_FILE\n\n"
if env VERSION_TAG="$VERSION_TAG" CONTAINER_NAME="$CONTAINER_NAME" docker-compose -f "$COMPOSE_FILE" up -d; then
  printf "\n\n✅ Staging container started successfully.\n\n"

  printf "\nDocker container:\n\n"
  docker ps --filter "name=$CONTAINER_NAME"
  printf "\n\n"

  printf "🔍 Verifying container is healthy...\n\n"
  sleep 5

  RESPONSE=$(curl -sSL -w "%{http_code}" -o /tmp/health_response.txt http://localhost:$CONTAINER_PORT$HEALTH_CHECK_API 2>/dev/null)
  BODY=$(cat /tmp/health_response.txt)

  if [ "$RESPONSE" = "200" ]; then
    echo "✅ Health check passed"
  else
    echo "⚠️ Health check failed"
    echo "Response ($RESPONSE): $BODY"
  fi

  printf "\n\n"
else
  printf "❌ Failed to start staging container."
  exit 1
fi
