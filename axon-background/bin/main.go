package main

import (
	axon_background "axon-background/lib"
	types "axon-background/lib/types"

	"log"
	"os"

	"gopkg.in/yaml.v3"
)

//	@title			Axon Background Service
//	@version		1.0
//	@description	Axon Background Service
func AxonBackground() {
	settings := settings()
	axon_background.NewAxonBackgroundService(
		&settings)
}

func settings() types.AxonBackgroundSettings {
	settings_data, err := os.ReadFile("settings.dev.yml")
	if err != nil {
		log.Fatal(err)
	}

	var settings types.AxonBackgroundSettings
	err = yaml.Unmarshal([]byte(settings_data), &settings)

	if err != nil {
		log.Fatalf("error marshaling settings: %v", err)
	}

	return settings
}

func main() {
	AxonBackground()
}