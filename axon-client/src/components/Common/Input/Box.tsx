import { useTheme } from "@primer/react";
import { Updater } from "@tanstack/react-form";
import { InputHTMLAttributes } from "react";

function Box(props: InputHTMLAttributes<HTMLInputElement>) {
  const { theme } = useTheme();
  return (
    <input
      {...props}
      type="text"
      style={{
        color: theme?.colors.text.gray,
        backgroundColor: theme?.colors.bg.default,
        fontSize: "12px",
        fontFamily: theme?.fonts.mono,
        width: "100%",
        border: "none",
        outline: "none",
        height: "32px",
        padding: "0 8px",
        ...props.style,
      }}
    />
  );
}

export default Box;
