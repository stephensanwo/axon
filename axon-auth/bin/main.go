package main

import (
	cli "axon-auth/bin/cli"
	axonauth "axon-auth/src/api"

	axon_types "github.com/stephensanwo/axon-lib/types"

	"fmt"
	"log"
	"os"

	"gopkg.in/yaml.v3"
)

//	@title			Axon Auth API
//	@version		1.0
//	@description	Axon Auth API
//	@termsOfService	stephen.sanwo@icloud.com
//	@contact.name	Stephen Sanwo
//	@contact.email	stephen.sanwo@icloud.com
//	@license.name	MIT
//	@license.url	https://mit-license.org
//	@host			127.0.0.1:8301
//	@BasePath		/
func AxonAuth() {
	run, cdkCmd := cli.ParseArgs()
	fmt.Println(cdkCmd)

	switch run {
	case "server":
		{
			settings := settings()
			axonauth.NewAxonAuthService(&settings)
		}

	default:
		{
			log.Fatal("Unknown command provided")
		}

	}

}

func settings() axon_types.Settings {
	settings_data, err := os.ReadFile("settings.dev.yml")
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
	AxonAuth()
}