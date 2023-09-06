package core

import (
	types "axon-background/lib/types"
	utils "axon-background/lib/utils"
	"encoding/json"

	axon_types "github.com/stephensanwo/axon-lib/types"
)

func AxonBackgroundEventHandler(a *types.AxonBackgroundContext, event *axon_types.AxonEvent) {

	// Unmarshal raw JSON into a string
	var eventDataStr string
	if err := json.Unmarshal(event.Data, &eventDataStr); err != nil {
		a.Logger.Error("Error unmarshalling JSON string in REMOVE_NODE event - ", err)
	}

	var eventDataMap map[string]interface{}
	if err := json.Unmarshal([]byte(eventDataStr), &eventDataMap); err != nil {
		a.Logger.Error("Error unmarshalling JSON string in REMOVE_NODE event - ", err)
	}


	// Node instance
	node := Node{}
	
	switch event.Event {

		case axon_types.ADD_NODE: {

			//  Create node object
			nodeData := axon_types.Node{
				Id: 	 utils.GetStringFromMap(eventDataMap, "id"),
				UserId:   utils.GetStringFromMap(eventDataMap, "user_id"),
				FolderID: utils.GetStringFromMap(eventDataMap, "folder_id"),
				NoteID:   utils.GetStringFromMap(eventDataMap, "note_id"),
				NodeID:   utils.GetStringFromMap(eventDataMap, "node_id"),
				Type:    utils.GetStringFromMap(eventDataMap, "type"),
				Data: axon_types.NodeData{
					NodeID:       utils.GetStringFromMap(eventDataMap, "data.node_id"),
					Title:        utils.GetStringFromMap(eventDataMap, "data.title"),
					Description:  utils.GetStringFromMap(eventDataMap, "data.description"),
					Category:     utils.GetStringFromMap(eventDataMap, "data.category"),
					Icon:         utils.GetStringFromMap(eventDataMap, "data.icon"),
					NodeStyles: axon_types.NodeStyles{
						NodeBackgroundColor: utils.GetStringFromMap(eventDataMap, "data.node_styles.node_background_color"),
						NodeBorderColor:     utils.GetStringFromMap(eventDataMap, "data.node_styles.node_border_color"),
						FontColor:           utils.GetStringFromMap(eventDataMap, "data.node_styles.font_color"),
					},
				},
				Position: axon_types.Position{
					X: utils.GetFloatFromMap(eventDataMap, "position.x"),
					Y: utils.GetFloatFromMap(eventDataMap, "position.y"),
				},
				Content: axon_types.NodeContent{
					ContentType:   utils.GetStringFromMap(eventDataMap, "content.content_type"),
					ContentHeader: utils.GetStringFromMap(eventDataMap, "content.content_header"),
					ContentData:   utils.GetStringFromMap(eventDataMap, "content.content_data"),
				},
				LastEdited: utils.GetTimeFromMap(eventDataMap, "last_edited"),
			}

			err := node.AddNode(a, &nodeData, event.User)

			if err != nil {
				a.Logger.Error("Error adding node {user: %s, node_id: %s} - %s ", event.User, nodeData.Id, err)
			}
		}

		case axon_types.REMOVE_NODE: {

			err := node.RemoveNode(a, utils.GetStringFromMap(eventDataMap, "folder_id"), utils.GetStringFromMap(eventDataMap, "note_id"), utils.GetStringFromMap(eventDataMap, "node_id"), event.User)

			if err != nil {
				a.Logger.Error("Error removing node {user: %s, node_id: %s} - %s ", event.User, utils.GetStringFromMap(eventDataMap, "node_id"), err)
			}
		}

		case axon_types.UPDATE_NODE: {

			//  Create node object
			nodeData := axon_types.Node{
				Id: 	 utils.GetStringFromMap(eventDataMap, "id"),
				UserId:   utils.GetStringFromMap(eventDataMap, "user_id"),
				FolderID: utils.GetStringFromMap(eventDataMap, "folder_id"),
				NoteID:   utils.GetStringFromMap(eventDataMap, "note_id"),
				NodeID:   utils.GetStringFromMap(eventDataMap, "node_id"),
				Type:    utils.GetStringFromMap(eventDataMap, "type"),
				Data: axon_types.NodeData{
					NodeID:       utils.GetStringFromMap(eventDataMap, "data.node_id"),
					Title:        utils.GetStringFromMap(eventDataMap, "data.title"),
					Description:  utils.GetStringFromMap(eventDataMap, "data.description"),
					Category:     utils.GetStringFromMap(eventDataMap, "data.category"),
					Icon:         utils.GetStringFromMap(eventDataMap, "data.icon"),
					NodeStyles: axon_types.NodeStyles{
						NodeBackgroundColor: utils.GetStringFromMap(eventDataMap, "data.node_styles.node_background_color"),
						NodeBorderColor:     utils.GetStringFromMap(eventDataMap, "data.node_styles.node_border_color"),
						FontColor:           utils.GetStringFromMap(eventDataMap, "data.node_styles.font_color"),
					},
				},
				Position: axon_types.Position{
					X: utils.GetFloatFromMap(eventDataMap, "position.x"),
					Y: utils.GetFloatFromMap(eventDataMap, "position.y"),
				},
				Content: axon_types.NodeContent{
					ContentType:   utils.GetStringFromMap(eventDataMap, "content.content_type"),
					ContentHeader: utils.GetStringFromMap(eventDataMap, "content.content_header"),
					ContentData:   utils.GetStringFromMap(eventDataMap, "content.content_data"),
				},
				LastEdited: utils.GetTimeFromMap(eventDataMap, "last_edited"),
			}

			err := node.UpdateNode(a, &nodeData, event.User)

			if err != nil {
				a.Logger.Error("Error updating node {user: %s, node_id: %s} - %s ", event.User, nodeData.Id, err)
			}
		}

		default: {
			a.Logger.Error("Invalid event type")
		}
}
}