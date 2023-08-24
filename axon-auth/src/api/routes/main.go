package routes

import (
	"net/http"

	axon_types "github.com/stephensanwo/axon-lib/types"
)

func GetRoutes() []axon_types.Route {
	routes := []axon_types.Route{
		{
			Path:    "/ping",
			Auth:    axon_types.PublicRoute,
			Handler: PingHandler,
			Method:  http.MethodGet,
		},
		{
			Path:    "/callback",
			Auth:    axon_types.PublicRoute,
			Handler: AuthCallbackHandler,
			Method:  http.MethodGet,
		},
		{
			Path:    "/auth-user",
			Auth:    axon_types.PrivateRoute,
			Handler: QueryUserData,
			Method:  http.MethodGet,
		},
	}

	return routes
}