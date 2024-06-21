package core

// type Node struct {}

// func (no *Node) AddNode(a *types.AxonBackgroundContext, node *axon_types.Node, user string) error {

// 	// Create the DynamoDB client
// 	db, err := axon_coredb.NewDb()

// 	if err != nil {
// 		return err
// 	}

// 	// Confirm that note exists
// 	var note axon_types.Note

// 	noteResult, err := db.QueryDatabase(axon_types.AXON_TABLE, fmt.Sprintf("NOTE#%s#%s", user, node.FolderID), &node.NoteID)

// 	if noteResult.Item == nil || err != nil {
// 		a.Logger.Error(fmt.Sprintf("Tried to add node to non-existent note {user: %s, folder_id: %s, note_id: %s}", user, node.FolderID, node.NoteID))

// 		return err
// 	}

// 	// Unmarshal the DynamoDB item into a Note struct
// 	if err := dynamodbattribute.UnmarshalMap(noteResult.Item, &note); err != nil {
// 		return err
// 	}

// 	// Add node to Database
// 	err = db.MutateDatabase(axon_types.AXON_TABLE, fmt.Sprintf("NODE#%s#%s#%s", user, node.FolderID, node.NoteID), node.NodeID, node)

// 	if err != nil {
// 		return err
// 	}

// 	return err
// }

// func (no *Node) RemoveNode(a *types.AxonBackgroundContext, folder_id string, note_id string, node_id string, user string) error {

// 	// Create the DynamoDB client
// 	db, err := axon_coredb.NewDb()
// 	if err != nil {
// 		return err
// 	}

// 	err = db.DeleteRecord(axon_types.AXON_TABLE, fmt.Sprintf("NODE#%s#%s#%s", user, folder_id, note_id), &node_id)

// 	if err != nil {
// 		return err
// 	}

// 	return err

// }

// // type NodeAttributes struct {
// // 	Data axon_types.NodeData
// // 	Position axon_types.Position
// // 	Content axon_types.NodeContent
// // 	LastEdited string
// // }

// type NodeAttributes struct {
// 	Data struct {
// 		Title string `json:"title,omitempty"`
// 		Description string `json:"description,omitempty"`
// 		Category string `json:"category,omitempty"`
// 		Icon string `json:"icon,omitempty"`
// 		NodeStyles struct {
// 			NodeBackgroundColor string `json:"node_background_color,omitempty"`
// 			NodeBorderColor string `json:"node_border_color,omitempty"`
// 			FontColor string `json:"font_color,omitempty"`
// 		} `json:"node_styles,omitempty"`
// 	} `json:"data,omitempty"`
// 	Position struct {
// 		X float64 `json:"x,omitempty"`
// 		Y float64 `json:"y,omitempty"`
// 	}  `json:"position,omitempty"`
// 	Content struct {
// 		ContentType string `json:"content_type,omitempty"`
// 		ContentHeader string `json:"content_header,omitempty"`
// 		ContentData string `json:"content_data,omitempty"`
// 	} `json:"content,omitempty"`
// 	LastEdited time.Time `json:"last_edited"`
// }
// func (no *Node) UpdateNode(a *types.AxonBackgroundContext, node *axon_types.Node, user string) error {

// 	// Create the DynamoDB client
// 	db, err := axon_coredb.NewDb()
// 	if err != nil {
// 		return err
// 	}

// 	var attributes NodeAttributes
// 	attributes.Data.Title = node.Data.Title
// 	attributes.Data.Description = node.Data.Description
// 	attributes.Data.Category = node.Data.Category
// 	attributes.Data.Icon = node.Data.Icon
// 	attributes.Data.NodeStyles.NodeBackgroundColor = node.Data.NodeStyles.NodeBackgroundColor
// 	attributes.Data.NodeStyles.NodeBorderColor = node.Data.NodeStyles.NodeBorderColor
// 	attributes.Data.NodeStyles.FontColor = node.Data.NodeStyles.FontColor
// 	attributes.Position.X = node.Position.X
// 	attributes.Position.Y = node.Position.Y
// 	attributes.Content.ContentType = node.Content.ContentType
// 	attributes.Content.ContentHeader = node.Content.ContentHeader
// 	attributes.Content.ContentData = node.Content.ContentData
// 	attributes.LastEdited = time.Now()

// 	fmt.Println(node.NodeID)
// 	fmt.Println(attributes)

// 	err = db.UpdateRecord(axon_types.AXON_TABLE, fmt.Sprintf("NODE#%s#%s#%s", user, node.FolderID, node.NoteID), node.NodeID, attributes)

// 	return err

// }
