package types

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
		Folder Folder
	} `json:"message"`
}
