package channel

import (
	"axon-server/axonserver/types"
	"context"
	"fmt"

	"github.com/go-redis/redis/v8"
)

type Channel struct {
	Client *redis.Client
}

func (c *Channel) InitChannel() {
	pubsub := c.Client.Subscribe(context.TODO(), types.CHANNEL)
	ch := pubsub.Channel()
	for msg := range ch {
		fmt.Println(msg)
		// fmt.Println(msg.Channel, msg.Payload)
	}

}
