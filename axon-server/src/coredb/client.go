package coredb

import (
	"errors"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/jsii-runtime-go"
)

type DB struct{
	Client *dynamodb.DynamoDB
}

// CreateDynamoDBClient creates a new DynamoDB client and session
func NewDb() (*DB, error) {
	// Create a new AWS session with the default credentials
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	// Create a DynamoDB client
	db := &DB{
		Client: dynamodb.New(sess),
	}
	return db, nil
}

func (c DB) QueryDatabase(table_name string, partition_key string, sort_key *string) (*dynamodb.GetItemOutput, error) {
	// Interface to query the database
	input := &dynamodb.GetItemInput{
		TableName: jsii.String(table_name),
		Key: map[string]*dynamodb.AttributeValue{
			"partition_key": {
				S: jsii.String(partition_key),
			},
		},
	}

	if sort_key != nil {
		input.Key["sort_key"] = &dynamodb.AttributeValue{
			S: jsii.String(*sort_key),
		}
	}

	result, err := c.Client.GetItem(input)
	if err != nil {
		return nil, err
	}

	return result, nil
}


func (c DB) MutateDatabase(table_name string, partition_key string, sort_key string, attributes interface{}) error {

	// Convert the 'attributes' interface to a map of attribute values
	attributeMap, err := dynamodbattribute.MarshalMap(attributes)

	if err != nil {
		return err
	}

	// Interface to add a new record to the database
	input := &dynamodb.PutItemInput{
		TableName: jsii.String(table_name),
		Item: map[string]*dynamodb.AttributeValue{
			"partition_key": {
				S: jsii.String(partition_key),
			},
			"sort_key": {
				S: jsii.String(sort_key),
			},
		},
	}

	for attributeName, attributeValue := range attributeMap {
		input.Item[attributeName] = attributeValue
	}

	// Update the database
	_, err = c.Client.PutItem(input)
	
	if err != nil {
		return err
	}
	return nil
}

func (c DB) DeleteRecord(table_name string, partition_key string, sort_key *string) error {
	// Interface to delete a record by partition key and optionally a sort key
	input := &dynamodb.DeleteItemInput{
		TableName: jsii.String(table_name),
		Key: map[string]*dynamodb.AttributeValue{
			"partition_key": {
				S: jsii.String(partition_key),
			},
		},
	}

	if sort_key != nil {
		input.Key["sort_key"] = &dynamodb.AttributeValue{
			S: jsii.String(*sort_key),
		}
	}

	_, err := c.Client.DeleteItem(input)
	if err != nil {
		return err
	}
	return nil
}

func (c DB) UpdateRecord(table_name string, partition_key string, sort_key *string, attributes interface{}) error {
	// Validate if attributes is a map[string]*dynamodb.AttributeValue
	attrs, ok := attributes.(map[string]*dynamodb.AttributeValue)
	if !ok {
		return errors.New("attributes must be a valid map[string]*dynamodb.AttributeValue")
	}

	// Interface to update a record by partition key and optionally a sort key
	input := &dynamodb.UpdateItemInput{
		TableName: jsii.String(table_name),
		Key: map[string]*dynamodb.AttributeValue{
			"partition_key": {
				S: jsii.String(partition_key),
			},
		},
		ExpressionAttributeValues: attrs,
	}

	if sort_key != nil {
		input.Key["sort_key"] = &dynamodb.AttributeValue{
			S: jsii.String(*sort_key),
		}
	}

	_, err := c.Client.UpdateItem(input)
	if err != nil {
		return err
	}
	return nil
}

