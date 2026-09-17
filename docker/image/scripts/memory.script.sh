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

if [[ -z "${IMAGE_LABEL:-}" ]]; then
  printf "\n❌ IMAGE_LABEL is not set in %s\n\n" "$ENV_FILE"
  exit 1
fi

clear

echo "📦 ${IMAGE_LABEL} Disk Usage Report"
echo "=============================="
printf "\n\n⏳ Calculating %s disk usage... please wait" "$IMAGE_LABEL"
printf "\n\n🗂 %s Filesystem Summary:\n\n" "$IMAGE_LABEL"
sudo du -sh / 2>/dev/null
printf "\n\n⏳ Calculating %s disk usage... please wait" "$IMAGE_LABEL"
printf "\n\n📁 %s top-level disk usage under root (/):\n\n" "$IMAGE_LABEL"
sudo du -hxd1 /home /var/backups /var /tmp /opt/bitnami/apache2/logs | sort -hr | head -n 10
echo ""

echo "🐳 ${IMAGE_LABEL} Docker Disk Usage:"
docker system df
echo ""
echo "📂 ${IMAGE_LABEL} Docker Directory Size (/var/lib/docker):"
sudo du -sh /var/lib/docker
echo ""

printf "\n\n✅ %s Disk Usage Report Complete.\n\n" "$IMAGE_LABEL"
