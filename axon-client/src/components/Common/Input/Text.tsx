import { Box, FormControl, TextInput } from "@primer/react";
import { Updater } from "@tanstack/react-form";

function Text({
  label,
  value,
  placeholder,
  error,
  caption,
  onChange,
  onBlur,
  leadingVisual,
  trailingVisual,
  trailingAction,
  required = false,
  htmlFor,
  type,
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
  leadingVisual?: React.ReactNode;
  trailingVisual?: React.ReactNode;
  trailingAction?:
    | React.ReactElement<
        React.HTMLProps<HTMLButtonElement>,
        string | React.JSXElementConstructor<any>
      >
    | undefined;
  htmlFor: string;
  type: React.HTMLInputTypeAttribute | undefined;
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
      <TextInput
        block
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        sx={{
          fontSize: 1,
        }}
        onBlur={onBlur}
        leadingVisual={
          <Box
            sx={{
              display: "flex",
            }}
          >
            {leadingVisual}
          </Box>
        }
        trailingVisual={
          <Box
            sx={{
              display: "flex",
            }}
          >
            {trailingVisual}
          </Box>
        }
        trailingAction={trailingAction}
        size="medium"
        type={type}
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

export default Text;
