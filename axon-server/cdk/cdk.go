package main

import (
	cdk_stacks "axon-server/cdk/stacks"

	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/jsii-runtime-go"
)

func main() {
	defer jsii.Close()
	app := awscdk.NewApp(nil)

	cdk_stacks.AxonStack(app, "AxonStack", &cdk_stacks.CdkStackProps{
		StackProps: awscdk.StackProps{
			Env: &awscdk.Environment{
				Region: jsii.String("eu-west-1"), 
			},
		},
	})
	app.Synth(nil)
}