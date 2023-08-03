package aws

import (
	aws_session "github.com/aws/aws-sdk-go/aws/session"
)


func CreateSession() *aws_session.Session {
	// Create a new AWS session with the default credentials
	sess := aws_session.Must(aws_session.NewSessionWithOptions(aws_session.Options{
		SharedConfigState: aws_session.SharedConfigEnable,
	}))

	return sess
}