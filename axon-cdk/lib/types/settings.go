package types

import (
	axon_types "github.com/stephensanwo/axon-lib/types"
)

type AxonCdkSettings struct {
	Metadata axon_types.Metadata `yaml:"metadata"`
	LogGroups []string `yaml:"log_groups"`
	Queues []string `yaml:"queues"`
}