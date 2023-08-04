package cdk_constructs

import (
	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdk/v2/awssqs"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

type SqsQueueProps struct {
	QueueName string
}


func Queue(scope constructs.Construct, id string, props *SqsQueueProps) awssqs.Queue {

	// create SQS queue
	queue := awssqs.NewQueue(scope, jsii.String(props.QueueName), &awssqs.QueueProps{
		VisibilityTimeout: awscdk.Duration_Seconds(jsii.Number(300)),
		QueueName:         jsii.String("MySqsQueue"),
	})
	
	return queue
}
