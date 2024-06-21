package types
const (
	SUCCESS string = "success"
	FAILED  string = "failed"
)

type BaseResponse struct {
	Message interface{} `json:"message"`
}


