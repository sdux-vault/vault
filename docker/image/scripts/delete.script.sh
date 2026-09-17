#!/bin/bash

SCRIPT_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIRECTORY/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  printf "\n❌ Required environment file not found: %s\n\n" "$ENV_FILE"
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

if [[ -z "${IMAGE_REPOSITORY:-}" ]]; then
  printf "\n❌ IMAGE_REPOSITORY is not set in %s\n\n" "$ENV_FILE"
  exit 1
fi

IMAGE_LABEL="${IMAGE_LABEL:-$IMAGE_REPOSITORY}"

if [[ -z "${IMAGE_LABEL:-}" ]]; then
  printf "\n❌ IMAGE_LABEL is not set in %s\n\n" "$ENV_FILE"
  exit 1
fi

clear
printf "\n\n🚀 Deleting %s Docker images...\n" "$IMAGE_LABEL"

while true; do
  # List configured images and extract relevant info.
  # Reverse Docker's default newest-first order so older images are listed first.
  mapfile -t images < <(
    docker image ls --format '{{.Repository}} {{.Tag}} {{.ID}}' |
      awk -v repository="$IMAGE_REPOSITORY" '$1 == repository' |
      tac
  )

  if [ ${#images[@]} -eq 0 ]; then
    printf "\nNo %s Docker images found.\n\n" "$IMAGE_LABEL"
    exit 0
  fi

  # Display numbered list
  printf "\n\nAvailable %s images:\n\n" "$IMAGE_LABEL"
  for i in "${!images[@]}"; do
    repo_tag_id=(${images[$i]})
    echo "$((i+1)). ${repo_tag_id[0]}:${repo_tag_id[1]} (${repo_tag_id[2]})"
  done

  printf "\n\nEnter the number of the %s image to delete (x to exit): " "$IMAGE_LABEL"
  read -r selection

  # Exit on x
  if [[ "$selection" == "x" || "$selection" == "X" ]]; then
    printf "\n\nGood-bye from %s image cleanup.\n\n" "$IMAGE_LABEL"
    exit 0
  fi

  # Validate input
  if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt ${#images[@]} ]; then
    printf "\n\nInvalid %s image selection.\n\n" "$IMAGE_LABEL"
    continue
  fi

  # Extract image ID and tag
  selected=(${images[$((selection-1))]})
  image_id=${selected[2]}
  tag=${selected[1]}

  # Confirm deletion
  printf "\n\nAre you sure you want to delete %s image %s:$tag ($image_id)? [Y/n]: " "$IMAGE_LABEL" "$IMAGE_REPOSITORY"
  read -r confirmation

  if [[ "$confirmation" =~ ^[Yy]$ ]]; then
    printf "\n🗑 Deleting %s image %s:$tag ($image_id)...\n\n" "$IMAGE_LABEL" "$IMAGE_REPOSITORY"
    docker rmi -f "$image_id"
    printf "\n\n✅ %s image deleted.\n" "$IMAGE_LABEL"
  else
    printf "\n\nSkipped %s image.\n" "$IMAGE_LABEL"
  fi
done
