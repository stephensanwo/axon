import { useTheme } from "@primer/react";
import { InputHTMLAttributes } from "react";
import { Input } from "src/components/Common/Input";

function InputCell(
  props: InputHTMLAttributes<HTMLInputElement> & { isActive: string }
) {
  const { theme } = useTheme();
  const { isActive, id, ...rest } = props;

  return (
    <Input.Box
      {...rest}
      placeholder="Enter text"
      style={{
        border:
          isActive === id ? `1px solid ${theme?.colors.text.primary}` : "none",
      }}
    />
  );
}

export default InputCell;
