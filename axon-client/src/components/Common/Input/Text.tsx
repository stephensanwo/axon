import { Box, FormControl, TextInput, useTheme } from "@primer/react";
import { TextInputSizes } from "@primer/react/lib/internal/components/TextInputWrapper";
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
  requiredIndicator = false,
  requiredText,
  htmlFor,
  visuallyHiddenLabel = false,
  inputSize = "medium",
  disabled = false,
  inputStyle,
  inputClassName,
}: {
  label: string;
  error: string | null;
  required?: boolean;
  requiredIndicator?: boolean;
  requiredText?: string;
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
  visuallyHiddenLabel?: boolean;
  inputSize?: TextInputSizes;
  disabled?: boolean;
  inputStyle?: React.CSSProperties;
  inputClassName?: string;
}) {
  const { theme } = useTheme();
  return (
    <FormControl
      sx={{
        width: "100%",
        flexShrink: 0,
      }}
      required={required}
      id={htmlFor}
    >
      <FormControl.Label
        sx={{
          fontWeight: 400,
          fontSize: 0,
          color: theme?.colors.text.gray,
        }}
        htmlFor={htmlFor}
        visuallyHidden={visuallyHiddenLabel}
        requiredIndicator={requiredIndicator}
        requiredText={requiredText}
      >
        {label}
      </FormControl.Label>
      <TextInput
        block
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClassName}
        sx={{
          fontSize: 1,
          borderRadius: 0,
          ...inputStyle,
        }}
        onBlur={onBlur}
        leadingVisual={
          leadingVisual && (
            <Box
              sx={{
                display: "flex",
              }}
            >
              {leadingVisual}
            </Box>
          )
        }
        trailingVisual={
          trailingVisual && (
            <Box
              sx={{
                display: "flex",
              }}
            >
              {trailingVisual}
            </Box>
          )
        }
        trailingAction={
          trailingAction && (
            <Box
              sx={{
                display: "flex",
              }}
            >
              {trailingAction}
            </Box>
          )
        }
        size={inputSize}
        disabled={disabled}
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
