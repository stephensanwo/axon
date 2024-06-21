test:
	go test -v -cover ./...

dev:
	nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run bin/main.go -cmd server

swagger:
	export PATH=$PATH:$HOME/go/bin
	swag init -g /bin/main.go -o ./docs/swagger --parseDependency true

socket_simulator:
	chmod +x scripts/socket_simulator.sh && scripts/socket_simulator.sh

.PHONY: test dev swagger socket_simulator
