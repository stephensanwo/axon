package types

import (
	"context"

	logger "github.com/stephensanwo/axon-lib/logs"
)

type AxonBackgroundContext struct {
	Context context.Context
	Settings *AxonBackgroundSettings
	Logger *logger.Logger
}