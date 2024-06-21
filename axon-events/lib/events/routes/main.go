package routes

import (
	"net/http"

	axon_types "github.com/stephensanwo/axon-lib/types"
)

func GetRoutes() []axon_types.Route {
	routes := []axon_types.Route{
		{
			Path:    "/",
			Auth:    axon_types.PublicRoute,
			Handler: PingHandler,
			Method:  http.MethodGet,
		},
		{
			Path:    "/socket-session-token",
			Auth:    axon_types.PrivateRoute,
			Handler: GetSessionTokenHandler,
			Method:  http.MethodGet,
		},
	}

	return routes
}