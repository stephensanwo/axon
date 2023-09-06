package utils

import (
	"strings"
	"time"
)

func GetStringFromMap(dataMap map[string]interface{}, key string) string {
    keys := strings.Split(key, ".") // Split the key using dot notation

    // Start with the outermost map
    currentMap := dataMap

    // Iterate through the keys to navigate the nested structure
    for _, k := range keys {
        if val, ok := currentMap[k]; ok {
            if strVal, isString := val.(string); isString {
                // If it's a string, return it
                return strVal
            } else if nestedMap, isMap := val.(map[string]interface{}); isMap {
                // If it's a nested map, update the current map and continue
                currentMap = nestedMap
            } else {
                // Handle other types or unexpected data as needed
                break
            }
        } else {
            // Key not found in the current map, return an empty string or handle as needed
            break
        }
    }

    return ""
}

func GetIntFromMap(dataMap map[string]interface{}, key string) int {
    keys := strings.Split(key, ".") // Split the key using dot notation

    // Start with the outermost map
    currentMap := dataMap

    // Iterate through the keys to navigate the nested structure
    for _, k := range keys {
        if val, ok := currentMap[k]; ok {
            if intVal, isInt := val.(int); isInt {
                // If it's an int, return it
                return intVal
            } else if nestedMap, isMap := val.(map[string]interface{}); isMap {
                // If it's a nested map, update the current map and continue
                currentMap = nestedMap
            } else {
                // Handle other types or unexpected data as needed
                break
            }
        } else {
            // Key not found in the current map, return a default value or handle as needed
            break
        }
    }

    return 0 // Return a default value
}

func GetFloatFromMap(dataMap map[string]interface{}, key string) float64 {
    keys := strings.Split(key, ".") // Split the key using dot notation

    // Start with the outermost map
    currentMap := dataMap

    // Iterate through the keys to navigate the nested structure
    for _, k := range keys {
        if val, ok := currentMap[k]; ok {
            // Check if it's a float64
            if floatVal, isFloat := val.(float64); isFloat {
                // If it's a float64, return it
                return floatVal
            } else if nestedMap, isMap := val.(map[string]interface{}); isMap {
                // If it's a nested map, update the current map and continue
                currentMap = nestedMap
            } else {
                // Handle other types or unexpected data as needed
                break
            }
        } else {
            // Key not found in the current map, return a default value or handle as needed
            break
        }
    }

    return 0.0 // Return a default float64 value
}

func GetTimeFromMap(dataMap map[string]interface{}, key string) time.Time {
    keys := strings.Split(key, ".") // Split the key using dot notation

    // Start with the outermost map
    currentMap := dataMap

    // Iterate through the keys to navigate the nested structure
    for _, k := range keys {
        if val, ok := currentMap[k]; ok {
            if timeVal, isTime := val.(time.Time); isTime {
                // If it's a valid time.Time, return it
                return timeVal
            } else if nestedMap, isMap := val.(map[string]interface{}); isMap {
                // If it's a nested map, update the current map and continue
                currentMap = nestedMap
            } else {
                // Handle other types or unexpected data as needed
                break
            }
        } else {
            // Key not found in the current map, return the current time or handle as needed
            return time.Now()
        }
    }

    return time.Now() // Return the current time as a default
}
