package core

import (
	"fmt"
	"strconv"
	"time"

	types "axon-background/lib/types"

	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/jsii-runtime-go"
	axon_coredb "github.com/stephensanwo/axon-lib/coredb"
	axon_types "github.com/stephensanwo/axon-lib/types"
)

type Node struct {}

func (no *Node) AddNode(a *types.AxonBackgroundContext, node *axon_types.Node, user string) error {

	// Create the DynamoDB client
	db, err := axon_coredb.NewDb()

	if err != nil {
		return err
	}

	// Confirm that note exists
	var note axon_types.Note 
	
	noteResult, err := db.QueryDatabase(axon_types.AXON_TABLE, fmt.Sprintf("NOTE#%s#%s", user, node.FolderID), &node.NoteID)

	if noteResult.Item == nil || err != nil {
		a.Logger.Error("Tried to add node to non-existent note {user: %s, folder_id: %s, note_id: %s}", user, node.FolderID, node.NoteID)
		return err
	}

	// Unmarshal the DynamoDB item into a Note struct
	if err := dynamodbattribute.UnmarshalMap(noteResult.Item, &note); err != nil {
		return err
	}

	// Add node to Database
	err = db.MutateDatabase(axon_types.AXON_TABLE, fmt.Sprintf("NODE#%s#%s#%s", user, node.FolderID, node.NoteID), node.NodeID, node)

	if err != nil {
		return err
	}

	return err
}

func (no *Node) RemoveNode(a *types.AxonBackgroundContext, folder_id string, note_id string, node_id string, user string) error {

	// Create the DynamoDB client
	db, err := axon_coredb.NewDb()
	if err != nil {
		return err
	}

	err = db.DeleteRecord(axon_types.AXON_TABLE, fmt.Sprintf("NODE#%s#%s#%s", user, folder_id, note_id), &node_id)

	if err != nil {
		return err
	}

	return err

}

func (no *Node) UpdateNode(a *types.AxonBackgroundContext, node *axon_types.Node, user string) error {

	// Create the DynamoDB client
	db, err := axon_coredb.NewDb()
	if err != nil {
		return err
	}

	// Create a map to store the updated attributes
	updatedAttributes := make(map[string]*dynamodb.AttributeValue)

	// Add updatabele fields to the map
	updatedAttributes["data.title"] = &dynamodb.AttributeValue{S: &node.Data.Title}
	updatedAttributes["data.description"] = &dynamodb.AttributeValue{S: &node.Data.Description}
	updatedAttributes["data.node_styles.node_background_color"] = &dynamodb.AttributeValue{S: &node.Data.NodeStyles.NodeBackgroundColor}
	updatedAttributes["data.node_styles.node_border_color"] = &dynamodb.AttributeValue{S: &node.Data.NodeStyles.NodeBorderColor}
	updatedAttributes["data.node_styles.font_color"] = &dynamodb.AttributeValue{S: &node.Data.NodeStyles.FontColor}
	updatedAttributes["position.x"] = &dynamodb.AttributeValue{N: jsii.String(strconv.FormatFloat(node.Position.X, 'f', -1, 64))}
	updatedAttributes["position.y"] = &dynamodb.AttributeValue{N: jsii.String(strconv.FormatFloat(node.Position.Y, 'f', -1, 64))}
	updatedAttributes["content.content_type"] = &dynamodb.AttributeValue{S: &node.Content.ContentType}
	updatedAttributes["content.content_header"] = &dynamodb.AttributeValue{S: &node.Content.ContentHeader}
	updatedAttributes["content.content_data"] = &dynamodb.AttributeValue{S: &node.Content.ContentData}
	updatedAttributes["last_edited"] = &dynamodb.AttributeValue{S: jsii.String(time.Now().Format(time.RFC3339))}


	err = db.UpdateRecord(axon_types.AXON_TABLE, fmt.Sprintf("NODE#%s#%s#%s", user, node.FolderID, node.NoteID), node.NodeID, updatedAttributes)

	return err

}
