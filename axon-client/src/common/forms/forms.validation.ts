import { z } from "zod";
import { FieldMeta } from "@tanstack/react-form";

class FormValidation {
  constructor() {}

  public fieldValidation(propertyType: "string" | "email", maxChar?: number) {
    const fieldLength = maxChar || 50;
    switch (propertyType) {
      case "string": {
        return z
          .string()
          .min(1, { message: "Must be at least 1 character" })
          .max(fieldLength, {
            message: `Must be at most ${fieldLength} characters`,
          });
      }
    }
  }

  public fieldError(meta: FieldMeta) {
    return meta.isTouched && meta.errors.length > 0
      ? meta.errors[0]?.toString() || ""
      : "";
  }
}

export const formValidation = new FormValidation();
