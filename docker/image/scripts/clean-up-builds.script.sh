#!/bin/bash

set -e

BUILD_PATH="./builds"
CONTAINER_NAME="sdux"

clear;
printf "\n\n🧹 Clean up builds...\n"

while true; do
  # List build files
  mapfile -t build_files < <(ls $BUILD_PATH/$CONTAINER_NAME*.tar.gz 2>/dev/null)

  if [ ${#build_files[@]} -eq 0 ]; then
    printf "\n\n⚠️ No build files found.\n\n"
    exit 0
  fi

  # Display numbered list
  printf "\n\n📂 Available build files:\n\n"
  for i in "${!build_files[@]}"; do
    size=$(ls -lh "${build_files[$i]}" | awk '{print $5}')
    date=$(ls -lh "${build_files[$i]}" | awk '{print $6, $7, $8}')
    echo "$((i+1)). $(basename ${build_files[$i]}) ($size, $date)"
  done

  printf "\n\nEnter the number of the build to delete (x to exit): "
  read selection

  # Exit on x
  if [[ "$selection" == "x" || "$selection" == "X" ]]; then
    printf "\n\nGood-bye.\n\n"
    exit 0
  fi

  # Validate input
  if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt ${#build_files[@]} ]; then
    printf "\n\nInvalid selection.\n\n"
    continue
  fi

  TAR_FILE="${build_files[$((selection-1))]}"

  printf "\n⚠️  You are about to delete: $TAR_FILE\n\n"
  read -p "Are you sure? (Y/n): " CONFIRM

  if [[ "$CONFIRM" != "Y" && "$CONFIRM" != "y" ]]; then
    printf "\n\nℹ️ Cancelled.\n"
    continue
  fi

  rm "$TAR_FILE"
  printf "\n\n✅ Deleted: $TAR_FILE\n"
done
