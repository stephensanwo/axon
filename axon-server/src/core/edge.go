package core

import (
	"axon-server/src/api/session"
	"axon-server/src/coredb"
	"axon-server/src/types"
	"errors"
	"fmt"
	"time"

	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/jsii-runtime-go"
	"github.com/google/uuid"
)

type Edge struct {
	Session session.Session
}

func (e *Edge) GetEdges(a *types.AxonContext, folder_id string, note_id string) (*[]types.Edge, error) {

	// Create the DynamoDB client
	db, err := coredb.NewDb()
	if err != nil {
		return nil, errors.New("could not fetch edges - " + err.Error())
	}

	var edges []types.Edge

	nodeResult, err := db.QueryDatabase(coredb.AXON_TABLE, fmt.Sprintf("EDGE#%s#%s#%s", e.Session.SessionData.User.Email, folder_id, note_id), nil)

	if err != nil {
		return nil, errors.New("could not fetch edges - " + err.Error())
	}

	// Unmarshal the DynamoDB item into a Note | Node | Edges structs
	if err := dynamodbattribute.UnmarshalMap(nodeResult.Item, &edges); err != nil {
		return nil, err
	}
	
	return &edges, err

}

func (e *Edge) CreateEdge(a *types.AxonContext, source_id string, target_id string, animated bool, label string, edge_type string, folder_id string, note_id string) (*types.Edge, error) {

	// Create the DynamoDB client
	db, err := coredb.NewDb()
	if err != nil {
		return nil, errors.New("could not create edge - " + err.Error())
	}

	// Confirm that note exists
	var note types.Note

	noteResult, err := db.QueryDatabase(coredb.AXON_TABLE, fmt.Sprintf("NOTE#%s#%s", e.Session.SessionData.User.Email, folder_id), &note_id)

	if noteResult.Item == nil || err != nil {
		return nil, errors.New("could not fetch note data - " + err.Error())
	}

	// Unmarshal the DynamoDB item into a Note struct
	if err := dynamodbattribute.UnmarshalMap(noteResult.Item, &note); err != nil {
		return nil, err
	}

	//  Create edge object
	edge := types.Edge{
		UserId:   e.Session.SessionData.User.UserId,
		FolderID: folder_id,
		NoteID:   note_id,
		EdgeID:   uuid.New().String(),

		// Provided by user/client mapping
		SourceID:   source_id,
		TargetID:   target_id,
		Animated:   animated,
		Label:      label,
		EdgeType:   edge_type,
		LastEdited: time.Now(),
	}

	// Add edge to Database
	err = db.MutateDatabase(coredb.AXON_TABLE, fmt.Sprintf("EDGE#%s#%s#%s", e.Session.SessionData.User.Email, folder_id, note.NoteID), edge.EdgeID, edge)

	if err != nil {
		return nil, errors.New("could not create edge - " + err.Error())
	}

	return &edge, err

}

func (e *Edge) FindEdge(a *types.AxonContext, folder_id string, note_id string, edge_id string) (*types.Edge, error) {

	// Create the DynamoDB client
	db, err := coredb.NewDb()
	if err != nil {
		return nil, errors.New("could not fetch edge - " + err.Error())
	}

	// Fetch the Edge
	edgeResult, err := db.QueryDatabase(coredb.AXON_TABLE, fmt.Sprintf("EDGE#%s#%s#%s", e.Session.SessionData.User.Email, folder_id, note_id), &edge_id)

	var edge types.Edge

	// Unmarshal the DynamoDB item into a Edge struct
	if err := dynamodbattribute.UnmarshalMap(edgeResult.Item, &edge); err != nil {
		return nil, err
	}
		
	return &edge, err
}

func (e *Edge) DeleteEdge(a *types.AxonContext, folder_id string, note_id string, edge_id string) (*string, error) {

	// Create the DynamoDB client
	db, err := coredb.NewDb()
	if err != nil {
		return nil, errors.New("could not delete edge - " + err.Error())
	}

	err = db.DeleteRecord(coredb.AXON_TABLE, fmt.Sprintf("EDGE#%s#%s#%s", e.Session.SessionData.User.Email, folder_id, note_id), &edge_id)

	if err != nil {
		return nil, errors.New("could not delete edge or edge does not exist - " + err.Error())
	}

	return &edge_id, err


}

func (e *Edge) UpdateEdge(a *types.AxonContext, source_id string, target_id string, animated bool, label string, edge_type string, folder_id string, note_id string, edge_id string) (*string, error) {

	// Create the DynamoDB client
	db, err := coredb.NewDb()
	if err != nil {
		return nil, errors.New("could not fetch edge detail - " + err.Error())
	}

	// Create a map to store the updated attributes
	updatedAttributes := make(map[string]*dynamodb.AttributeValue)

	// Update the sorce and target fields if provided
	if source_id != "" {
		updatedAttributes["source_id"] = &dynamodb.AttributeValue{S: &source_id}
	}

	if target_id != "" {
		updatedAttributes["target_id"] = &dynamodb.AttributeValue{S: &target_id}
	}
	
	if animated {
		updatedAttributes["animated"] = &dynamodb.AttributeValue{BOOL: &animated}
	}
	
	if label != "" {
		updatedAttributes["label"] = &dynamodb.AttributeValue{S: &label}
	}

	if edge_type != "" {
		updatedAttributes["edge_type"] = &dynamodb.AttributeValue{S: &edge_type}
	}

	// Update the LastEdited field with the current timestamp
	updatedAttributes["last_edited"] = &dynamodb.AttributeValue{
		S: jsii.String(time.Now().Format(time.RFC3339)),
	}

	err = db.UpdateRecord(coredb.AXON_TABLE, fmt.Sprintf("NODE#%s#%s#%s", e.Session.SessionData.User.Email, folder_id, note_id), edge_id, updatedAttributes)

	return &edge_id, err

}
