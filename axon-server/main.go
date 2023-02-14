package main

import (
	axonserver "axon-server/axonserver"
	types "axon-server/axonserver/types"
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
	settings := settings()
	axonserver.Server(&settings)
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
