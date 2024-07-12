import { Box, FormControl, Textarea } from "@primer/react";
import { Updater } from "@tanstack/react-form";

function TextArea({
  label,
  value,
  placeholder,
  error,
  caption,
  onChange,
  onBlur,
  resize = "none",
  rows = 25,
  required = false,
  htmlFor,
  visuallyHiddenLabel = false,
}: {
  label: string;
  error: string | null;
  required?: boolean;
  caption?: string;
  placeholder?: string;
  value: string;
  onChange: (updater: Updater<string>) => void;
  onBlur?: () => void;
  resize?: "none" | "both" | "horizontal" | "vertical" | undefined;
  rows?: number;
  htmlFor: string;
  visuallyHiddenLabel?: boolean;
}) {
  return (
    <FormControl
      sx={{
        width: "100%",
      }}
      required={required}
    >
      <FormControl.Label
        sx={{
          fontWeight: 400,
          fontSize: 0,
        }}
        htmlFor={htmlFor}
        visuallyHidden={visuallyHiddenLabel}
      >
        {label}
      </FormControl.Label>
      <Textarea
        block
        resize={resize}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        sx={{
          fontSize: 1,
        }}
        onBlur={onBlur}
      />
      {error && (
        <FormControl.Validation
          variant={"error"}
          sx={{
            fontWeight: 400,
          }}
        >
          {error}
        </FormControl.Validation>
      )}
      <FormControl.Caption>{caption}</FormControl.Caption>
    </FormControl>
  );
}

export default TextArea;
