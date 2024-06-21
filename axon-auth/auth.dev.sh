#!/bin/bash

# auth.dev.sh

nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run bin/main.go -cmd server