package routes

import (
	"axon-auth/lib/types"

	axon_types "github.com/stephensanwo/axon-lib/types"

	"encoding/json"
	"net/http"
)

// Ping godoc
//	@Summary		Ping the server
//	@Description	Ping the server
//	@Tags			Ping
//	@Produce		json
//	@Success		201	{object}	types.BaseResponse
//	@Router			/ping [get]
func PingHandler(w http.ResponseWriter, r *http.Request, a *axon_types.AxonContext) {
	ping := types.BaseResponse{
		Message: "Axon Auth Server Online",
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ping)

}
