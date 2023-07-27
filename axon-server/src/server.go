package src

import (
	api "axon-server/src/api"
	handlers "axon-server/src/api/routes"
	types "axon-server/src/types"

	"context"
	"net/http"

	"golang.org/x/oauth2"
)

func Server(settings *types.Settings) {
	routes := []types.Route{
		{
			Path:    "/ping",
			Auth:    types.PublicRoute,
			Handler: handlers.PingHandler,
			Method:  http.MethodGet,
		},
		{
			Path:    "/callback",
			Auth:    types.PublicRoute,
			Handler: handlers.AuthCallbackHandler,
			Method:  http.MethodGet,
		},
		{
			Path:    "/auth-user",
			Auth:    types.PublicRoute,
			Handler: handlers.QueryUserData,
			Method:  http.MethodGet,
		},
		{
			Path:    "/folder-list",
			Auth:    types.PrivateRoute,
			Handler: handlers.QueryFolderListHandler,
			Method:  http.MethodGet,
		},
		{
			Path:    "/folders",
			Auth:    types.PrivateRoute,
			Handler: handlers.QueryFoldersHandler,
			Method:  http.MethodGet,
		},
		{
			Path:    "/folder",
			Auth:    types.PrivateRoute,
			Handler: handlers.QueryFolderHandler,
			Method:  http.MethodGet,
		},
		{
			Path:    "/folder",
			Auth:    types.PrivateRoute,
			Handler: handlers.PostFolderHandler,
			Method:  http.MethodPost,
		},
		{
			Path:    "/folder",
			Auth:    types.PrivateRoute,
			Handler: handlers.PatchFolderHandler,
			Method:  http.MethodPatch,
		},
		{
			Path:    "/folder",
			Auth:    types.PrivateRoute,
			Handler: handlers.DeleteFolderHandler,
			Method:  http.MethodDelete,
		},
		{
			Path:    "/note-detail",
			Auth:    types.PrivateRoute,
			Handler: handlers.QueryNoteDetail,
			Method:  http.MethodGet,
		},

		{
			Path:    "/notes",
			Auth:    types.PrivateRoute,
			Handler: handlers.QueryNotesHandler,
			Method:  http.MethodGet,
		},
		{
			Path:    "/note",
			Auth:    types.PrivateRoute,
			Handler: handlers.QueryNoteHandler,
			Method:  http.MethodGet,
		},
		{
			Path:    "/note",
			Auth:    types.PrivateRoute,
			Handler: handlers.PostNoteHandler,
			Method:  http.MethodPost,
		},
		{
			Path:    "/note",
			Auth:    types.PrivateRoute,
			Handler: handlers.PatchNoteHandler,
			Method:  http.MethodPatch,
		},
		{
			Path:    "/note",
			Auth:    types.PrivateRoute,
			Handler: handlers.DeleteNoteHandler,
			Method:  http.MethodDelete,
		},
	}

	axonContext := types.AxonContext{
		Context:  context.Background(),
		Settings: *settings,
		Oauth: oauth2.Config{
			ClientID:     settings.OauthSettings.ClientID,
			ClientSecret: settings.OauthSettings.ClientSecret,
			Scopes:       settings.OauthSettings.Scope,
			Endpoint: oauth2.Endpoint{
				AuthURL:  settings.OauthSettings.AuthorizeUrl,
				TokenURL: settings.OauthSettings.AccessTokenUrl,
			},
			RedirectURL: settings.OauthSettings.RedirectUri,
		},
		MongoDBCredentials: types.InitMongoDBCredentials(settings),
		SessionId:          "",
	}

	service := api.AxonService{
		Routes:      &routes,
		AxonContext: &axonContext,
	}

	service.CreateApi()
}
