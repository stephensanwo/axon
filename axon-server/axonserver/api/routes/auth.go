package routes

import (
	"axon-server/axonserver/api/session"
	"axon-server/axonserver/core"
	"axon-server/axonserver/types"
	"encoding/json"
	"net/http"
)

// AuthCallback godoc
// @Summary      AuthCallback
// @Description  AuthCallback
// @Tags         Auth
// @Accept       json
// @Produce      json
// @Success      200  {object}  types.BaseResponse
// @Router       /callback [get]
func AuthCallbackHandler(w http.ResponseWriter, r *http.Request, a *types.AxonContext) {
	query := r.URL.Query()
	code := query.Get("code")
	token, err := a.Oauth.Exchange(a.Context, code)

	if err != nil {
		http.Redirect(w, r, a.Settings.AxonClient.ErrorUrl, http.StatusUnauthorized)
	}
	// Create User
	user, err := core.CreateUser(a, token)

	// Create User Session
	sessionData := session.Session{
		SessionId: session.NewSessionId(),
		SessionData: types.UserCache{
			User:        *user,
			AccessToken: token.AccessToken,
		},
	}

	session := session.SessionManager{
		CookieName: types.AUTH_SESSION,
		SessionId:  sessionData.SessionId,
	}

	session.CreateSession(w, a, &sessionData)

	if err != nil {
		http.Redirect(w, r, a.Settings.AxonClient.ErrorUrl, http.StatusUnauthorized)
	} else {
		http.Redirect(w, r, a.Settings.AxonClient.AuthRedirectUrl, http.StatusPermanentRedirect)

	}
}

// QueryUserData godoc
// @Summary      Query Authenticated User
// @Description  Query Authenticated User
// @Tags         User
// @ID get-auth-user
// @Success      200  {object}  types.Folder "User"
// @Failure      400  {string}	string "Bad Request"
// @Failure      401  {string}	string "Unauthorized"
// @Router /auth-user [get]
func QueryUserData(w http.ResponseWriter, r *http.Request, a *types.AxonContext) {
	session, err := core.GetAuthenticatedUserData(a)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(session.SessionData.User)
}
