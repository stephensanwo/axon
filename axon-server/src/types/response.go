package types

import (
	axon_types "github.com/stephensanwo/axon-lib/types"
)
const (
	SUCCESS string = "success"
	FAILED  string = "failed"
)

type BaseResponse struct {
	Message interface{} `json:"message"`
}

type FoldersResponse struct {
	FolderId   string `json:"folder_id"`
	FolderName string `json:"folder_name"`
}

type GetFolderResponse struct {
	Message struct {
		Folder axon_types.Folder
	} `json:"message"`
}

type UpdateDataResponse struct {
	MatchedCount  int    `json:"MatchedCount"`
	ModifiedCount int    `json:"ModifiedCount"`
	UpsertedCount int    `json:"UpsertedCount"`
	UpsertedID    string `json:"UpsertedID"`
}
