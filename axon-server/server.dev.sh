#!/bin/bash

# server.dev.sh

nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run bin/main.go -cmd server