package types

type MutateFolder struct {
	FolderName string `json:"folder_name" validate:"required"`
}

type MutateNote struct {
	FolderId        string `json:"folder_id" validate:"required"`
	NoteName        string `json:"note_name" validate:"required"`
	NoteDescription string `json:"description" validate:"required"`
}

type PatchNote struct {
	NoteName        string `json:"note_name"`
	NoteDescription string `json:"description"`
}

type PostPublicNote struct {
	NoteID        string `json:"note_id" validate:"required"`
	FolderID      string `json:"folder_id" validate:"required"`
	PublicNoteID string `json:"public_note_id" validate:"required"`
}