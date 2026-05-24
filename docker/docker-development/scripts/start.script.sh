#!/bin/sh
# start.script.sh — Start the development environment

clear
printf "\n\n🟢 Starting development environment...\n\n"

# Navigate to repo root regardless of where this script is called from
cd "$(dirname "$0")/../../.." || exit 1

echo "🔍 Resolving host IP for Verdaccio access during build..."
export HOST_IP=$(ipconfig getifaddr en0 || ipconfig getifaddr en1)
echo "   HOST_IP=${HOST_IP}"

HOST_IP=$HOST_IP docker compose up --build -d

if [ $? -ne 0 ]; then
  printf "\n\n❌ Failed to start development environment. See above for details.\n\n"
  exit 1
fi

printf "\n\n✅ Development environment is running.\n"
printf "   🌐 Docs app:          http://localhost:8080\n"
printf "   🔧 Angular dev server: http://localhost:4200\n\n"

printf "📋 Tailing sdux_node logs (Ctrl+C to detach)...\n\n"
docker compose logs -f sdux_node
