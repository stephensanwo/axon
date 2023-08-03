package routes

import (
	"encoding/json"
	"net/http"

	aws "axon-server/src/aws"

	axon_core "github.com/stephensanwo/axon-lib/core"
	axon_types "github.com/stephensanwo/axon-lib/types"
)

// PublisherHandler godoc
//	@Summary		Publish Messages to Channel
//	@Description	Publish Messages to Channel
//	@Tags			Note
//	@ID				publish
//	@Accept			json
//	@Produce		json
//	@Success		200			{object}	[]axon_types.Note	"Notes"
//	@Failure		400			{string}	string			"Bad Request"
//	@Failure		401			{string}	string			"Unauthorized"
//	@Param			folder_id	query		string			true	"Folder ID"
//	@Router			/notes [get]
func PublisherHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
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
