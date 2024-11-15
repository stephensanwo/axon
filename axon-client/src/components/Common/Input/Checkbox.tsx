import {
  Box,
  FormControl,
  Checkbox as PrimerCheckbox,
  useTheme,
} from "@primer/react";
import { Updater } from "@tanstack/react-form";

function Checkbox({
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
  checked,
  sx,
}: {
  label: string;
  error: string | null;
  required?: boolean;
  caption?: string;
  placeholder?: string;
  value?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
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
  checked: boolean;
  sx?: React.CSSProperties;
}) {
  const { theme } = useTheme();
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
      <PrimerCheckbox
        checked={checked}
        value={"default"}
        onChange={onChange}
        sx={{
          borderColor: theme?.colors.border.default,
          borderRadius: 0,
          ...sx,
        }}
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

export default Checkbox;
