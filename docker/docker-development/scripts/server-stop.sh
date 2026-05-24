#!/bin/bash

echo "🛑 Stopping Angular dev server process..."

docker compose exec sdux_node pkill -f "ng serve" 2>/dev/null
docker compose exec sdux_node pkill -f "npm run start" 2>/dev/null

echo "✅ Angular dev server processes stopped (if running)."