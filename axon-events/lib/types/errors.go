package types

type FieldErrors struct {
	Status int               `json:"status"`
	Msg    string            `json:"msg"`
	Fields map[string]string `json:"fields"`
}
