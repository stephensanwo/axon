package types

type MutateFolder struct {
	FolderName string `json:"folder_name" validate:"required"`
}

type MutateNote struct {
	FolderId        string `json:"folder_id" validate:"required"`
	NoteName        string `json:"note_name" validate:"required"`
	NoteDescription string `json:"note_description" validate:"required"`
}

type PatchNote struct {
	NoteName        string `json:"note_name" validate:"required"`
	NoteDescription string `json:"note_description" validate:"required"`
}
