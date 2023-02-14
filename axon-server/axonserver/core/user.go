package core

import (
	"axon-server/axonserver/api/session"
	"axon-server/axonserver/cache"
	"axon-server/axonserver/coredb"
	"axon-server/axonserver/github"
	"axon-server/axonserver/types"
	"context"
	"encoding/json"
	"strings"

	log "github.com/sirupsen/logrus"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/oauth2"
)

func CreateUser(a *types.AxonContext, token *oauth2.Token) (*types.User, error) {
	ctx := context.Background()
	github_client := github.GetGithubClient(ctx, token.AccessToken)
	dbclient, _ := coredb.DB{}.GetCoreDBClient(a)
	defer coredb.DB{}.DisconnectCoreDBClient(dbclient)

	user_collection := coredb.DB{}.GetCollection(dbclient, coredb.AXON_DATABASE, coredb.AXON_USER_COLLECTION)

	//  Get Authenticated User
	github_user, _, err := github.GetAuthenticatedUser(ctx, github_client)
	if err != nil {
		return &types.User{}, err
	}

	//  Create User Object
	var user types.User

	// Query the User table for the user using the email from the Auth Client Response
	filter := bson.D{{Key: "email", Value: *github_user.Email}}
	user_collection.FindOne(context.TODO(), filter).Decode(&user)

	if (types.User{}) == user {
		user = types.User{
			UserId:    primitive.NewObjectID(),
			Email:     *github_user.Email,
			UserName:  *github_user.Login,
			FirstName: strings.Split(*github_user.Name, " ")[0],
			LastName:  strings.Split(*github_user.Name, " ")[1],
			Avatar:    *github_user.AvatarURL,
		}

		_, err := user_collection.InsertOne(ctx, user)

		if err != nil {
			return &types.User{}, err
		}

		return &user, err
	}

	return &user, err

}

func GetAuthenticatedUserData(a *types.AxonContext) (session.Session, error) {
	ctx := context.Background()
	// Find user session in the cache
	cacheClient, err := cache.RedisClient(ctx, a, 0)
	if err != nil {
		log.Panicln("Error connecting to cache")
	}

	res, err := cacheClient.Get(ctx, a.SessionId)
	session := session.Session{}
	json.Unmarshal([]byte(res), &session)
	return session, err

}
