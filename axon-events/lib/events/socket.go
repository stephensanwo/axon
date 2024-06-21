package api

import (
	"errors"
	"fmt"
	"net/http"
	"syscall"

	log "github.com/sirupsen/logrus"

	producer "axon-events/lib/producer"
	utils "axon-events/lib/utils"

	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	socketio "github.com/googollee/go-socket.io"
	"github.com/googollee/go-socket.io/engineio"
	"github.com/googollee/go-socket.io/engineio/transport"
	"github.com/googollee/go-socket.io/engineio/transport/polling"
	"github.com/googollee/go-socket.io/engineio/transport/websocket"
	axon_coredb "github.com/stephensanwo/axon-lib/coredb"
	axon_types "github.com/stephensanwo/axon-lib/types"
)


type SocketManager struct {
	AxonContext *axon_types.AxonContext
    activeConnections int                      // Counter for active connections
	socketSession *axon_types.Session

}

func (sm *SocketManager) corsMiddleware(r *http.Request) bool {
	return true
}

func (sm *SocketManager) validateSocketSession(token string) (*axon_types.Session, error){
	eventSession := axon_types.Session{}

	// Create the DynamoDB client
	db, err := axon_coredb.NewDb()

	if err != nil {
		return nil, errors.New("Error fetching event token" + err.Error())
	}

	// Find event token in the cache
	result, err := db.QueryDatabase(axon_types.AXON_USER_SESSION_TABLE, fmt.Sprintf("AXONEVENTTOKEN#%s", token), &token)
	
	if err != nil {
		return nil, errors.New("Error fetching event token" + err.Error())
	}

	// Unmarshal the DynamoDB item into a Session struct
	dynamodbattribute.UnmarshalMap(result.Item, &eventSession)

	return &eventSession, err
}
// Experimental resource tunning
// https://github.com/eranyanay/1m-go-websockets
func (sm *SocketManager) resourceTunning() {
	// Increase resources limitations
	var rLimit syscall.Rlimit
	if err := syscall.Getrlimit(syscall.RLIMIT_NOFILE, &rLimit); err != nil {
		panic(err)
	}
	rLimit.Cur = rLimit.Max
	if err := syscall.Setrlimit(syscall.RLIMIT_NOFILE, &rLimit); err != nil {
		panic(err)
	}
	
}

func (sm *SocketManager)socketMiddleware(next func(socketio.Conn) error) func(socketio.Conn) error {
	return func(s socketio.Conn) error {
		fmt.Println("Socket Middleware")

		token := s.RemoteHeader().Get("Access-Token")
		
		// Set the token in the context
		s.SetContext(token)
		if token == "" {
			fmt.Println("Connect Error")
			return fmt.Errorf("access token is missing in header")
		}

		eventSession, err := sm.validateSocketSession(token)
		if eventSession.SessionId == "" || err != nil {
			fmt.Println("Invalid session")
			return fmt.Errorf("invalid session or unauthorised")
		}

		sm.socketSession = eventSession
		return next(s)
	}
}

func (sm * SocketManager) createSocket() *socketio.Server {
	sm.resourceTunning()
	socket := socketio.NewServer(&engineio.Options{
		Transports: []transport.Transport{
			&polling.Transport{
				CheckOrigin: sm.corsMiddleware,
			},
			&websocket.Transport{
				CheckOrigin: sm.corsMiddleware, 
			},
		},
	})

    socket.OnConnect("/", sm.socketMiddleware(func(s socketio.Conn) error {
		fmt.Println("Connected", sm.socketSession.SessionId)
		if sm.socketSession.SessionId == ""  {
			// Emit an error message to the client
			s.Emit("error", "invalid session or unauthorised")
			s.Close()
			return fmt.Errorf("invalid session or unauthorised")
		}
		fmt.Println("Connection ID", s.ID())
		sm.activeConnections = socket.Count()		
        fmt.Println("Active connections:", sm.activeConnections)
        return nil
    }))

	socket.OnEvent("/", "message", func(s socketio.Conn, data interface{}) {
		// Type assert to map
		msg, ok := data.(map[string]interface{})
		if !ok {
			log.Printf("Unexpected data type: %T", data)
			return
		}
		serializedMsg, err := utils.ConvertToBinary(msg)
		if err == nil {
			go producer.SendEventToQueue(&serializedMsg)
		} else {
			log.Printf("Error serializing message: %s", err.Error())
		}

	})

	// socket.OnEvent("/", "disconnect", func(s socketio.Conn) string {
	// 	last := s.Context().(string)
	// 	s.Emit("disconnect", last)
	// 	s.Close()
	// 	return last
	// })

	socket.OnError("/", func(s socketio.Conn, e error) {
		fmt.Println("Error:", e)
	})
	
	fmt.Println("Connections", socket.Count())
	socket.OnDisconnect("/", func(s socketio.Conn, reason string) {

        fmt.Println("Disconnected:", s.ID())
		sm.activeConnections = socket.Count()		
        fmt.Println("Active connections:", sm.activeConnections)

		// s.Close()
		fmt.Println("Session Closed", reason)
    })

	go func() {
		if err := socket.Serve(); err != nil {
			log.Fatalf("socketio listen error: %s\n", err)
		}
	}()

	return socket
}

func NewSocketManager (a *axon_types.AxonContext) *socketio.Server {
	socket := SocketManager{
		AxonContext: a,
	}
	return socket.createSocket()
}