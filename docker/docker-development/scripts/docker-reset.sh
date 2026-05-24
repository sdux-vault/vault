#!/bin/bash

echo "🛑 Stopping and removing development containers..."
docker compose down 2>/dev/null;

echo "🧹 Removing development images..."
docker rmi state-sdux_node php:8.2-apache 2>/dev/null;

echo "� Resolving host IP for Verdaccio access during build..."
export HOST_IP=$(ipconfig getifaddr en0 || ipconfig getifaddr en1)
echo "   HOST_IP=${HOST_IP}"

echo "🚀 Rebuilding development services..."
HOST_IP=$HOST_IP docker compose up --build -d;

echo "✅ Done. Use 'docker ps' to verify container status."