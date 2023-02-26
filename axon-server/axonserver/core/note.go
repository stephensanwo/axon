package core

import (
	"axon-server/axonserver/api/session"
	"axon-server/axonserver/coredb"
	"axon-server/axonserver/types"
	"context"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Note struct {
	Session session.Session
}

func (f *Note) GetNoteDetail(a *types.AxonContext, folder_id *primitive.ObjectID, note_id *primitive.ObjectID) (*types.NoteDetail, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	note_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_NOTES_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id, "note_id": note_id}

	var noteData types.NoteDetail

	err := note_collection.FindOne(context.TODO(), filter).Decode(&noteData)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.New("could not find note - " + err.Error())
		}
		return nil, errors.New("could not find note - " + err.Error())
	}

	// Fetch Nodes and Edges
	noteData.Nodes = []types.Node{}
	noteData.Edges = []types.Edge{}

	return &noteData, err
}

func (f *Note) GetNotes(a *types.AxonContext, folder_id *primitive.ObjectID) (*[]types.Note, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	note_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_NOTES_COLLECTION)

	var res []types.Note

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id}
	cursor, _ := note_collection.Find(context.TODO(), filter)
	err := cursor.All(context.TODO(), &res)
	if err != nil {
		return nil, errors.New("could not fetch notes - " + err.Error())
	}
	return &res, err

}

func (f *Note) CreateNote(a *types.AxonContext, name string, description string, folder_id *primitive.ObjectID) (*primitive.ObjectID, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	// Confirm that folder exists
	folder_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_FOLDER_COLLECTION)
	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id}
	var folderData types.Folder
	err := folder_collection.FindOne(context.TODO(), filter).Decode(&folderData)
	if err == mongo.ErrNoDocuments {
		return nil, errors.New("could not create note - folder not found")
	}
	//  Create note object
	note := types.Note{
		UserId:      f.Session.SessionData.User.UserId,
		FolderID:    *folder_id,
		NoteID:      primitive.NewObjectID(),
		Name:        name,
		Description: description,
		DateCreated: time.Now(),
		LastEdited:  time.Now(),
	}

	note_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_NOTES_COLLECTION)
	_, err = note_collection.InsertOne(
		context.TODO(),
		note,
	)
	return &note.NoteID, err

}

func (f *Note) FindNote(a *types.AxonContext, folder_id *primitive.ObjectID, note_id *primitive.ObjectID) (*types.Note, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	note_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_NOTES_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id, "note_id": note_id}

	var noteData types.Note

	err := note_collection.FindOne(context.TODO(), filter).Decode(&noteData)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.New("could not find note - " + err.Error())
		}
		return nil, errors.New("could not find note - " + err.Error())
	}

	return &noteData, err
}

func (f *Note) DeleteNote(a *types.AxonContext, folder_id *primitive.ObjectID, note_id *primitive.ObjectID) (*mongo.DeleteResult, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	note_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_NOTES_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id, "note_id": note_id}

	res, err := note_collection.DeleteOne(
		context.TODO(),
		filter)

	if err != nil {
		return nil, errors.New("could not delete note - " + err.Error())
	}

	return res, err

}

func (f *Note) UpdateNote(a *types.AxonContext, name string, description string, folder_id *primitive.ObjectID, note_id *primitive.ObjectID) (*mongo.UpdateResult, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	note_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_NOTES_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id, "note_id": note_id}

	update := bson.M{"$set": bson.M{"name": name, "description": description, "last_edited": time.Now()}}

	result, err := note_collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, errors.New("could not update note - " + err.Error())
	}
	return result, err

}
