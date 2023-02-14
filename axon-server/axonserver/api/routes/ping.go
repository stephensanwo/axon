package routes

import (
	"axon-server/axonserver/types"
	"encoding/json"
	"net/http"
)

// Ping godoc
// @Summary      Ping the server
// @Description  Ping the server
// @Tags         Ping
// @Produce      json
// @Success      201  {object} types.BaseResponse
// @Router       /ping [get]
func PingHandler(w http.ResponseWriter, r *http.Request, a *types.AxonContext) {
	ping := types.BaseResponse{
		Message: "Server Online",
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ping)

}
