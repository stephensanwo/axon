package api

import (
	"context"
	"net/http"

	_ "axon-events/docs/swagger"
	routes "axon-events/lib/events/routes"

	log "github.com/sirupsen/logrus"
	axon_types "github.com/stephensanwo/axon-lib/types"
	"github.com/stephensanwo/handlers"
	"github.com/stephensanwo/mux"
	"golang.org/x/oauth2"
)

type AxonEventService struct {
	Routes      *[]axon_types.Route
	AxonContext *axon_types.AxonContext
}

func (a AxonEventService) ErrorHandler(w http.ResponseWriter, err error) {
	http.Error(w, err.Error(), http.StatusInternalServerError)
}

func (a AxonEventService) AuthenticationErrorHandler(w http.ResponseWriter, err error) {
	http.Error(w, err.Error(), http.StatusUnauthorized)
}

func (a AxonEventService) PublicHandler(fn func(http.ResponseWriter, *http.Request, *axon_types.AxonContext)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fn(w, r, a.AxonContext)

	}
}

func (a AxonEventService) PrivateHandler(fn func(http.ResponseWriter, *http.Request, *axon_types.AxonContext)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie(axon_types.AUTH_SESSION)
		if cookie == nil || err != nil {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
		} else {
			a.AxonContext.SessionId = cookie.Value
			fn(w, r, a.AxonContext)
		}
	}
}

func (a AxonEventService) ConfigureLogger() {
	if a.AxonContext.Settings.Metadata.Environment == axon_types.DEVELOPMENT {
		log.SetFormatter(&log.TextFormatter{DisableColors: false,
			FullTimestamp: true})
	} else {
		log.SetFormatter(&log.JSONFormatter{})
	}
}


func (a AxonEventService) CreateSocket() {
	a.ConfigureLogger()
	r := mux.NewRouter()

	ALLOWED_ORIGINS := handlers.AllowedOrigins(a.AxonContext.Settings.HttpSettings.AllowedOrigins)
	ALLOWED_METHODS := handlers.AllowedMethods(a.AxonContext.Settings.HttpSettings.AllowedMethods)
	ALLOWED_HEADERS := handlers.AllowedHeaders(a.AxonContext.Settings.HttpSettings.AllowedHeaders)
	EXPOSED_HEADERS := handlers.ExposedHeaders(a.AxonContext.Settings.HttpSettings.ExposedHeaders)
	ALLOWED_CREDENTIALS := handlers.AllowCredentials()
	MAX_AGE := handlers.MaxAge(a.AxonContext.Settings.HttpSettings.MaxAge)
	
	for _, item := range *a.Routes {
		switch item.Auth {
		case axon_types.PublicRoute:
			{r.HandleFunc(item.Path, a.PublicHandler(item.Handler)).Methods(item.Method)}
		case axon_types.PrivateRoute:
			{r.HandleFunc(item.Path, a.PrivateHandler(item.Handler)).Methods(item.Method)}
		}
	}
	
	// Socket Manager
	socket := NewSocketManager(a.AxonContext)
	defer socket.Close()
	r.Handle("/socket.io/", socket)
	
	log.Println("Server running on port 8201")
	log.Fatal(http.ListenAndServe("127.0.0.1:8201", handlers.CORS(ALLOWED_ORIGINS, ALLOWED_METHODS, ALLOWED_HEADERS,EXPOSED_HEADERS,ALLOWED_CREDENTIALS,MAX_AGE)(r) ))
}

func NewAxonEventService(settings *axon_types.Settings) {
	routes := routes.GetRoutes()

	axonContext := axon_types.AxonContext{
		Context:  context.Background(),
		Settings: *settings,
		Oauth: oauth2.Config{},
		SessionId:          "",
	}

	service := AxonEventService{
		Routes:      &routes,
		AxonContext: &axonContext,
	}

	service.CreateSocket()
}