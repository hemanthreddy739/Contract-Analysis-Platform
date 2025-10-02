#!/bin/bash

# This script is intended to be run from the root of the project.

# Pull the latest images
docker-compose pull

# Stop and remove the old containers
docker-compose down

# Start the new containers
docker-compose up --build -d
