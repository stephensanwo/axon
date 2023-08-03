package routes

import (
	aws "axon-server/src/aws"
	"axon-server/src/types"
	"axon-server/src/utils"
	"context"
	"encoding/json"
	"net/http"

	axon_core "github.com/stephensanwo/axon-lib/core"
	axon_types "github.com/stephensanwo/axon-lib/types"
)

// QueryNoteDetail godoc
//	@Summary		Query Note Detail
//	@Description	Query Note Detail
//	@Tags			Note
//	@ID				get-note
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	axon_types.NoteDetail	"NoteDetail"
//	@Failure		400	{string}	string				"Bad Request"
//	@Failure		401	{string}	string				"Unauthorized"
//	@Router			/note-detail [get]
//	@Param			folder_id	query	string	true	"Folder ID"
//	@Param			note_id		query	string	true	"Note ID"
func QueryNoteDetail(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
	user := axon_core.User{
		AwsSession: aws.CreateSession(),
	}
	session, err := user.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	query := r.URL.Query()
	folderID := query.Get("folder_id")
	noteID := query.Get("note_id")

	if folderID == "" || noteID == "" {
		http.Error(w, "fields note_id and folder_id are required in query", http.StatusBadRequest)
		return
	}
	note := axon_core.Note{
		Session: session,
		AwsSession: aws.CreateSession(),

	}

	res, err := note.GetNoteDetail(a, folderID, noteID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}

// QueryNotesHandler godoc
//	@Summary		Query all notes
//	@Description	Query all notes
//	@Tags			Note
//	@ID				get-notes
//	@Accept			json
//	@Produce		json
//	@Success		200			{object}	[]axon_types.Note	"Notes"
//	@Failure		400			{string}	string			"Bad Request"
//	@Failure		401			{string}	string			"Unauthorized"
//	@Param			folder_id	query		string			true	"Folder ID"
//	@Router			/notes [get]
func QueryNotesHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
	user := axon_core.User{
		AwsSession: aws.CreateSession(),
	}
	session, err := user.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	query := r.URL.Query()
	folderID := query.Get("folder_id")
	if folderID == "" {
		http.Error(w, "field folder_id is required in query", http.StatusBadRequest)
		return
	}

	note := axon_core.Note{
		Session: session,
		AwsSession: aws.CreateSession(),

	}

	notes, err := note.GetNotes(a, folderID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(notes)
}

// QueryNoteHandler godoc
//	@Summary		Query Note
//	@Description	Query Note
//	@Tags			Note
//	@ID				get-note
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	axon_types.Note	"Note"
//	@Failure		400	{string}	string		"Bad Request"
//	@Failure		401	{string}	string		"Unauthorized"
//	@Router			/note [get]
//	@Param			folder_id	query	string	true	"Folder ID"
//	@Param			note_id		query	string	true	"Note ID"
func QueryNoteHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
	user := axon_core.User{
		AwsSession: aws.CreateSession(),
	}
	session, err := user.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	query := r.URL.Query()
	folderID := query.Get("folder_id")
	noteID := query.Get("note_id")

	if folderID == "" || noteID == "" {
		http.Error(w, "fields note_id and folder_id are required in query", http.StatusBadRequest)
		return
	}
	note := axon_core.Note{
		Session: session,
		AwsSession: aws.CreateSession(),

	}

	res, err := note.FindNote(a, folderID, noteID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}

// PostNoteHandler godoc
//	@Summary		Create New Note
//	@Description	Create New Note
//	@ID				post-note
//	@Tags			Note
//	@Accept			json
//	@Produce		json
//	@Success		201	{string}	axon_types.Note.NoteID	"Note Id"
//	@Failure		400	{string}	string				"Bad Request"
//	@Failure		401	{string}	string				"Unauthorized"
//	@Failure		422	{object}	types.FieldErrors	"Unprocessible Entity"
//	@Router			/note [post]
//	@Param			data	body	types.MutateNote	true	"Note Object"
func PostNoteHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
	user := axon_core.User{
		AwsSession: aws.CreateSession(),
	}
	session, err := user.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	decoder := json.NewDecoder(r.Body)
	var requestData types.MutateNote
	err = decoder.Decode(&requestData)
	if err != nil {
		http.Error(w, "fields folder_id, note_name, and note_description are required in request body", http.StatusBadRequest)
		return
	}
	validate := utils.NewValidator()
	if err := validate.Struct(requestData); err != nil {
		err := utils.CheckErrors(
			context.TODO(), err, http.StatusUnprocessableEntity, "note",
		)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnprocessableEntity)
		json.NewEncoder(w).Encode(err)
		return
	}

	note := axon_core.Note{
		Session: session,
		AwsSession: aws.CreateSession(),

	}

	noteId, err := note.CreateNote(a, requestData.NoteName, requestData.NoteDescription, requestData.FolderId)
	if err != nil {
		http.Error(w, "could not create note - "+err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(noteId)

}

// PatchNoteHandler godoc
//	@Summary		Patch Note
//	@Description	Patch Note
//	@ID				patch-note
//	@Tags			Note
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	types.UpdateDataResponse	"Update Response"
//	@Failure		401	{string}	string						"Unauthorized"
//	@Failure		422	{object}	types.FieldErrors			"Unprocessible Entity"
//	@Router			/note [patch]
//	@Param			folder_id	query	string			true	"Folder ID"
//	@Param			note_id		query	string			true	"Note ID"
//	@Param			data		body	types.PatchNote	true	"Note Object"
func PatchNoteHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
	user := axon_core.User{
		AwsSession: aws.CreateSession(),
	}
	session, err := user.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	query := r.URL.Query()
	noteID := query.Get("note_id")
	folderID := query.Get("folder_id")

	if noteID == "" || folderID == "" {
		http.Error(w, "fields folder_id and note_id required in query", http.StatusBadRequest)
		return
	}

	decoder := json.NewDecoder(r.Body)
	var requestData types.PatchNote
	err = decoder.Decode(&requestData)

	if err != nil {
		http.Error(w, "fields folder_id, note_name, and note_description are required in request body", http.StatusBadRequest)
		return
	}
	validate := utils.NewValidator()
	if err := validate.Struct(requestData); err != nil {
		err := utils.CheckErrors(
			context.TODO(), err, http.StatusUnprocessableEntity, "note",
		)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnprocessableEntity)
		json.NewEncoder(w).Encode(err)
		return
	}

	note := axon_core.Note{
		Session: session,
		AwsSession: aws.CreateSession(),

	}

	updatedData, err := note.UpdateNote(a, &requestData.NoteName, &requestData.NoteDescription, folderID, noteID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(updatedData)

}

// DeleteNoteHandler godoc
//	@Summary		Delete Note
//	@Description	Delete Note
//	@ID				delete-note
//	@Tags			Note
//	@Accept			json
//	@Produce		json
//	@Success		200	{string}	string	"Records Deleted"
//	@Failure		400	{string}	string	"Bad Request"
//	@Failure		401	{string}	string	"Unauthorized"
//	@Router			/note [delete]
//	@Param			folder_id	query	string	true	"Folder ID"
//	@Param			note_id		query	string	true	"Note ID"
func DeleteNoteHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
	user := axon_core.User{
		AwsSession: aws.CreateSession(),
	}
	session, err := user.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	query := r.URL.Query()
	folderID := query.Get("folder_id")
	noteID := query.Get("note_id")
	if folderID == "" {
		http.Error(w, "fields folder_id and note_id required in query", http.StatusBadRequest)
		return
	}

	note := axon_core.Note{
		Session: session,
		AwsSession: aws.CreateSession(),

	}

	res, err := note.DeleteNote(a, folderID, noteID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}
