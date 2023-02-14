package types

type MongoDBCredentials struct {
	ConnectionURI string `yaml:"connection_uri"`
}

func InitMongoDBCredentials(s *Settings) MongoDBCredentials {
	var config MongoDBCredentials
	switch s.Metadata.Environment {
	case DEVELOPMENT:
		{
			config = MongoDBCredentials{
				ConnectionURI: s.MongoDBSettings.Development.ConnectionURI,
			}
			return config
		}

	case PRODUCTION:
		{
			config = MongoDBCredentials{
				ConnectionURI: s.MongoDBSettings.Production.ConnectionURI,
			}
			return config
		}
	}
	return config
}
