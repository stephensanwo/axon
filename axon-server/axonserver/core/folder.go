package core

import (
	"axon-server/axonserver/api/session"
	"axon-server/axonserver/coredb"
	"axon-server/axonserver/types"
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Folder struct {
	Session session.Session
}

func (f *Folder) GetFolders(a *types.AxonContext) (*[]types.Folder, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	axon_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_FOLDER_COLLECTION)

	var res []types.Folder

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId}
	cursor, err := axon_collection.Find(context.TODO(), filter)
	if err != nil {
		return &res, err
	}
	err = cursor.All(context.TODO(), &res)
	return &res, err

}

func (f *Folder) CreateFolder(a *types.AxonContext, name string) (*primitive.ObjectID, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	//  Create folder object
	folder := types.Folder{
		UserId:      f.Session.SessionData.User.UserId,
		FolderID:    primitive.NewObjectID(),
		Name:        name,
		DateCreated: time.Now(),
		LastEdited:  time.Now(),
	}

	axon_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_FOLDER_COLLECTION)
	_, err := axon_collection.InsertOne(
		context.TODO(),
		folder,
	)
	return &folder.FolderID, err

}

func (f *Folder) FindFolder(a *types.AxonContext, folder_id *primitive.ObjectID) (*types.Folder, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	axon_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_FOLDER_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id}

	var folderData types.Folder

	err := axon_collection.FindOne(context.TODO(), filter).Decode(&folderData)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			fmt.Println(err)
			return &types.Folder{}, err
		}

		return &types.Folder{}, err
	}
	return &folderData, err
}

func (f *Folder) DeleteFolder(a *types.AxonContext, folder_id *primitive.ObjectID) (*mongo.DeleteResult, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	axon_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_FOLDER_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id}

	res, err := axon_collection.DeleteOne(
		context.TODO(),
		filter)

	return res, err

}

func (f *Folder) UpdateFolder(a *types.AxonContext, folder_id *primitive.ObjectID, name string) (*mongo.UpdateResult, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	axon_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_FOLDER_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id}
	update := bson.M{"$set": bson.M{"name": name, "last_edited": time.Now()}}

	result, err := axon_collection.UpdateOne(context.TODO(), filter, update)
	fmt.Println(err)
	return result, err

}
