package core

import (
	"axon-server/axonserver/api/session"
	"axon-server/axonserver/coredb"
	"axon-server/axonserver/types"
	"context"
	"errors"
	"sync"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Folder struct {
	Session session.Session
}

func (f *Folder) GetFolderList(a *types.AxonContext) (*[]types.FolderList, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	folder_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_FOLDER_COLLECTION)

	note_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_NOTES_COLLECTION)

	var folders []types.Folder

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId}
	cursor, _ := folder_collection.Find(context.TODO(), filter)
	err := cursor.All(context.TODO(), &folders)
	if err != nil {
		return nil, errors.New("could not fetch folders - " + err.Error())
	}

	wg := sync.WaitGroup{}
	res := make([]types.FolderList, len(folders))

	for index, item := range folders {
		i := index
		wg.Add(1)
		go func(item types.Folder) {
			var folderList types.FolderList
			folderList.UserId = item.UserId
			folderList.FolderID = item.FolderID
			folderList.Name = item.Name
			folderList.DateCreated = item.DateCreated
			folderList.LastEdited = item.LastEdited

			note := []types.Note{}
			filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": item.FolderID}
			cursor, _ := note_collection.Find(context.TODO(), filter)
			err = cursor.All(context.TODO(), &note)
			folderList.Notes = note
			res[i] = folderList
			wg.Done()
		}(item)

	}
	wg.Wait()

	return &res, err

}

func (f *Folder) GetFolders(a *types.AxonContext) (*[]types.Folder, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	folder_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_FOLDER_COLLECTION)

	var res []types.Folder

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId}
	cursor, _ := folder_collection.Find(context.TODO(), filter)
	err := cursor.All(context.TODO(), &res)
	if err != nil {
		return nil, errors.New("could not fetch folders - " + err.Error())
	}
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

	folder_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_FOLDER_COLLECTION)
	_, err := folder_collection.InsertOne(
		context.TODO(),
		folder,
	)
	return &folder.FolderID, err

}

func (f *Folder) FindFolder(a *types.AxonContext, folder_id *primitive.ObjectID) (*types.Folder, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	folder_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_FOLDER_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id}

	var folderData types.Folder

	err := folder_collection.FindOne(context.TODO(), filter).Decode(&folderData)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.New("could not find folder - " + err.Error())
		}

		return nil, errors.New("could not find folder - " + err.Error())
	}
	return &folderData, err
}

func (f *Folder) DeleteFolder(a *types.AxonContext, folder_id *primitive.ObjectID) (*mongo.DeleteResult, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	folder_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_FOLDER_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id}

	res, err := folder_collection.DeleteOne(
		context.TODO(),
		filter)

	if err != nil {
		return nil, errors.New("could not delete folder - " + err.Error())
	}

	return res, err

}

func (f *Folder) UpdateFolder(a *types.AxonContext, name string, folder_id *primitive.ObjectID) (*mongo.UpdateResult, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	folder_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_FOLDER_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id}
	update := bson.M{"$set": bson.M{"name": name, "last_edited": time.Now()}}

	result, err := folder_collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, errors.New("could not update folder - " + err.Error())
	}

	return result, err

}
