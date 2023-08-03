package main

import (
	cli "axon-server/bin/cli"
	axonserver "axon-server/src/api"

	axon_types "github.com/stephensanwo/axon-lib/types"

	"fmt"
	"log"
	"os"

	"gopkg.in/yaml.v3"
)

//	@title			Axon Core API
//	@version		1.0
//	@description	Axon Core API
//	@termsOfService	stephen.sanwo@icloud.com
//	@contact.name	Stephen Sanwo
//	@contact.email	stephen.sanwo@icloud.com
//	@license.name	MIT
//	@license.url	https://mit-license.org
//	@host			192.168.1.101:8100
//	@BasePath		/
func Axon() {
	run, cdkCmd := cli.ParseArgs()
	fmt.Println(cdkCmd)

	switch run {
	case "server":
		{
			settings := settings()
			axonserver.NewAxonService(&settings)
		}

	case "channel":
		// {
		// 	settings := settings()
		// 	redisClient, err := utils.RedisClient(context.TODO(), &settings, 0)
		// 	if err != nil {
		// 		log.Fatal("Unable to start redis channel")

		// 	}
		// 	channel := channel.Channel{
		// 		Client: redisClient.Client,
		// 	}
		// 	channel.InitChannel()
		// }
	case "publish":
		// {
		// 	settings := settings()
		// 	redisClient, _ := utils.RedisClient(context.TODO(), &settings, 0)
		// 	msg := types.Message{
		// 		Action: types.UPDATE_NODE_POSITION,
		// 		Payload: types.Position{
		// 			X: 250,
		// 			Y: 450,
		// 		},
		// 	}
		// 	buf := new(bytes.Buffer)
		// 	err := binary.Write(buf, binary.LittleEndian, msg)
		// 	if err != nil {
		// 		fmt.Println("binary.Write failed:", err)
		// 	}
		// 	fmt.Printf("% x", buf.Bytes())

		// 	// redisClient.Client.Publish(context.TODO(), "axon_channel", "test")
		// 	redisClient.Client.Publish(context.TODO(), "axon_channel", msg)

		// }

	default:
		{
			log.Fatal("Unknown command provided")
		}

	}

}

func settings() axon_types.Settings {
	settings_data, err := os.ReadFile("settings.yml")
	if err != nil {
		log.Fatal(err)
	}

	var settings axon_types.Settings
	err = yaml.Unmarshal([]byte(settings_data), &settings)

	if err != nil {
		log.Fatalf("error marshaling settings: %v", err)
	}

	fmt.Println(settings)
	return settings
}

func main() {
	Axon()
}