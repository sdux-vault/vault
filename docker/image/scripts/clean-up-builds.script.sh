#!/bin/bash

set -e

SCRIPT_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIRECTORY/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  printf "\n❌ Required environment file not found: %s\n\n" "$ENV_FILE"
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

if [[ -z "${BUILD_PATH:-}" ]]; then
  printf "\n❌ BUILD_PATH is not set in %s\n\n" "$ENV_FILE"
  exit 1
fi

if [[ -z "${CONTAINER_PREFIX:-}" ]]; then
  printf "\n❌ CONTAINER_PREFIX is not set in %s\n\n" "$ENV_FILE"
  exit 1
fi

if [[ -z "${IMAGE_LABEL:-}" ]]; then
  printf "\n❌ IMAGE_LABEL is not set in %s\n\n" "$ENV_FILE"
  exit 1
fi

clear;
printf "\n\n🧹 Clean up %s builds...\n" "$IMAGE_LABEL"

while true; do
  # List build files
  mapfile -t build_files < <(ls "$BUILD_PATH"/"$CONTAINER_PREFIX"*.tar.gz 2>/dev/null)

  if [ ${#build_files[@]} -eq 0 ]; then
    printf "\n\n⚠️ No %s build files found.\n\n" "$IMAGE_LABEL"
    exit 0
  fi

  # Display numbered list
  printf "\n\n📂 Available %s build files:\n\n" "$IMAGE_LABEL"
  for i in "${!build_files[@]}"; do
    size=$(ls -lh "${build_files[$i]}" | awk '{print $5}')
    date=$(ls -lh "${build_files[$i]}" | awk '{print $6, $7, $8}')
    echo "$((i+1)). $(basename ${build_files[$i]}) ($size, $date)"
  done

  printf "\n\nEnter the number of the %s build to delete (x to exit): " "$IMAGE_LABEL"
  read selection

  # Exit on x
  if [[ "$selection" == "x" || "$selection" == "X" ]]; then
    printf "\n\nGood-bye from the %s build cleanup.\n\n" "$IMAGE_LABEL"
    exit 0
  fi

  # Validate input
  if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt ${#build_files[@]} ]; then
    printf "\n\nInvalid %s build selection.\n\n" "$IMAGE_LABEL"
    continue
  fi

  TAR_FILE="${build_files[$((selection-1))]}"

  printf "\n⚠️  You are about to delete the %s build: %s\n\n" "$IMAGE_LABEL" "$TAR_FILE"
  read -p "Are you sure you want to delete this ${IMAGE_LABEL} build? (Y/n): " CONFIRM

  if [[ "$CONFIRM" != "Y" && "$CONFIRM" != "y" ]]; then
    printf "\n\nℹ️ %s build cleanup cancelled.\n" "$IMAGE_LABEL"
    continue
  fi

  rm "$TAR_FILE"
  printf "\n\n✅ Deleted %s build: %s\n" "$IMAGE_LABEL" "$TAR_FILE"
done
