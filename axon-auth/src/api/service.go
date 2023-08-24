package api

import (
	"context"
	"net/http"

	_ "axon-auth/docs/swagger"
	routes "axon-auth/src/api/routes"

	log "github.com/sirupsen/logrus"
	axon_types "github.com/stephensanwo/axon-lib/types"
	"github.com/stephensanwo/handlers"
	"github.com/stephensanwo/mux"
	httpSwagger "github.com/swaggo/http-swagger"
	oauth2 "golang.org/x/oauth2"
)

type AxonAuthService struct {
	Routes      *[]axon_types.Route
	AxonContext *axon_types.AxonContext
}

func (a AxonAuthService) ErrorHandler(w http.ResponseWriter, err error) {
	http.Error(w, err.Error(), http.StatusInternalServerError)
}

func (a AxonAuthService) AuthenticationErrorHandler(w http.ResponseWriter, err error) {
	http.Error(w, err.Error(), http.StatusUnauthorized)
}

func (a AxonAuthService) PublicHandler(fn func(http.ResponseWriter, *http.Request, *axon_types.AxonContext)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fn(w, r, a.AxonContext)

	}
}

func (a AxonAuthService) PrivateHandler(fn func(http.ResponseWriter, *http.Request, *axon_types.AxonContext)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie(axon_types.AUTH_SESSION)
		if cookie == nil || err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
		} else {
			a.AxonContext.SessionId = cookie.Value
			fn(w, r, a.AxonContext)
		}

	}
}

func (a AxonAuthService) ConfigureLogger() {
	if a.AxonContext.Settings.Metadata.Environment == axon_types.DEVELOPMENT {
		log.SetFormatter(&log.TextFormatter{DisableColors: false,
			FullTimestamp: true})
	} else {
		log.SetFormatter(&log.JSONFormatter{})
	}
}

func (a AxonAuthService) CreateApi() {
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
	r.HandleFunc("/docs/*", httpSwagger.Handler(
		httpSwagger.URL("https://127.0.0.1:8301/docs/doc.json"),
	))
	r.PathPrefix("/docs").Handler(httpSwagger.WrapHandler)

	log.Println("Server running on port 8301")
	log.Fatal(http.ListenAndServeTLS("127.0.0.1:8301", "./ssl/server.crt", "./ssl/server.key", handlers.CORS(ALLOWED_ORIGINS, ALLOWED_METHODS, ALLOWED_HEADERS,EXPOSED_HEADERS,ALLOWED_CREDENTIALS,MAX_AGE)(r) ))
	// log.Fatal(http.ListenAndServe("127.0.0.1:8301", handlers.CORS(ALLOWED_ORIGINS, ALLOWED_METHODS, ALLOWED_HEADERS,EXPOSED_HEADERS,ALLOWED_CREDENTIALS,MAX_AGE)(r) ))
}

func NewAxonAuthService(settings *axon_types.Settings) {
	routes := routes.GetRoutes()

	axonContext := axon_types.AxonContext{
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
		SessionId:          "",
	}

	service := AxonAuthService{
		Routes:      &routes,
		AxonContext: &axonContext,
	}

	service.CreateApi()
}