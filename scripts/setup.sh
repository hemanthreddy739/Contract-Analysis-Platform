#!/bin/bash

# This script is intended to be run from the root of the project.

# Create a .env file from the example if it does not exist
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Build and start the docker containers
docker-compose up --build -d
