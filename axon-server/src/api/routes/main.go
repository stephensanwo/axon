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
			Auth:    axon_types.PublicRoute,
			Handler: QueryUserData,
			Method:  http.MethodGet,
		},
		{
			Path:    "/folder-list",
			Auth:    axon_types.PrivateRoute,
			Handler: QueryFolderListHandler,
			Method:  http.MethodGet,
		},
		{
			Path:    "/folders",
			Auth:    axon_types.PrivateRoute,
			Handler: QueryFoldersHandler,
			Method:  http.MethodGet,
		},
		{
			Path:    "/folder",
			Auth:    axon_types.PrivateRoute,
			Handler: QueryFolderHandler,
			Method:  http.MethodGet,
		},
		{
			Path:    "/folder",
			Auth:    axon_types.PrivateRoute,
			Handler: PostFolderHandler,
			Method:  http.MethodPost,
		},
		{
			Path:    "/folder",
			Auth:    axon_types.PrivateRoute,
			Handler: PatchFolderHandler,
			Method:  http.MethodPatch,
		},
		{
			Path:    "/folder",
			Auth:    axon_types.PrivateRoute,
			Handler: DeleteFolderHandler,
			Method:  http.MethodDelete,
		},
		{
			Path:    "/note-detail",
			Auth:    axon_types.PrivateRoute,
			Handler: QueryNoteDetail,
			Method:  http.MethodGet,
		},

		{
			Path:    "/notes",
			Auth:    axon_types.PrivateRoute,
			Handler: QueryNotesHandler,
			Method:  http.MethodGet,
		},
		{
			Path:    "/note",
			Auth:    axon_types.PrivateRoute,
			Handler: QueryNoteHandler,
			Method:  http.MethodGet,
		},
		{
			Path:    "/note",
			Auth:    axon_types.PrivateRoute,
			Handler: PostNoteHandler,
			Method:  http.MethodPost,
		},
		{
			Path:    "/note",
			Auth:    axon_types.PrivateRoute,
			Handler: PatchNoteHandler,
			Method:  http.MethodPatch,
		},
		{
			Path:    "/note",
			Auth:    axon_types.PrivateRoute,
			Handler: DeleteNoteHandler,
			Method:  http.MethodDelete,
		},
	}

	return routes
}