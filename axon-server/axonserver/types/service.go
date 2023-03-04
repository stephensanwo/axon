package types

import (
	_ "axon-server/docs"
	"fmt"
	"net/http"

	_ "axon-server/docs"

	log "github.com/sirupsen/logrus"
	"github.com/stephensanwo/handlers"
	"github.com/stephensanwo/mux"
	httpSwagger "github.com/swaggo/http-swagger"
)

type AxonService struct {
	Routes      *[]Route
	AxonContext *AxonContext
}

func (a AxonService) ErrorHandler(w http.ResponseWriter, err error) {
	http.Error(w, err.Error(), http.StatusInternalServerError)
}

func (a AxonService) AuthenticationErrorHandler(w http.ResponseWriter, err error) {
	http.Error(w, err.Error(), http.StatusUnauthorized)
}

func (a AxonService) PublicHandler(fn func(http.ResponseWriter, *http.Request, *AxonContext)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fn(w, r, a.AxonContext)

	}
}

func (a AxonService) PrivateHandler(fn func(http.ResponseWriter, *http.Request, *AxonContext)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie(AUTH_SESSION)
		fmt.Println("From Private Auth")
		fmt.Println(cookie)
		fmt.Println(err)
		if cookie == nil || err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
		} else {
			a.AxonContext.SessionId = cookie.Value
			fn(w, r, a.AxonContext)
		}

	}
}

func (a AxonService) ConfigureLogger() {
	if a.AxonContext.Settings.Metadata.Environment == DEVELOPMENT {
		log.SetFormatter(&log.TextFormatter{DisableColors: false,
			FullTimestamp: true})
	} else {
		log.SetFormatter(&log.JSONFormatter{})
	}
}

func (a AxonService) CreateApi() {
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
		case PublicRoute:
			{r.HandleFunc(item.Path, a.PublicHandler(item.Handler)).Methods(item.Method)}
		case PrivateRoute:
			{r.HandleFunc(item.Path, a.PrivateHandler(item.Handler)).Methods(item.Method)}
		}
	}
	// r.HandleFunc("/docs/*", httpSwagger.Handler(
	// 	httpSwagger.URL("http://127.0.0.1:8100/docs/doc.json"),
	// ))
	r.PathPrefix("/docs").Handler(httpSwagger.WrapHandler)

	log.Println("Server running on port 8100")
	log.Fatal(http.ListenAndServe(":8100", handlers.CORS(ALLOWED_ORIGINS, ALLOWED_METHODS, ALLOWED_HEADERS,EXPOSED_HEADERS,ALLOWED_CREDENTIALS,MAX_AGE)(r) ))
}
