package routes

import (
	"encoding/json"
	"fmt"
	"net/http"

	axon_core "github.com/stephensanwo/axon-lib/core"
	axon_coredb "github.com/stephensanwo/axon-lib/coredb"
	axon_session "github.com/stephensanwo/axon-lib/session"
	axon_types "github.com/stephensanwo/axon-lib/types"
)

//  EventsHandler godoc
//	@Summary		Create a new socket session-token
//	@Description	Create a new socket session-token
//	@Tags			Socket
//	@ID				socket-session-token
//	@Accept			json
//	@Produce		json
//	@Success		200	{string}	string
//	@Failure		400	{string}	string	"Bad Request"
//	@Failure		401	{string}	string	"Unauthorized"
//	@Router			/socket-session-token [get]
func GetSessionTokenHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
	user := axon_core.User{}
	// Create the DynamoDB client
	db, err := axon_coredb.NewDb()
	
	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
	}

	userSession, err := user.GetAuthenticatedUserData(a)
	
	if err != nil || userSession.SessionId == "" {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	// Create events session
	eventSessionToken := axon_session.NewSessionId()

	tokenSessionData := axon_types.Session{
		SessionId: eventSessionToken,
		SessionData: axon_types.UserCache{
			User:        userSession.SessionData.User,
			AccessToken: "",
		},
	}

	err = db.CacheData(axon_types.AXON_USER_SESSION_TABLE, fmt.Sprintf("AXONEVENTTOKEN#%s", eventSessionToken), eventSessionToken, tokenSessionData, 12 * 60 * 60)

	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
	}
	
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(eventSessionToken)
}