package cache

import (
	"axon-server/axonserver/types"

	"context"
	"encoding/json"
	"time"

	"github.com/go-redis/redis/v8"
	rejson "github.com/nitishm/go-rejson/v4"
)

type Redis struct {
	client        *redis.Client
	rejson_client *rejson.Handler
}

func RedisClient(ctx context.Context, a *types.AxonContext, database int) (*Redis, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     a.Settings.RedisSettings.ConnectionUri,
		Password: a.Settings.RedisSettings.Password,
		DB:       database,
	})

	_, err := client.Ping(ctx).Result()

	rj := rejson.NewReJSONHandler()
	rj.SetGoRedisClient(client)

	r := &Redis{
		client:        client,
		rejson_client: rj,
	}

	return r, err
}

func (r Redis) Set(ctx context.Context, key string, value interface{}, expire time.Duration) error {
	str, err := json.Marshal(value)
	if err != nil {
		return err
	}
	return r.client.Set(ctx, key, str, expire).Err()
}

func (r Redis) SetJson(ctx context.Context, key string, value []byte, expire time.Duration) error {
	return r.client.Set(ctx, key, value, expire).Err()
}

func (r Redis) Get(ctx context.Context, key string) (string, error) {
	return r.client.Get(ctx, key).Result()
}

func (r Redis) Inc(ctx context.Context, key string) error {
	return r.client.Incr(ctx, key).Err()
}

func (r Redis) Close(ctx context.Context) error {
	return r.client.Close()
}
