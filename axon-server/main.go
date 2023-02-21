package main

import (
	axonserver "axon-server/axonserver"
	channel "axon-server/axonserver/channel"
	types "axon-server/axonserver/types"
	utils "axon-server/axonserver/utils"
	"bytes"
	"context"
	"encoding/binary"
	"flag"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gopkg.in/yaml.v3"
)

// @title Axon Core API
// @version 1.0
// @description Axon Core API
// @termsOfService stephen.sanwo@icloud.com
// @contact.name Stephen Sanwo
// @contact.email stephen.sanwo@icloud.com
// @license.name MIT
// @license.url https://mit-license.org
// @host 127.0.0.1:8100
// @BasePath /
func main() {

	var run string
	flag.StringVar(&run, "a", "axonserver", "Specify the axonserver service to run")
	flag.Parse()

	switch run {
	case "server":
		{
			settings := settings()
			axonserver.Server(&settings)
		}

	case "channel":
		{
			settings := settings()
			redisClient, err := utils.RedisClient(context.TODO(), &settings, 0)
			if err != nil {
				log.Fatal("Unable to start redis channel")

			}
			channel := channel.Channel{
				Client: redisClient.Client,
			}
			channel.InitChannel()
		}
	case "publish":
		{
			settings := settings()
			redisClient, _ := utils.RedisClient(context.TODO(), &settings, 0)
			msg := types.Message{
				Action: types.UPDATE_NODE_POSITION,
				Payload: types.Position{
					X: 250,
					Y: 450,
				},
			}
			buf := new(bytes.Buffer)
			err := binary.Write(buf, binary.LittleEndian, msg)
			if err != nil {
				fmt.Println("binary.Write failed:", err)
			}
			fmt.Printf("% x", buf.Bytes())

			// redisClient.Client.Publish(context.TODO(), "axon_channel", "test")
			redisClient.Client.Publish(context.TODO(), "axon_channel", msg)

		}

	default:
		{
			log.Fatal("Unknown command provided")
		}

	}

}

func settings() types.Settings {
	log.Println("Loading settings")
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Some error occured loading environment settings. Err: %s", err)
	}

	settings_path := os.Getenv("SETTINGS_PATH")

	settings_data, err := os.ReadFile(settings_path)

	if err != nil {
		log.Fatal(err)
	}

	var settings types.Settings
	err2 := yaml.Unmarshal([]byte(settings_data), &settings)

	if err2 != nil {
		log.Fatalf("error marshaling settings: %v", err2)
	}

	fmt.Println(settings)
	return settings
}
