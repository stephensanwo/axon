package coredb

import (
	"axon-server/axonserver/types"
	"context"

	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Person struct {
	Name string
	Age  int
}

type DB struct{}

func (c DB) GetCoreDBClient(a *types.AxonContext) (*mongo.Client, error) {
	// Set client options
	clientOptions := options.Client().ApplyURI(a.MongoDBCredentials.ConnectionURI)

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Panicf("Error connecting to mongodb instance: %v ", err)
	} else {
		log.Info("MongoDB instance online")

	}

	return client, err
}

func (c DB) GetCollection(client *mongo.Client, database string, collection string) *mongo.Collection {
	return client.Database(database).Collection(collection)

}

func (c DB) DisconnectCoreDBClient(client *mongo.Client) {
	client.Disconnect(context.TODO())
}
