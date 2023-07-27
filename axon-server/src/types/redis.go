package types

type RedisSettings struct {
	ConnectionUri string `yaml:"connection_uri"`
	Password      string `yaml:"password"`
}
