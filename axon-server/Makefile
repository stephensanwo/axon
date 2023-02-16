postgres:
	docker run --name devnotes-db -p 5432:5432 -e POSTGRES_PASSWORD=devnotespassword -d postgres:14-alpine

createdb:
	docker exec -it devnotes-db createdb --username=postgres --owner=postgres devnotes

dropdb:
	docker exec -it devnotes-db dropdb devnotes

migrateup:
	migrate -path db/migration -database "postgresql://postgres:devnotespassword@localhost:5432/devnotes?sslmode=disable" -verbose up 

migratedown:
	migrate -path db/migration -database "postgresql://postgres:devnotespassword@localhost:5432/devnotes?sslmode=disable" -verbose down 

sqlc:
	sqlc generate

test:
	go test -v -cover ./...

dev:
	nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run main.go -a server

swagger:
	export PATH=$PATH:$HOME/go/bin
	swag init

.PHONY: postgres createdb dropdb migrateup migratedown sqlc
