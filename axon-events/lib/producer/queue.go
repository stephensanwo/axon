package producer

import (
	"fmt"

	queue "github.com/stephensanwo/axon-lib/queue"
)

func SendEventToQueue(msg *[]byte) error {
	q := queue.NewQueue("https://sqs.eu-west-1.amazonaws.com/724913474904/axon_events_queue")	
	fmt.Println("Sending message to queue", string(*msg))
	q.SendMessage(msg)
	return nil
}