package routes

import (
	"encoding/json"
	"fmt"
	"net/http"

	_ "axon-auth/src/types"

	axon_core "github.com/stephensanwo/axon-lib/core"
	axon_session "github.com/stephensanwo/axon-lib/session"
	axon_types "github.com/stephensanwo/axon-lib/types"
)

// AuthCallback godoc
//	@Summary		AuthCallback
//	@Description	AuthCallback
//	@Tags			Auth
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	types.BaseResponse
//	@Router			/callback [get]
func AuthCallbackHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
	query := r.URL.Query()
	code := query.Get("code")
	token, err := a.Oauth.Exchange(a.Context, code)

	if err != nil {
		http.Redirect(w, r, a.Settings.AxonClient.ErrorUrl, http.StatusUnauthorized)
	}

	// Create User
	user := axon_core.User{}
	fmt.Println("user",user)

	userData, err := user.CreateUser(a, token)
	fmt.Println("User data", userData)
	// Create User Session Data
	sessionData := axon_types.Session{
		SessionId: axon_session.NewSessionId(),
		SessionData: axon_types.UserCache{
			User:        *userData,
			AccessToken: token.AccessToken,
		},
	}

	fmt.Println("Session data", sessionData)

	session := axon_session.SessionManager{
		CookieName: axon_types.AUTH_SESSION,
		SessionId:  sessionData.SessionId,
	}

	fmt.Println("Session", session)

	session.CreateSession(w, a, &sessionData)
	fmt.Println("Session created")

	if err != nil {
		http.Redirect(w, r, a.Settings.AxonClient.ErrorUrl, http.StatusUnauthorized)
	} else {
		http.Redirect(w, r, a.Settings.AxonClient.AuthRedirectUrl, http.StatusPermanentRedirect)

	}
}

// QueryUserData godoc
//	@Summary		Query Authenticated User
//	@Description	Query Authenticated User
//	@Tags			User
//	@ID				get-auth-user
//	@Success		200	{object}	axon_types.Folder	"User"
//	@Failure		400	{string}	string			"Bad Request"
//	@Failure		401	{string}	string			"Unauthorized"
//	@Router			/auth-user [get]
func QueryUserData(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
	user := axon_core.User{}
	
	session, err := user.GetAuthenticatedUserData(a)

	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(session.SessionData.User)
}
