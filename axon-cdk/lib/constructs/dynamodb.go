package cdk_constructs

import (
	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdk/v2/awsdynamodb"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

type CdkDynamoDBTableProps struct {
	TableName string
	PrimaryKey string
	SortKey string
	SecondaryIndexes []awsdynamodb.GlobalSecondaryIndexProps
	SecondarySortKeys []string
}

func Table(scope constructs.Construct, id string, props *CdkDynamoDBTableProps) awsdynamodb.Table {
	
	table := awsdynamodb.NewTable(scope, &id, &awsdynamodb.TableProps{
		TableName:       jsii.String(props.TableName),
		PartitionKey:    &awsdynamodb.Attribute{Type: awsdynamodb.AttributeType_STRING, Name: jsii.String(props.PrimaryKey)},
		SortKey:         &awsdynamodb.Attribute{Type: awsdynamodb.AttributeType_STRING, Name: jsii.String(props.SortKey)},
		ReadCapacity:    jsii.Number(5),  // Adjust these values based on your read/write capacity requirements
		RemovalPolicy:   awscdk.RemovalPolicy_DESTROY,
		PointInTimeRecovery: jsii.Bool(true), // Enable Point-in-Time Recovery if needed
		TimeToLiveAttribute: jsii.String("ttl"),
	})

	// Add secondary indexes if provided
	if len(props.SecondaryIndexes) > 0 {
		for i := 0; i < len(props.SecondaryIndexes); i++ {
		table.AddGlobalSecondaryIndex(
			&props.SecondaryIndexes[0]) 
	}}

	if len(props.SecondarySortKeys) > 0 {
		for _, sortKey := range props.SecondarySortKeys {
			table.AddGlobalSecondaryIndex(&awsdynamodb.GlobalSecondaryIndexProps{
				IndexName: jsii.String(sortKey + "Index"),
				PartitionKey: &awsdynamodb.Attribute{
					Type: awsdynamodb.AttributeType_STRING,
					Name: jsii.String(props.PrimaryKey),
				},
				SortKey: &awsdynamodb.Attribute{
					Type: awsdynamodb.AttributeType_STRING,
					Name: jsii.String(sortKey),
				},
				ReadCapacity: jsii.Number(5),
			})
		}
	}
	
	return table
}
