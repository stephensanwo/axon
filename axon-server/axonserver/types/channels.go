package types

const (
	CHANNEL              string = "axon_channel"
	ADD_NODE             string = "add_node"
	REMOVE_NODE          string = "remove_node"
	UPDATE_NODE_POSITION string = "update_node_position"
	UPDATE_NODE_CONTENT  string = "update_node_content"
	UPDATE_NODE_STYLES   string = "update_node_styles"
)

type Message struct {
	Action  string      `json:"action"`
	Payload interface{} `json:"payload"`
}
