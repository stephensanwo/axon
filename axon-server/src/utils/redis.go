package utils

import (
	"axon-server/src/types"
	"context"

	"github.com/go-redis/redis/v8"
	rejson "github.com/nitishm/go-rejson/v4"
)

type Redis struct {
	Client        *redis.Client
	Rejson_client *rejson.Handler
}

func RedisClient(ctx context.Context, s *types.Settings, database int) (*Redis, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     s.RedisSettings.ConnectionUri,
		Password: s.RedisSettings.Password,
		DB:       database,
	})

	_, err := client.Ping(ctx).Result()

	rj := rejson.NewReJSONHandler()
	rj.SetGoRedisClient(client)

	r := &Redis{
		Client:        client,
		Rejson_client: rj,
	}

	return r, err
}
