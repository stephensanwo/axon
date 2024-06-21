test:
	go test -v -cover ./...

dev:
	nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run cmd/main.go -cmd server

install_swagger_globally:
	go install github.com/swaggo/swag/cmd/swag@latest

swagger:
	export PATH=$PATH:$HOME/go/bin
	swag init -g /bin/main.go -o ./docs/swagger --parseDependency true
	
.PHONY: dev swagger
