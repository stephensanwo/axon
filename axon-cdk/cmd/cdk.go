package main

import (
	cdk_stacks "axon-cdk/lib/stacks"
	"axon-cdk/lib/types"
	"fmt"
	"log"
	"os"

	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/jsii-runtime-go"
)

//	@title			Axon CDK Service
//	@version		1.0
//	@description	Axon CDK Service
func main() {
	defer jsii.Close()
	app := awscdk.NewApp(nil)
	importContextConfig(app)
	// fmt.Println(context)
	// settings := settings()
	cdk_stacks.AxonStack(app, "AxonStack", &cdk_stacks.CdkStackProps{
		StackProps: awscdk.StackProps{
			Env: &awscdk.Environment{
				Region: jsii.String("eu-west-1"), 
			},
			Description: jsii.String("Axon CDK Stack"),
		},
		AxonCdkContext: &types.AxonCdkContext{
			// Context: context.Background(),
			// Settings: &settings,
		},
	})
	app.Synth(nil)
}

func importContextConfig(app awscdk.App) {
	// var context types.AxonCdkContext
	env := app.Node().TryGetContext(jsii.String("stage"))	
	if env == nil {
		log.Fatal("Unable to get environment from CDK context. Define a stage in the context ('dev' | 'prod). Exiting...")
		os.Exit(1)
	}

	context := app.Node().TryGetContext(jsii.String(env.(string)))
	fmt.Println(context)	

}

// func settings() types.AxonCdkSettings {
// 	settings_data, err := os.ReadFile("settings.dev.yml")
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	var settings types.AxonCdkSettings
// 	err = yaml.Unmarshal([]byte(settings_data), &settings)

// 	if err != nil {
// 		log.Fatalf("error marshaling settings: %v", err)
// 	}

// 	fmt.Println(settings)
// 	return settings
// }