#!/bin/bash
# Prefer using docker/docker-development/scripts/start.script.sh to start the full environment.
# This script manually starts the Angular dev server inside an already-running sdux_node container.
docker compose exec -T sdux_node npm run start -- --host 0.0.0.0 &