#!/bin/bash

if [ "$1" == "dev" ]; then
    CDK_COMMAND="cdk synth --context stage=dev"
elif [ "$1" == "prod" ]; then
    CDK_COMMAND="cdk synth --context stage=prod"
else
    echo "Invalid argument. Please use 'dev' or 'prod'."
    exit 1
fi

# Echo the command before running
echo "Running command: $CDK_COMMAND"

# Run the command
$CDK_COMMAND