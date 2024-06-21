package routes

import (
	"axon-server/lib/types"
	"axon-server/lib/utils"
	"context"
	"encoding/json"
	"net/http"

	axon_core "github.com/stephensanwo/axon-lib/core"
	axon_types "github.com/stephensanwo/axon-lib/types"
)

// QueryFolderListHandler godoc
//	@Summary		Query folder list from db or cache
//	@Description	Query folder list from db or cache
//	@Tags			Folder
//	@ID				get-folder-list
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	[]axon_types.FolderList
//	@Failure		400	{string}	string	"Bad Request"
//	@Failure		401	{string}	string	"Unauthorized"
//	@Router			/folder-list [get]
func QueryFolderListHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
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

	folder := axon_core.Folder{Session: *session}
	folders, err := folder.GetFolderList(a)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(folders)
}

// FoldersHandler godoc
//	@Summary		Query all folders
//	@Description	Query all folders
//	@Tags			Folder
//	@ID				get-folders
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	[]axon_types.Folder
//	@Failure		400	{string}	string	"Bad Request"
//	@Failure		401	{string}	string	"Unauthorized"
//	@Router			/folders [get]
func QueryFoldersHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
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

	folder := axon_core.Folder{Session: *session}
	folders, err := folder.GetFolders(a)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(folders)
}

// QueryFolderHandler godoc
//	@Summary		Query Folder
//	@Description	Query Folder
//	@Tags			Folder
//	@ID				get-folder
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	axon_types.Folder	"Folder"
//	@Failure		400	{string}	string			"Bad Request"
//	@Failure		401	{string}	string			"Unauthorized"
//	@Router			/folder [get]
//	@Param			folder_id	query	string	true	"Folder ID"
func QueryFolderHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
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
	folder := axon_core.Folder{Session: *session}
	res, err := folder.FindFolder(a, folderID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}

// PostFolderHandler godoc
//	@Summary		Create New Folder
//	@Description	Create New Folder
//	@ID				post-folder
//	@Tags			Folder
//	@Accept			json
//	@Produce		json
//	@Success		201	{string}	axon_types.Folder.FolderID	"Folder Id"
//	@Failure		400	{string}	string					"Bad Request"
//	@Failure		401	{string}	string					"Unauthorized"
//	@Failure		422	{object}	types.FieldErrors		"Unprocessible Entity"
//	@Router			/folder [post]
//	@Param			data	body	types.MutateFolder	true	"Folder Object"
func PostFolderHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
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
	var requestData types.MutateFolder
	err = decoder.Decode(&requestData)
	if err != nil {
		http.Error(w, "field folder_name required in request body", http.StatusBadRequest)
		return
	}
	validate := utils.NewValidator()
	if err := validate.Struct(requestData); err != nil {
		err := utils.CheckErrors(
			context.TODO(), err, http.StatusUnprocessableEntity, "folder",
		)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnprocessableEntity)
		json.NewEncoder(w).Encode(err)
		return
	}
	folder := axon_core.Folder{Session: *session}
	folderId, err := folder.CreateFolder(a, requestData.FolderName)
	if err != nil {
		http.Error(w, "could not create folder - "+err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(folderId)
}

// PatchFolderHandler godoc
//	@Summary		Patch Folder
//	@Description	Patch Folder
//	@ID				patch-folder
//	@Tags			Folder
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	types.UpdateDataResponse	"Update Response"
//	@Failure		401	{string}	string						"Unauthorized"
//	@Failure		422	{object}	types.FieldErrors			"Unprocessible Entity"
//	@Router			/folder [patch]
//	@Param			folder_id	query	string				true	"Folder ID"
//	@Param			data		body	types.MutateFolder	true	"Folder Object"
func PatchFolderHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
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
		http.Error(w, "foeld folder_id required in query", http.StatusBadRequest)
		return
	}
	decoder := json.NewDecoder(r.Body)
	var requestData types.MutateFolder
	err = decoder.Decode(&requestData)
	if err != nil {
		http.Error(w, "field folder_name required in request body", http.StatusBadRequest)
		return
	}
	validate := utils.NewValidator()
	if err := validate.Struct(requestData); err != nil {
		err := utils.CheckErrors(
			context.TODO(), err, http.StatusUnprocessableEntity, "folder",
		)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnprocessableEntity)
		json.NewEncoder(w).Encode(err)
		return
	}
	folder := axon_core.Folder{Session: *session}
	updatedData, err := folder.UpdateFolder(a, requestData.FolderName, folderID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(updatedData)
}

// DeleteFolderHandler godoc
//	@Summary		Delete Folder
//	@Description	Delete Folder
//	@ID				delete-folder
//	@Tags			Folder
//	@Accept			json
//	@Produce		json
//	@Success		200	{string}	string	"Records Deleted"
//	@Failure		400	{string}	string	"Bad Request"
//	@Failure		401	{string}	string	"Unauthorized"
//	@Router			/folder [delete]
//	@Param			folder_id	query	string	true	"Folder ID"
func DeleteFolderHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
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
	folder := axon_core.Folder{Session: *session}
	if folderID == "" {
		http.Error(w, "field folder_id required in query", http.StatusBadRequest)
		return
	}
	res, err := folder.DeleteFolder(a, folderID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}
