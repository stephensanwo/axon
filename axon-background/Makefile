test:
	go test -v -cover ./...

dev:
	nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run bin/main.go -cmd server

start_dev:
	chmod +x ./scripts/start_service.sh && ./scripts/start_service.sh


.PHONY: test dev start_dev
