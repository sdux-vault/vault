#!/bin/bash

clear
printf "\n\n🚀 Deleting docker image ..."

# List SDuX images and extract relevant info
mapfile -t sdux_images < <(docker image ls --format '{{.Repository}} {{.Tag}} {{.ID}}' | grep '^sdux ')

if [ ${#sdux_images[@]} -eq 0 ]; then
  printf "\nNo SDuX images found.\n\n"
  exit 0
fi

# Display numbered list
printf "\n\nAvailable SDuX images:\n\n"
for i in "${!sdux_images[@]}"; do
  repo_tag_id=(${sdux_images[$i]})
  echo "$((i+1)). ${repo_tag_id[0]}:${repo_tag_id[1]} (${repo_tag_id[2]})"
done

printf "\n\nEnter the number of the image to delete: "
read selection

# Validate input
if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt ${#sdux_images[@]} ]; then
  printf "\\n\nInvalid selection.\n\n"
  exit 1
fi

# Extract image ID and tag
selected=(${sdux_images[$((selection-1))]})
image_id=${selected[2]}
tag=${selected[1]}

# Confirm deletion
printf "\n\nAre you sure you want to delete sdux:$tag ($image_id)? [Y/n]: "
read confirmation

if [[ "$confirmation" =~ ^[Yy]$ ]]; then
  printf "\n🗑 Deleting sdux:$tag ($image_id)...\n\n"
  docker rmi -f "$image_id"
  printf "\n\nImage deleted.\n\n"
else
  printf "\n\nGood-bye.\n\n"
fi