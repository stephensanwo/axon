package consumer

import (
	types "axon-background/lib/types"
	"context"
	"encoding/json"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	core "axon-background/lib/core"

	logger "github.com/stephensanwo/axon-lib/logs"
	queue "github.com/stephensanwo/axon-lib/queue"
	axon_types "github.com/stephensanwo/axon-lib/types"
)

type AxonBackgroundService struct {
	AxonBackgroundContext types.AxonBackgroundContext
}

func (a *AxonBackgroundService) CreateService() {

	q := queue.NewQueue(a.AxonBackgroundContext.Settings.QueueSettings.NodeEventQueueUrl)

	a.AxonBackgroundContext.Logger.Info("Starting axon background service: ", *a.AxonBackgroundContext.Settings)
	a.AxonBackgroundContext.Logger.Info("Listening for messages on queue: ", a.AxonBackgroundContext.Settings.QueueSettings.NodeEventQueueUrl)

	// Make a channel to receive OS signals (e.g., SIGINT, SIGTERM)
	signals := make(chan os.Signal, 1)
	signal.Notify(signals, syscall.SIGINT, syscall.SIGTERM)

	// Start a goroutine to handle OS signals
	go func() {
		sig := <-signals
		a.AxonBackgroundContext.Logger.Info("Received signal: %s\n", sig)
		os.Exit(0)
	}()

	for {
		msgs, err := q.ReceiveMessage(1) // process in order received
		if err != nil {
			a.AxonBackgroundContext.Logger.Error("Error receiving messages:", err)
			time.Sleep(5 * time.Second) // Wait before retrying
			continue
		}

		// Process messages
		for _, msg := range msgs.Messages {
			fmt.Printf("Processing event %s \n", *msg.MessageId)
			
			var event axon_types.AxonEvent
		
			if err := json.Unmarshal([]byte(*msg.Body), &event); err != nil {
				a.AxonBackgroundContext.Logger.Error("Event message error:", err)
				q.DeleteMessage(msg)
			}

			core.AxonBackgroundEventHandler(&a.AxonBackgroundContext, &event)
			
			q.DeleteMessage(msg)
		}	
	}		
}

func NewAxonBackgroundService(settings *types.AxonBackgroundSettings) {
	logger := logger.NewLogger(4, settings.Metadata.Environment, settings.LogSettings.LogGroupName)

	service := AxonBackgroundService {
		AxonBackgroundContext:  types.AxonBackgroundContext {
			Context: context.Background(),
			Settings : settings,
			Logger: logger,
		},
	}
	service.CreateService()
}