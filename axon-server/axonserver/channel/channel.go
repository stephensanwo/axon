package channel

import (
	"context"
	"fmt"

	"github.com/go-redis/redis/v8"
)

type Channel struct {
	Client *redis.Client
}

func (c *Channel) InitChannel() {
	pubsub := c.Client.Subscribe(context.TODO(), "axon_channel")
	ch := pubsub.Channel()
	for msg := range ch {
		fmt.Println(msg.Channel, msg.Payload)
	}

}
