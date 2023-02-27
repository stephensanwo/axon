package types

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AxonData struct {
	Email   string   `json:"email"`
	Folders []Folder `json:"folders"`
}

type FolderList struct {
	UserId      primitive.ObjectID `json:"user_id" bson:"user_id"`
	FolderID    primitive.ObjectID `json:"folder_id" bson:"folder_id"`
	Name        string             `json:"name" bson:"name"`
	DateCreated time.Time          `json:"date_created" bson:"date_created"`
	LastEdited  time.Time          `json:"last_edited" bson:"last_edited"`
	Notes       []Note             `json:"notes" bson:"notes"`
}

type NoteDetail struct {
	UserId      primitive.ObjectID `json:"user_id" bson:"user_id"`
	FolderID    primitive.ObjectID `json:"folder_id" bson:"folder_id"`
	NoteID      primitive.ObjectID `json:"note_id" bson:"note_id"`
	Name        string             `json:"name" bson:"name"`
	Description string             `json:"description" bson:"description"`
	DateCreated time.Time          `json:"date_created" bson:"date_created"`
	LastEdited  time.Time          `json:"last_edited" bson:"last_edited"`
	Nodes       []Node             `json:"nodes" bson:"nodes"`
	Edges       []Edge             `json:"edges" bson:"edges"`
}

type Folder struct {
	UserId      primitive.ObjectID `json:"user_id" bson:"user_id"`
	FolderID    primitive.ObjectID `json:"folder_id" bson:"folder_id"`
	Name        string             `json:"name" bson:"name"`
	DateCreated time.Time          `json:"date_created" bson:"date_created"`
	LastEdited  time.Time          `json:"last_edited" bson:"last_edited"`
}

type Note struct {
	UserId      primitive.ObjectID `json:"user_id" bson:"user_id"`
	FolderID    primitive.ObjectID `json:"folder_id" bson:"folder_id"`
	NoteID      primitive.ObjectID `json:"note_id" bson:"note_id"`
	Name        string             `json:"name" bson:"name"`
	Description string             `json:"description" bson:"description"`
	DateCreated time.Time          `json:"date_created" bson:"date_created"`
	LastEdited  time.Time          `json:"last_edited" bson:"last_edited"`
}

type Node struct {
	UserId     primitive.ObjectID `json:"user_id" bson:"user_id"`
	FolderID   primitive.ObjectID `json:"folder_id" bson:"folder_id"`
	NoteID     primitive.ObjectID `json:"note_id" bson:"note_id"`
	NodeID     primitive.ObjectID `json:"node_id" bson:"node_id"`
	Data       NodeData           `json:"data" bson:"data"`
	Position   Position           `json:"position" bson:"position"`
	Content    NodeContent        `json:"node_content" bson:"node_content"`
	Styles     NodeStyles         `json:"node_styles" bson:"node_styles"`
	LastEdited time.Time          `json:"last_edited" bson:"last_edited"`
}

type NodeData struct {
	Label        string `json:"label" bson:"label"`
	Title        string `json:"title" bson:"title"`
	Description  string `json:"description" bson:"description"`
	NodeCategory string `json:"node_category" bson:"node_category"`
}

type Position struct {
	X int `json:"x" bson:"x"`
	Y int `json:"y" bson:"y"`
}

type NodeContent struct {
	MarkDown string `json:"markdown" bson:"markdown"`
}

type NodeStyles struct {
	BackgroundStyles  struct{} `json:"background_styles" bson:"background_styles"`
	LabelStyles       struct{} `json:"label_styles" bson:"label_styles"`
	DescriptionStyles struct{} `json:"description_styles" bson:"description_styles"`
}

type Edge struct {
	UserId     primitive.ObjectID `json:"user_id" bson:"user_id"`
	FolderID   primitive.ObjectID `json:"folder_id" bson:"folder_id"`
	NoteID     primitive.ObjectID `json:"note_id" bson:"note_id"`
	EdgeId     primitive.ObjectID `json:"edge_id" bson:"edge_id"`
	Source     string             `json:"source" bson:"source"`
	Target     string             `json:"target" bson:"target"`
	Animated   bool               `json:"animated" bson:"animated"`
	Label      string             `json:"label" bson:"label"`
	Type       string             `json:"type" bson:"type"`
	LastEdited time.Time          `json:"last_edited" bson:"last_edited"`
}
