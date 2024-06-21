#!/bin/bash

# URL for WebSocket connection
WEBSOCKET_URL="ws://127.0.0.1:7201/socket.io/?EIO=3&transport=websocket&transport=polling"

# Message to send to the server
MESSAGE='{"event":"message", "data":"Hello from client"}'

# Number of connections to simulate
NUM_CONNECTIONS=2000

# Loop to simulate connections
for ((i=1; i<=NUM_CONNECTIONS; i++)); do
    echo "Simulating connection $i"
    websocat "$WEBSOCKET_URL" <<< "$MESSAGE" &
done

# Wait for all background processes to finish
wait

echo "All connections simulated"
