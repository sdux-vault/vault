#!/bin/bash

echo "Checking Angular dev server status inside container..."

docker compose exec -T sdux_node ps aux | grep -v grep | grep "ng serve" >/dev/null

if [ $? -eq 0 ]; then
  echo "✅ Angular dev server is running"
else
  echo "❌ Angular dev server is NOT running"
fi