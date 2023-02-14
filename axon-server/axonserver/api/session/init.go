package session

import (
	"axon-server/axonserver/cache"
	"axon-server/axonserver/types"

	"context"
	"crypto/rand"
	"encoding/base64"
	"io"
	"net/http"
	"time"

	log "github.com/sirupsen/logrus"
)

type SessionManager struct {
	CookieName string
	SessionId  string
}

type Session struct {
	SessionId   string
	SessionData types.UserCache
}

func (s SessionManager) CreateSession(w http.ResponseWriter, a *types.AxonContext, sessionData *Session) {
	expiration := time.Now().Add(365 * 24 * 12 * time.Hour)
	cookie := http.Cookie{Name: s.CookieName, Value: s.SessionId, Path: "/", HttpOnly: true, Expires: expiration}
	http.SetCookie(w, &cookie)

	// Cache Session Data
	cacheClient, err := cache.RedisClient(context.TODO(), a, 0)
	if err != nil {
		log.Panicln("Error connecting to cache")
	}
	cacheTimeout, _ := time.ParseDuration("12h")

	err = cacheClient.Set(context.TODO(), s.SessionId, sessionData, cacheTimeout)
	if err != nil {
		log.Panicln("Error saving session in cache")
	}

}

func NewSessionId() string {
	b := make([]byte, 32)
	if _, err := io.ReadFull(rand.Reader, b); err != nil {
		return ""
	}
	return base64.URLEncoding.EncodeToString(b)
}
