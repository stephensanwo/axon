package utils

import "encoding/json"

// ConvertToBinary serializes a MyMessage struct to binary (JSON-encoded).
func ConvertToBinary(message map[string]interface{}) ([]byte, error) {
	jsonData, err := json.Marshal(message)
	if err != nil {
		return nil, err
	}
	return jsonData, nil
}