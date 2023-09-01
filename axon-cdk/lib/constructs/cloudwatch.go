package cdk_constructs

import (
	"github.com/aws/aws-cdk-go/awscdk/v2/awslogs"
	"github.com/aws/constructs-go/constructs/v10"
)
  
type LogGroupProps struct {
	LogGroupName string 
}
  
  
func LogGroup(scope constructs.Construct, id string, props *LogGroupProps) *awslogs.CfnLogGroup {
	logGroup :=  awslogs.NewCfnLogGroup(scope, &id, &awslogs.CfnLogGroupProps{
		LogGroupName: &props.LogGroupName,
	})

	return &logGroup
}