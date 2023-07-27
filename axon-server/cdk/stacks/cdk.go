package cdk_stacks

import (
	cdk_constructs "axon-server/cdk/constructs"

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


