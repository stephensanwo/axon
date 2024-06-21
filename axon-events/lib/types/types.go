package types

type Event struct {
	EventType string `json:"event_type"`
	EventData interface{} `json:"event_data"`
	TimeStamp string `json:"time_stamp"`
}

const (
	// NODES
	ADD_NODE string = "add_node"
	REMOVE_NODE  string = "remove_node"
	UPDATE_NODE string = "update_node"
	UPDATE_NODE_MARKDOWN string = "update_node_markdown"

	// EDGES
	ADD_EDGE string = "add_edge"
	REMOVE_EDGE string = "remove_edge"
	UPDATE_EDGE_SOURCE string = "update_edge_source"
	UPDATE_EDGE_TARGET string = "update_edge_target"
	UPDATE_EDGE_POSITION string = "update_edge_position"
)

// type AxonEventContext struct {
// 	Context            context.Context
// 	Settings           AxonEventSettings           `json:"settings"`
// 	SessionId          string
// }

// type AxonEventSettings struct {
// 	Metadata      axon_types.Metadata      `yaml:"metadata"`
// 	HttpSettings  axon_types.HttpSettings  `yaml:"http"`
// }

// type AxonEventRoute struct {
// 	Path    string                                                 `json:"path"`
// 	Auth    string                                                 `json:"auth"`
// 	Handler func(http.ResponseWriter, *http.Request, *AxonEventContext) `json:"handler"`
// 	Method  string                                                 `json:"method"`
// }
