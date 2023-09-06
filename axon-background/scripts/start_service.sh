#!/bin/bash

# start_service.sh

# Run nodemon command
nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run bin/main.go