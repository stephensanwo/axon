package utils

import (
	"axon-auth/lib/types"
	"context"
	"fmt"
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
)

func NewValidator() *validator.Validate {
	validate := validator.New()
	validate.RegisterTagNameFunc(func(fl reflect.StructField) string {
		name := strings.SplitN(fl.Tag.Get("json"), ",", 2)
		return name[0]
	})
	validate.RegisterValidation("fieldLength", fieldLength)
	return validate
}

func fieldLength(fl validator.FieldLevel) bool {
	if fl.Field().Len() < 1 {
		return false
	} else {
		return true
	}

}

func CheckErrors(ctx context.Context, errFunc error, statusCode int, object string) *types.FieldErrors {
	if errFunc != nil {
		fieldErrors := types.FieldErrors{
			Status: statusCode,
			Msg:    fmt.Sprintf("validation errors for the %s fields", object),
			Fields: ValidatorFormatter(errFunc),
		}
		return &fieldErrors
	}
	return nil
}

func ValidatorFormatter(err error) map[string]string {
	errFields := map[string]string{}
	for _, err := range err.(validator.ValidationErrors) {
		errFields[err.Field()] = fmt.Sprintf(
			"Invalid input provided for %s",
			err.Field(),
		)
	}

	return errFields
}
