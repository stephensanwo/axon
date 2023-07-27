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
	nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run bin/main.go -cmd server

mongo_create_network:
	docker network create mongo-network

mongo_create_container:
	docker run -d -p 27017-27019:27017-27019 --name mongo-dev --network mongo-network mongo:latest

mongo_edit_config_for_local_network:
	docker exec -it mongo-dev bash
	apt-get update
	apt-get install nano
	cd /etc
	nano mongod.conf.orig
	# change bindIp:0.0.0.0
	exit
	docker stop mongo-dev
	docker start mongo-dev

redis_create_network:
	docker network create redis-network

redis_create_container:
	docker run -p 6379:6379 --name redisjson --network redis-network redislabs/rejson:latest

redis_edit_config_for_local_network:
	docker exec -it redisjson bash
	apt-get update && apt-get install nano

install_swagger_globally:
	go install github.com/swaggo/swag/cmd/swag@latest

swagger:
	export PATH=$PATH:$HOME/go/bin
	swag init --output ./docs/swagger

.PHONY: postgres createdb dropdb migrateup migratedown sqlc
