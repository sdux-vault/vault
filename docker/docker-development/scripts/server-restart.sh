#!/bin/bash

# Stop the server
./docker/docker-development/scripts/server-stop.sh

# Optional: wait a bit to ensure clean shutdown
sleep 2

# Start the server
./docker/docker-development/scripts/server-start.sh