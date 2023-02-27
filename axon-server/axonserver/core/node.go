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

type Node struct {
	Session session.Session
}

func (f *Node) GetNodes(a *types.AxonContext, folder_id *primitive.ObjectID, note_id *primitive.ObjectID) (*[]types.Node, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	node_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_NODES_COLLECTION)

	var res []types.Node

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id, "note_id": note_id}

	cursor, _ := node_collection.Find(context.TODO(), filter)
	err := cursor.All(context.TODO(), &res)

	if err != nil {
		return nil, errors.New("could not fetch nodes - " + err.Error())
	}

	return &res, err

}

func (f *Node) CreateNode(a *types.AxonContext, userNodeData types.NodeData, clientRefPosition types.Position, folder_id *primitive.ObjectID, note_id *primitive.ObjectID) (*types.Node, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	// Confirm that note exists
	note_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_NOTES_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id, "note_id": note_id}

	var noteData types.Note
	err := note_collection.FindOne(context.TODO(), filter).Decode(&noteData)

	if err == mongo.ErrNoDocuments {
		return nil, errors.New("could not create node - note not found")
	}

	//  Create node object
	node := types.Node{
		UserId:   f.Session.SessionData.User.UserId,
		FolderID: *folder_id,
		NoteID:   *note_id,
		NodeID:   primitive.NewObjectID(),
		// Provided by user
		Data: userNodeData,
		// Defined by client state
		Position: clientRefPosition,
		// Not provided on creation
		Content: types.NodeContent{
			MarkDown: "",
		},
		// Not provided on creation
		Styles:     types.NodeStyles{},
		LastEdited: time.Now(),
	}

	node_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_NODES_COLLECTION)
	_, err = node_collection.InsertOne(
		context.TODO(),
		node,
	)
	return &node, err

}

func (f *Node) FindNode(a *types.AxonContext, folder_id *primitive.ObjectID, note_id *primitive.ObjectID, node_id *primitive.ObjectID) (*types.Node, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	node_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_NODES_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id, "note_id": note_id, "node_id": node_id}

	var nodeData types.Node

	err := node_collection.FindOne(context.TODO(), filter).Decode(&nodeData)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.New("could not find node - " + err.Error())
		}
		return nil, errors.New("could not find node - " + err.Error())
	}

	return &nodeData, err
}

func (f *Node) DeleteNode(a *types.AxonContext, folder_id *primitive.ObjectID, note_id *primitive.ObjectID, node_id *primitive.ObjectID) (*mongo.DeleteResult, error) {
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	node_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_NODES_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id, "note_id": note_id, "node_id": node_id}

	res, err := node_collection.DeleteOne(
		context.TODO(),
		filter)

	if err != nil {
		return nil, errors.New("could not delete node - " + err.Error())
	}

	return res, err

}

func (f *Node) UpdateNode(a *types.AxonContext, userNodeData types.NodeData, clientRefPosition types.Position, userContent types.NodeContent, userStyles types.NodeStyles, folder_id *primitive.ObjectID, note_id *primitive.ObjectID, node_id *primitive.ObjectID) (*mongo.UpdateResult, error) {

	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	node_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_NODES_COLLECTION)

	filter := bson.M{"user_id": f.Session.SessionData.User.UserId, "folder_id": folder_id, "note_id": note_id, "node_id": node_id}

	update := bson.M{"$set": bson.M{"data": userNodeData, "position": clientRefPosition, "content": userContent, "styles": userStyles, "last_edited": time.Now()}}

	result, err := node_collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, errors.New("could not update note - " + err.Error())
	}
	return result, err

}
