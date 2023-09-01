package types

import "context"

type AxonCdkContext struct {
	Context context.Context
	Settings *AxonCdkSettings
}

