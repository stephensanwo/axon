package types

import (
	_ "axon-server/docs"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	log "github.com/sirupsen/logrus"
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
	r := chi.NewRouter()
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   a.AxonContext.Settings.HttpSettings.AllowedOrigins,
		AllowedMethods:   a.AxonContext.Settings.HttpSettings.AllowedMethods,
		AllowedHeaders:   a.AxonContext.Settings.HttpSettings.AllowedHeaders,
		ExposedHeaders:   a.AxonContext.Settings.HttpSettings.ExposedHeaders,
		AllowCredentials: a.AxonContext.Settings.HttpSettings.AllowCredentials,
		MaxAge:           a.AxonContext.Settings.HttpSettings.MaxAge,
	}))
	for _, item := range *a.Routes {
		switch item.Auth {
		case PublicRoute:
			{
				r.Method(item.Method, item.Path, a.PublicHandler(item.Handler))
			}

		case PrivateRoute:
			{
				r.Method(item.Method, item.Path, a.PrivateHandler(item.Handler))
			}
		}
	}
	r.Get("/docs/*", httpSwagger.Handler(
		httpSwagger.URL("http://127.0.0.1:8100/docs/doc.json"),
	))

	log.Println("Server running on port 8100")
	log.Fatal(http.ListenAndServe(":8100", r))
}
