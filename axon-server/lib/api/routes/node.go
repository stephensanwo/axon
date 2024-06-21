package routes

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
	"time"

	axon_core "github.com/stephensanwo/axon-lib/core"
	axon_types "github.com/stephensanwo/axon-lib/types"
)

// UploadMediaHandler godoc
// @Summary Upload media file
// @Description Upload a media file
// @ID upload-media
// @Tags Note
// @Accept mpfd
// @Produce json
// @Success 201 {string} string "File uploaded successfully"
// @Failure 400 {string} string "Bad Request"
// @Failure 401 {string} string "Unauthorized"
// @Router /upload-media [post]
// @Param file formData file true "Media file to upload"
func UploadMediaHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
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
	
	// Parse the request body as a multipart form
	err = r.ParseMultipartForm(10 << 20) // Set a limit on the size of the uploaded file
	if err != nil {
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}

	// Retrieve the file from the form data
	file, handler, err := r.FormFile("media")
	if err != nil {
		http.Error(w, "Unable to get file from form", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Create a new file on the server to store the uploaded file
	f, err := os.OpenFile("/Users/stephen.sanwo/Desktop/test/" +handler.Filename, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		http.Error(w, "Unable to create file on server", http.StatusInternalServerError)
		return
	}
	defer f.Close()
	// Simulate upload delay
	time.Sleep(5 * time.Second)
	// Copy the uploaded file to the server's file
	_, err = io.Copy(f, file)
	if err != nil {
		http.Error(w, "Unable to copy file to server", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode("https://imagedelivery.net/QvztslYf_CbfgwmRjfn0OA/1c5d99c2-b79e-46ea-13c6-8555812baa00/public") // Temp s3 Urls

}
