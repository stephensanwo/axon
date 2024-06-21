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
			Path:    "/note-summary",
			Auth:    axon_types.PrivateRoute,
			Handler: QueryNoteSummaryHandler,
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
		{
			Path:    "/publish-public-note",
			Auth:    axon_types.PrivateRoute,
			Handler: PublishPublicNoteHandler,
			Method:  http.MethodPost,
		}, 
		{
			Path:    "/get-shared-note",
			Auth:    axon_types.PublicRoute,
			Handler: QuerySharedNoteHandler,
			Method:  http.MethodGet,
		}, 
		{
			Path:    "/get-public-note",
			Auth:    axon_types.PublicRoute,
			Handler: QueryPublicNoteHandler,
			Method:  http.MethodGet,
		}, 
		{
			Path:    "/upload-media",
			Auth:    axon_types.PrivateRoute,
			Handler: UploadMediaHandler,
			Method:  http.MethodPost,
		},
	}

	return routes
}