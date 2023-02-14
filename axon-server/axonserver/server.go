package axonserver

import (
	handlers "axon-server/axonserver/api/routes"
	types "axon-server/axonserver/types"
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

	service := types.AxonService{
		Routes:      &routes,
		AxonContext: &axonContext,
	}

	service.CreateApi()
}
