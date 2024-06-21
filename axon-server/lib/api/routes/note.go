package routes

import (
	"axon-server/lib/types"
	"axon-server/lib/utils"
	"context"
	"encoding/json"
	"net/http"
	"time"

	axon_core "github.com/stephensanwo/axon-lib/core"
	axon_types "github.com/stephensanwo/axon-lib/types"
)

// QueryNoteSummary godoc
//	@Summary		Query Note Summary
//	@Description	Query Note Summary
//	@Tags			Note
//	@ID				get-note-summary
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	axon_types.NoteSummary	"NoteSummary"
//	@Failure		400	{string}	string				"Bad Request"
//	@Failure		401	{string}	string				"Unauthorized"
//	@Router			/note-summary [get]
//	@Param			folder_id	query	string	true	"Folder ID"
//	@Param			note_id		query	string	true	"Note ID"
func QueryNoteSummaryHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
	user := axon_core.User{}
	
	session, err := user.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	
	isSubsribed := user.GetAuthenticatedUserPaymentInfo(a, *session)
	if !isSubsribed {
		http.Error(w, "payment required", http.StatusPaymentRequired)
		return
	}

	query := r.URL.Query()
	folderID := query.Get("folder_id")
	noteID := query.Get("note_id")
	if folderID == "" || noteID == "" {
		http.Error(w, "fields note_id and folder_id are required in query", http.StatusBadRequest)
		return
	}
	note := axon_core.Note{Session: *session}
	res, err := note.GetNoteSummary(a, folderID, noteID)
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
	user := axon_core.User{}
	
	session, err := user.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	
	isSubsribed := user.GetAuthenticatedUserPaymentInfo(a, *session)
	if !isSubsribed {
		http.Error(w, "payment required", http.StatusPaymentRequired)
		return
	}

	query := r.URL.Query()
	folderID := query.Get("folder_id")
	if folderID == "" {
		http.Error(w, "field folder_id is required in query", http.StatusBadRequest)
		return
	}
	note := axon_core.Note{Session: *session}
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
	user := axon_core.User{}
	
	session, err := user.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	isSubsribed := user.GetAuthenticatedUserPaymentInfo(a, *session)
	if !isSubsribed {
		http.Error(w, "payment required", http.StatusPaymentRequired)
		return
	}

	query := r.URL.Query()
	folderID := query.Get("folder_id")
	noteID := query.Get("note_id")
	if folderID == "" || noteID == "" {
		http.Error(w, "fields note_id and folder_id are required in query", http.StatusBadRequest)
		return
	}
	note := axon_core.Note{Session: *session}
	res, err := note.FindNote(a, folderID, noteID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// time.Sleep(15 * time.Second) // Simulate delay
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
	user := axon_core.User{}
	
	session, err := user.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	isSubsribed := user.GetAuthenticatedUserPaymentInfo(a, *session)
	if !isSubsribed {
		http.Error(w, "payment required", http.StatusPaymentRequired)
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
	note := axon_core.Note{Session: *session}
	noteRes, err := note.CreateNote(a, requestData.NoteName, requestData.NoteDescription, requestData.FolderId)
	if err != nil {
		http.Error(w, "could not create note - "+err.Error(), http.StatusBadRequest)
		return
	}

    noteSummary := axon_types.NoteSummary{
        UserId:      noteRes.UserId,
        FolderID:    noteRes.FolderID,
        NoteID:      noteRes.NoteID,
        NoteName:    noteRes.NoteName,
        Description: noteRes.Description,
        DateCreated: noteRes.DateCreated,
        LastEdited:  noteRes.LastEdited,
    }

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(noteSummary)
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
	user := axon_core.User{}
	
	session, err := user.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	isSubsribed := user.GetAuthenticatedUserPaymentInfo(a, *session)
	if !isSubsribed {
		http.Error(w, "payment required", http.StatusPaymentRequired)
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
	note := axon_core.Note{Session: *session}
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
	user := axon_core.User{}
	
	session, err := user.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	isSubsribed := user.GetAuthenticatedUserPaymentInfo(a, *session)
	if !isSubsribed {
		http.Error(w, "payment required", http.StatusPaymentRequired)
		return
	}

	query := r.URL.Query()
	folderID := query.Get("folder_id")
	noteID := query.Get("note_id")
	if folderID == "" {
		http.Error(w, "fields folder_id and note_id required in query", http.StatusBadRequest)
		return
	}
	note := axon_core.Note{Session: *session}
	res, err := note.DeleteNote(a, folderID, noteID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}

// PublishPublicNoteHandler godoc
//	@Summary		Create New Public Note
//	@Description	Create New Public Note
//	@ID				publish-public-note
//	@Tags			Note
//	@Accept			json
//	@Produce		json
//	@Success		201	{string}	axon_types.PublicNote.PublicNoteID	"Public Note Id"
//	@Failure		400	{string}	string				"Bad Request"
//	@Failure		401	{string}	string				"Unauthorized"
//	@Failure		422	{object}	types.FieldErrors	"Unprocessible Entity"
//	@Router			/publish-public-note [post]
//	@Param			data	body	types.PostPublicNote	true	"Public Note Request Object"
func PublishPublicNoteHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
	user := axon_core.User{}
	
	session, err := user.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	isSubsribed := user.GetAuthenticatedUserPaymentInfo(a, *session)
	if !isSubsribed {
		http.Error(w, "payment required", http.StatusPaymentRequired)
		return
	}

	decoder := json.NewDecoder(r.Body)
	var requestData types.PostPublicNote
	err = decoder.Decode(&requestData)
	if err != nil {
		http.Error(w, "fields public_note_id, folder_id and note_id are required in request body", http.StatusBadRequest)
		return
	}
	validate := utils.NewValidator()
	if err := validate.Struct(requestData); err != nil {
		err := utils.CheckErrors(
			context.TODO(), err, http.StatusUnprocessableEntity, "publish note",
		)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnprocessableEntity)
		json.NewEncoder(w).Encode(err)
		return
	}
	note := axon_core.Note{Session: *session}
	publicNoteId, err := note.CreatePublicNote(a, requestData.PublicNoteID, requestData.FolderID, requestData.NoteID)
	if err != nil {
		http.Error(w, "could not create public note - "+err.Error(), http.StatusBadRequest)
		return
	}
	time.Sleep(5 * time.Second) // Simulate delay
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(publicNoteId)
}

// QueryPublicNoteHandler godoc
//	@Summary		Query Public Note
//	@Description	Query Public Note
//	@Tags			Public Note
//	@ID				get-public-note
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	axon_types.Note	"Public Note"
//	@Failure		400	{string}	string		"Bad Request"
//	@Failure		401	{string}	string		"Unauthorized"
//	@Router			/get-public-note [get]
//	@Param			public_note_id	query	string	true	"Public Note ID"
func QueryPublicNoteHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
	query := r.URL.Query()
	publicNoteID := query.Get("public_note_id")

	if publicNoteID == ""{
		http.Error(w, "field publicNoteID is required in query", http.StatusBadRequest)
		return
	}

	res, err := axon_core.GetPublicNote(publicNoteID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}

// QuerySharedNoteHandler godoc
//	@Summary		Query Shared Note
//	@Description	Query Shared Note
//	@Tags			Note
//	@ID				get-shared-note
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	string	"Public Note ID"
//	@Failure		400	{string}	string		"Bad Request"
//	@Failure		401	{string}	string		"Unauthorized"
//	@Router			/get-shared-note [get]
//	@Param			note_id	query	string	true	"Note ID"
func QuerySharedNoteHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
	user := axon_core.User{}
	
	session, err := user.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	isSubsribed := user.GetAuthenticatedUserPaymentInfo(a, *session)
	if !isSubsribed {
		http.Error(w, "payment required", http.StatusPaymentRequired)
		return
	}
	
	query := r.URL.Query()
	noteID := query.Get("note_id")

	if noteID == "" {
		http.Error(w, "field note_id is required in query", http.StatusBadRequest)
		return
	}
	note := axon_core.Note{
		Session: *session,

	}

	res, err := note.FindSharedNotePublicID(a, noteID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}