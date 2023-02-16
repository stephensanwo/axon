package types

type MutateFolder struct {
	FolderName string `json:"folder_name" validate:"required"`
}
