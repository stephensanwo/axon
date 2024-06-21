package main

import (
	axonevent "axon-events/lib/events"
	"flag"

	axon_types "github.com/stephensanwo/axon-lib/types"

	"fmt"
	"log"
	"os"

	"gopkg.in/yaml.v3"
)

//	@title			Axon Events API
//	@version		1.0
//	@description	Axon Events API
//	@termsOfService	stephen.sanwo@icloud.com
//	@contact.name	Stephen Sanwo
//	@contact.email	stephen.sanwo@icloud.com
//	@license.name	MIT
//	@license.url	https://mit-license.org
//	@host			127.0.0.1:8201
//	@BasePath		/
func AxonEvent() {
	run := ParseArgs()

	switch run {
	case "server":
		{
			settings := settings()
			axonevent.NewAxonEventService(&settings)
		}
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


func ParseArgs() (string) {
	var run string
	flag.StringVar(&run, "cmd", "axonevent", "Specify the axonevent service to run")

	flag.Parse()

	return run

}


func main() {
	AxonEvent()
}

