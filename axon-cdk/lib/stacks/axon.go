package cdk_stacks

import (
	cdk_constructs "axon-cdk/lib/constructs"

	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

type CdkStackProps struct {
	awscdk.StackProps
}

func AxonStack(scope constructs.Construct, id string, props *CdkStackProps) awscdk.Stack {
	var sprops awscdk.StackProps
	if props != nil {
		sprops = props.StackProps
	}
	stack := awscdk.NewStack(scope, &id, &sprops)

	// Create the DynamoDB table
	cdk_constructs.Table(stack, "AxonTable", &cdk_constructs.CdkDynamoDBTableProps{
		TableName: "axon",
		PrimaryKey: "partition_key",
		SortKey: "sort_key",
		SecondarySortKeys: []string{"date_created"},
		// Add any secondary indexes here if needed
	})

	// Create the User Session DAX table
	cdk_constructs.Table(stack, "AxonUserSessionTable", &cdk_constructs.CdkDynamoDBTableProps{
		TableName: "axon_user_session",
		PrimaryKey: "partition_key",
		SortKey: "sort_key",
		SecondarySortKeys: []string{"date_created"},
	})

	// Enable DAX for the DynamoDB table
	// daxCluster := cdk_constructs.DynamoDBDaxStack(stack, "AxonDaxCluster", &cdk_constructs.DynamoDBDaxStackProps{})
	
	// Associate the DAX cluster with the DynamoDB table using raw CloudFormation resource
	// userSessionTable.Node().AddDependency(daxCluster)

	// Create an SQS Queue
	cdk_constructs.Queue(stack, "AxonEventsQueue", &cdk_constructs.SqsQueueProps{
		QueueName: "axon_events_queue",
	})

	// Create a CloudFormation output that displays the table name
	// awscdk.NewCfnOutput(stack, jsii.String("TableNameOutput"), &awscdk.CfnOutputProps{
	// 	Value: dynamoDBTable.TableName(),
	// 	Description: jsii.String("DynamoDB Table Name"),
	// })
	
		

	return stack
}

func Env() *awscdk.Environment {
	return &awscdk.Environment{
	 Account: jsii.String("stephensanwo"),
	 Region:  jsii.String("us-east-1"),
	}

}


