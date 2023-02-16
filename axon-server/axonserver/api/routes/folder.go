package routes

import (
	"axon-server/axonserver/core"
	"axon-server/axonserver/types"
	"axon-server/axonserver/utils"
	"context"
	"encoding/json"
	"net/http"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// FoldersHandler godoc
// @Summary      FoldersHandler
// @Description  FoldersHandler
// @Tags         Folder
// @Accept       json
// @Produce      json
// @Success      200  {object}  []types.Folder
// @Failure      401  {string}	string "Unauthorized"
// @Failure      500  {string}	string "Internal Server Error"
// @Router       /folders [get]
func QueryFoldersHandler(w http.ResponseWriter, r *http.Request, a *types.AxonContext) {
	session, err := core.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	folder := core.Folder{
		Session: session,
	}

	folders, err := folder.GetFolders(a)
	if err != nil {
		http.Error(w, "Could not fetch data", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(folders)

}

// FolderHandler godoc
// @Summary      Query Folder
// @Description  Query Folder
// @Tags         Folder
// @ID get-folder
// @Accept       json
// @Produce      json
// @Success      200  {object}  types.Folder "Folder"
// @Failure      401  {string}	string "Unauthorized"
// @Router /folder [get]
// @Param 		 id query string true "Folder ID"
func QueryFolderHandler(w http.ResponseWriter, r *http.Request, a *types.AxonContext) {
	session, err := core.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
	}
	query := r.URL.Query()
	folderID := query.Get("id")
	if folderID == "" {
		http.Error(w, "Folder ID not provided in query", http.StatusBadRequest)
		return
	}
	folder := core.Folder{
		Session: session,
	}
	id, _ := primitive.ObjectIDFromHex(folderID)
	res, err := folder.FindFolder(a, &id)
	if err != nil {
		http.Error(w, "Folder not found", http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}

// FolderHandler godoc
// @Summary      Create New Folder
// @Description  Create New Folder
// @ID post-folder
// @Tags         Folder
// @Accept       json
// @Produce      json
// @Success      201  {string}  types.Folder.FolderID "Folder Id"
// @Failure      401  {string}	string "Unauthorized"
// @Failure      401  {object}	types.FieldErrors "Bad Request"
// @Router  /folder [post]
// @Param 		 data body types.MutateFolder true "Folder Object"
func PostFolderHandler(w http.ResponseWriter, r *http.Request, a *types.AxonContext) {
	session, err := core.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
	}
	decoder := json.NewDecoder(r.Body)
	var requestData types.MutateFolder
	err = decoder.Decode(&requestData)
	if err != nil {
		http.Error(w, "Folder data not provided in request body", http.StatusBadRequest)
		return
	}
	validate := utils.NewValidator()
	if err := validate.Struct(requestData); err != nil {
		err := utils.CheckErrors(
			context.TODO(), err, http.StatusBadRequest, "user",
		)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(err)
		return
	}

	folder := core.Folder{
		Session: session,
	}
	// Create new folder
	folderId, err := folder.CreateFolder(a, requestData.FolderName)
	if err != nil {
		http.Error(w, "Could not create folder", http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(folderId)

}

// FolderHandler godoc
// @Summary      Patch Folder
// @Description  Patch Folder
// @ID patch-folder
// @Tags         Folder
// @Accept       json
// @Produce      json
// @Success      201  {string}  types.Folder.FolderID "Folder Id"
// @Failure      401  {string}	string "Unauthorized"
// @Router  /folder [patch]
// @Param 		 id query string true "Folder ID"
// @Param 		 data body types.MutateFolder true "Folder Object"
func PatchFolderHandler(w http.ResponseWriter, r *http.Request, a *types.AxonContext) {
	session, err := core.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
	}
	query := r.URL.Query()
	folderID := query.Get("id")

	decoder := json.NewDecoder(r.Body)
	var requestData types.MutateFolder
	err = decoder.Decode(&requestData)

	if err != nil {
		http.Error(w, "Folder data not provided in request body", http.StatusBadRequest)
		return
	}
	validate := utils.NewValidator()
	if err := validate.Struct(requestData); err != nil {
		err := utils.CheckErrors(
			context.TODO(), err, http.StatusBadRequest, "user",
		)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(err)
		return
	}

	folder := core.Folder{
		Session: session,
	}

	if folderID == "" {
		http.Error(w, "Folder ID not provided in query", http.StatusBadRequest)
	}

	id, _ := primitive.ObjectIDFromHex(folderID)

	updatedData, err := folder.UpdateFolder(a, &id, requestData.FolderName)
	if err != nil {
		http.Error(w, "Could not update data", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(updatedData)

}

// FolderHandler godoc
// @Summary      Delete Folder
// @Description  Delete Folder
// @ID delete-folder
// @Tags         Folder
// @Accept       json
// @Produce      json
// @Success      200  {object}  types.Folder "Folder"
// @Failure      401  {string}	string "Unauthorized"
// @Router /folder [delete]
// @Param 		 id query string true "Folder ID"
func DeleteFolderHandler(w http.ResponseWriter, r *http.Request, a *types.AxonContext) {
	session, err := core.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
	}
	query := r.URL.Query()
	folderID := query.Get("id")

	folder := core.Folder{
		Session: session,
	}

	if folderID == "" {
		http.Error(w, "Folder ID not provided in query", http.StatusBadRequest)
	}

	id, _ := primitive.ObjectIDFromHex(folderID)

	res, err := folder.DeleteFolder(a, &id)
	if err != nil {
		http.Error(w, "Could not delete folder", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res.DeletedCount)
}
