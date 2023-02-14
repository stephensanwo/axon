package types

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	UserId    primitive.ObjectID `json:"user_id" bson:"user_id"`
	Email     string             `json:"email" bson:"email"`
	UserName  string             `json:"username" bson:"username"`
	FirstName string             `json:"first_name" bson:"first_name"`
	LastName  string             `json:"last_name" bson:"last_name"`
	Avatar    string             `json:"avatar" bson:"avatar"`
}

type UserCache struct {
	User        User   `json:"user"`
	AccessToken string `json:"access_token"`
}
