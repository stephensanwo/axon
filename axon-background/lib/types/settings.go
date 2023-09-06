package types

import (
	axon_types "github.com/stephensanwo/axon-lib/types"
)

type AxonBackgroundSettings struct {
	Metadata axon_types.Metadata `yaml:"metadata"`
	QueueSettings QueueSettings `yaml:"queue_settings"`
	LogSettings LogSettings `yaml:"log_settings"`
}

type LogSettings struct {
	LogLevel int64 `yaml:"log_level"`
	LogGroupName string `yaml:"log_group_name"`
}