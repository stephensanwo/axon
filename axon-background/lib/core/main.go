package core

import (
	types "axon-background/lib/types"
	"encoding/json"
	"fmt"
	"time"

	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	axon_coredb "github.com/stephensanwo/axon-lib/coredb"
	axon_types "github.com/stephensanwo/axon-lib/types"
)

func AxonBackgroundEventHandler(a *types.AxonBackgroundContext, event *axon_types.AxonEvent) {
	// Unmarshal raw JSON into a string
	// var eventDataStr string
	// if err := json.Unmarshal(event.Data, &eventDataStr); err != nil {
	// 	a.Logger.Error("Error unmarshalling JSON string in event - ", err)
	// }
	// Create the DynamoDB client
	db, err := axon_coredb.NewDb()
	if err != nil {
		a.Logger.Error("Error creating DynamoDB client - ", err)
	}

	var newTimeStamp time.Time = event.TimeStamp
	var newNoteDetail axon_types.NoteDetail
	fmt.Println("eventData", event.Data)	
	if err := json.Unmarshal(event.Data, &newNoteDetail); err != nil {
		a.Logger.Error("Error unmarshalling JSON newNoteDetail - ", err)
	}

	var currentNote axon_types.Note
	currentNoteResult, _ := db.QueryDatabase(axon_types.AXON_TABLE, fmt.Sprintf("NOTE#%s#%s", event.User, newNoteDetail.FolderID), &newNoteDetail.NoteID)

	if err := dynamodbattribute.UnmarshalMap(currentNoteResult.Item, &currentNote); err != nil {
		a.Logger.Error("Error unmarshalling JSON currentNote - ", err)
	}

	fmt.Println("currentNote", currentNote)
	// Check if the current event timestamp is earlier than the note last edited timestamp
	var isValidInsert bool = newTimeStamp.After(currentNote.LastEdited)
	fmt.Println("isValidInsert", isValidInsert)
	if !isValidInsert {
		// Update the DB record with the new state


		return 
	} else {
		// DB Record state superseds the new state so do nothing
		return
	}

	// fmt.Println("eventDataStr", event)
	// var eventDataMap map[string]interface{}
	// var eventDataMap axon_types.NoteDetail
	// if err := json.Unmarshal([]byte(string(event.Data)), &eventDataMap); err != nil {
	// 	a.Logger.Error("Error unmarshalling JSON string in event - ", err)
	// }
	// // fmt.Println("eventDataMap", eventDataMap)
	// prettyJSON, err := json.MarshalIndent(eventDataMap, "", "  ")
	// if err != nil {
	// 	fmt.Println("Error marshaling to JSON:", err)
	// 	return
	// }

	// // Print the pretty JSON
	// fmt.Println("eventDataMap (pretty JSON):")
	// fmt.Println(string(prettyJSON))
	
	// Node instance
	// node := Node{}
	
	switch event.Event {
		case axon_types.UPDATE_NOTE: {
			// fmt.Println("Update note event", eventDataMap)			
		}
		// case axon_types.ADD_NODE: {

		// 	//  Create node object
		// 	nodeData := axon_types.Node{
		// 		Id: 	 utils.GetStringFromMap(eventDataMap, "id"),
		// 		UserId:   utils.GetStringFromMap(eventDataMap, "user_id"),
		// 		FolderID: utils.GetStringFromMap(eventDataMap, "folder_id"),
		// 		NoteID:   utils.GetStringFromMap(eventDataMap, "note_id"),
		// 		NodeID:   utils.GetStringFromMap(eventDataMap, "node_id"),
		// 		Type:    utils.GetStringFromMap(eventDataMap, "type"),
		// 		Data: axon_types.NodeData{
		// 			NodeID:       utils.GetStringFromMap(eventDataMap, "data.node_id"),
		// 			Title:        utils.GetStringFromMap(eventDataMap, "data.title"),
		// 			Description:  utils.GetStringFromMap(eventDataMap, "data.description"),
		// 			Category:     utils.GetStringFromMap(eventDataMap, "data.category"),
		// 			Icon:         utils.GetStringFromMap(eventDataMap, "data.icon"),
		// 			NodeStyles: axon_types.NodeStyles{
		// 				NodeBackgroundColor: utils.GetStringFromMap(eventDataMap, "data.node_styles.node_background_color"),
		// 				NodeBorderColor:     utils.GetStringFromMap(eventDataMap, "data.node_styles.node_border_color"),
		// 				FontColor:           utils.GetStringFromMap(eventDataMap, "data.node_styles.font_color"),
		// 			},
		// 		},
		// 		Position: axon_types.Position{
		// 			X: utils.GetFloatFromMap(eventDataMap, "position.x"),
		// 			Y: utils.GetFloatFromMap(eventDataMap, "position.y"),
		// 		},
		// 		Content: axon_types.NodeContent{
		// 			ContentType:   utils.GetStringFromMap(eventDataMap, "content.content_type"),
		// 			ContentHeader: utils.GetStringFromMap(eventDataMap, "content.content_header"),
		// 			ContentData:   utils.GetStringFromMap(eventDataMap, "content.content_data"),
		// 		},
		// 		LastEdited: utils.GetTimeFromMap(eventDataMap, "last_edited"),
		// 	}

		// 	err := node.AddNode(a, &nodeData, event.User)

		// 	if err != nil {
		// 		a.Logger.Error(fmt.Sprintf("Error adding node {user: %s, node_id: %s} - %s ", event.User, nodeData.Id, err))

		// 	}
		// }

		// case axon_types.REMOVE_NODE: {

		// 	err := node.RemoveNode(a, utils.GetStringFromMap(eventDataMap, "folder_id"), utils.GetStringFromMap(eventDataMap, "note_id"), utils.GetStringFromMap(eventDataMap, "node_id"), event.User)

		// 	if err != nil {
		// 		a.Logger.Error(fmt.Sprintf("Error removing node {user: %s, node_id: %s} - %s ", event.User, utils.GetStringFromMap(eventDataMap, "node_id"), err))
		// 	}
		// }

		// case axon_types.UPDATE_NODE: {

		// 	//  Create node object
		// 	nodeData := axon_types.Node{
		// 		Id: 	 utils.GetStringFromMap(eventDataMap, "id"),
		// 		UserId:   utils.GetStringFromMap(eventDataMap, "user_id"),
		// 		FolderID: utils.GetStringFromMap(eventDataMap, "folder_id"),
		// 		NoteID:   utils.GetStringFromMap(eventDataMap, "note_id"),
		// 		NodeID:   utils.GetStringFromMap(eventDataMap, "node_id"),
		// 		Type:    utils.GetStringFromMap(eventDataMap, "type"),
		// 		Data: axon_types.NodeData{
		// 			NodeID:       utils.GetStringFromMap(eventDataMap, "data.node_id"),
		// 			Title:        utils.GetStringFromMap(eventDataMap, "data.title"),
		// 			Description:  utils.GetStringFromMap(eventDataMap, "data.description"),
		// 			Category:     utils.GetStringFromMap(eventDataMap, "data.category"),
		// 			Icon:         utils.GetStringFromMap(eventDataMap, "data.icon"),
		// 			NodeStyles: axon_types.NodeStyles{
		// 				NodeBackgroundColor: utils.GetStringFromMap(eventDataMap, "data.node_styles.node_background_color"),
		// 				NodeBorderColor:     utils.GetStringFromMap(eventDataMap, "data.node_styles.node_border_color"),
		// 				FontColor:           utils.GetStringFromMap(eventDataMap, "data.node_styles.font_color"),
		// 			},
		// 		},
		// 		Position: axon_types.Position{
		// 			X: utils.GetFloatFromMap(eventDataMap, "position.x"),
		// 			Y: utils.GetFloatFromMap(eventDataMap, "position.y"),
		// 		},
		// 		Content: axon_types.NodeContent{
		// 			ContentType:   utils.GetStringFromMap(eventDataMap, "content.content_type"),
		// 			ContentHeader: utils.GetStringFromMap(eventDataMap, "content.content_header"),
		// 			ContentData:   utils.GetStringFromMap(eventDataMap, "content.content_data"),
		// 		},
		// 		LastEdited: utils.GetTimeFromMap(eventDataMap, "last_edited"),
		// 	}

		// 	err := node.UpdateNode(a, &nodeData, event.User)

		// 	if err != nil {
		// 		a.Logger.Error(fmt.Sprintf("Error updating node {user: %s, node_id: %s} - %s ", event.User, nodeData.Id, err))
		// 	}
		// }

		default: {
			a.Logger.Error("Invalid event type")
		}
}
}