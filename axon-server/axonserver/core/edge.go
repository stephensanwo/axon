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

type Edge struct {
	Session session.Session
}

func (f *Edge) GetEdges(a *types.AxonContext, folder_id *primitive.ObjectID, note_id *primitive.ObjectID) (*[]types.Edge, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	edge_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_EDGES_COLLECTION)

	var res []types.Edge

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id, "note_id": note_id}

	cursor, _ := edge_collection.Find(context.TODO(), filter)
	err := cursor.All(context.TODO(), &res)

	if err != nil {
		return nil, errors.New("could not fetch edges - " + err.Error())
	}

	return &res, err

}

func (f *Edge) CreateEdge(a *types.AxonContext, source_id *primitive.ObjectID, target_id *primitive.ObjectID, animated bool, label string, edge_type string, folder_id *primitive.ObjectID, note_id *primitive.ObjectID) (*types.Edge, error) {

	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	// Confirm that note exists
	note_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_NOTES_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id, "note_id": note_id}

	var edgeData types.Note
	err := note_collection.FindOne(context.TODO(), filter).Decode(&edgeData)

	if err == mongo.ErrNoDocuments {
		return nil, errors.New("could not create edge - note not found")
	}

	//  Create edge object
	edge := types.Edge{
		UserId:   f.Session.SessionData.User.UserId,
		FolderID: *folder_id,
		NoteID:   *note_id,
		EdgeID:   primitive.NewObjectID(),

		// Provided by user/client mapping
		SourceID:   *source_id,
		TargetID:   *target_id,
		Animated:   animated,
		Label:      label,
		EdgeType:   edge_type,
		LastEdited: time.Now(),
	}

	edge_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_EDGES_COLLECTION)
	_, err = edge_collection.InsertOne(
		context.TODO(),
		edge,
	)

	return &edge, err

}

func (f *Edge) FindEdge(a *types.AxonContext, folder_id *primitive.ObjectID, note_id *primitive.ObjectID, edge_id *primitive.ObjectID) (*types.Edge, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	edge_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_EDGES_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id, "note_id": note_id, "edge_id": edge_id}

	var edgeData types.Edge

	err := edge_collection.FindOne(context.TODO(), filter).Decode(&edgeData)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.New("could not find edge - " + err.Error())
		}
		return nil, errors.New("could not find edge - " + err.Error())
	}

	return &edgeData, err
}

func (f *Edge) DeleteEdge(a *types.AxonContext, folder_id *primitive.ObjectID, note_id *primitive.ObjectID, edge_id *primitive.ObjectID) (*mongo.DeleteResult, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	edge_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_EDGES_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id, "note_id": note_id, "edge_id": edge_id}

	res, err := edge_collection.DeleteOne(
		context.TODO(),
		filter)

	if err != nil {
		return nil, errors.New("could not delete edge - " + err.Error())
	}

	return res, err

}

func (f *Edge) UpdateEdge(a *types.AxonContext, source_id *primitive.ObjectID, target_id *primitive.ObjectID, animated bool, label string, edge_type string, folder_id *primitive.ObjectID, note_id *primitive.ObjectID, edge_id *primitive.ObjectID) (*mongo.UpdateResult, error) {

	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	edge_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_EDGES_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id, "note_id": note_id, "edge_id": edge_id}

	update := bson.M{"$set": bson.M{"source": source_id, "target": target_id, "animated": animated, "label": label, "edge_type": edge_type, "last_edited": time.Now()}}

	result, err := edge_collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, errors.New("could not update edge - " + err.Error())
	}
	return result, err

}
