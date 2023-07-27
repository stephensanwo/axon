package core

import (
	"axon-server/src/api/session"
	"axon-server/src/cache"
	"axon-server/src/coredb"
	"axon-server/src/github"
	"axon-server/src/types"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strings"

	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	log "github.com/sirupsen/logrus"

	"github.com/google/uuid"
	"golang.org/x/oauth2"
)

func CreateUser(a *types.AxonContext, token *oauth2.Token) (*types.User, error) {
	ctx := context.Background()
	
	// Create the DynamoDB client
	db, err := coredb.NewDb()
	if err != nil {
		return nil, err
	}
	
	// Get Authenticated User
	github_client := github.GetGithubClient(ctx, token.AccessToken)
	github_user, _, err := github.GetAuthenticatedUser(ctx, github_client)
	if err != nil {
		return nil, err
	}

	// Create User Object
	var user types.User

	// Query the DynamoDB table for the user using the email from the Auth Client Response
	email := *github_user.Email
	result, err := db.QueryDatabase(coredb.AXON_TABLE, fmt.Sprintf("USER#%s",email), &email)
	
	if err != nil {
		return nil, errors.New("could not authenticate user - " + err.Error())
	}

	if len(result.Item) > 0 { 
		// If the user exists, return the user
		err := dynamodbattribute.UnmarshalMap(result.Item, &user)
		return &user, err
	} else {
		// If the user does not exist, create a new user
		user = types.User{
			UserId:    uuid.New().String(), // Using hex representation of ObjectID for DynamoDB
			Email:     *github_user.Email,
			UserName:  *github_user.Login,
			FirstName: strings.Split(*github_user.Name, " ")[0],
			LastName:  strings.Split(*github_user.Name, " ")[1],
			Avatar:    *github_user.AvatarURL,
		}

		err = db.MutateDatabase(coredb.AXON_TABLE, fmt.Sprintf("USER#%s", user.Email), user.Email, &user)

		if err != nil {
			return nil, err
		}

		return &user, nil
	}
}

func GetAuthenticatedUserData(a *types.AxonContext) (session.Session, error) {
	ctx := context.Background()
	// Find user session in the cache
	cacheClient, err := cache.RedisClient(ctx, a, 0)
	if err != nil {
		log.Panicln("Error connecting to cache")
	}

	res, err := cacheClient.Get(ctx, a.SessionId)
	fmt.Println("Session ID", a.SessionId)
	session := session.Session{}
	json.Unmarshal([]byte(res), &session)
	return session, err

}
