#!/bin/bash

clear;

echo "📦 SDuX Disk Usage Report"
echo "=============================="
printf "\n\n⏳ Calculating disk usage... please wait"
printf "\n\n🗂 Filesystem Summary:\n\n"
sudo du -sh / 2>/dev/null
printf "\n\n⏳ Calculating disk usage... please wait"
printf "\n\n📁 Top-level disk usage under root (/):\n\n"
sudo du -hxd1 /home /var/backups /var /tmp /opt/bitnami/apache2/logs | sort -hr | head -n 10
echo ""

echo "🐳 Docker Disk Usage:"
docker system df
echo ""
echo "📂 Docker Directory Size (/var/lib/docker):"
sudo du -sh /var/lib/docker
echo ""

printf "\n\n✅ Report Complete.\n\n"