#!/bin/bash

set -e

BUILD_PATH="./builds"
CONTAINER_NAME="sdux"

clear;
printf "\n\n🧹 Clean up builds...\n\n\n"

printf "📂 Available build files in $BUILD_PATH:\n\n"
ls -lh $BUILD_PATH/$CONTAINER_NAME*.tar.gz 2>/dev/null || { printf "\n\n⚠️ No build files found.\n\n"; exit 0; }

printf "\n\n"

read -p "Enter the build version to delete (e.g. v1.3.3): " VERSION_TAG
if [ -z "$VERSION_TAG" ]; then
  printf "\n\n❌ Error: You must provide a version tag.\n\n"
  exit 1
fi

TAR_FILE="$BUILD_PATH/$CONTAINER_NAME-$VERSION_TAG.tar.gz"

if [ ! -f "$TAR_FILE" ]; then
  printf "\n\n❌ Build file not found: $TAR_FILE\n\n"
  exit 1
fi

printf "\n⚠️  You are about to delete: $TAR_FILE\n\n"
read -p "Are you sure? (Y/n): " CONFIRM

if [[ "$CONFIRM" != "Y" && "$CONFIRM" != "y" ]]; then
  printf "\n\nℹ️ Cancelled. No files were deleted.\n\n"
  exit 0
fi

rm "$TAR_FILE"
printf "\n\n✅ Deleted: $TAR_FILE\n\n"
