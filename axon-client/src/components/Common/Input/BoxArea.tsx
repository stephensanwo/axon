import { useTheme } from "@primer/react";
import { InputHTMLAttributes } from "react";

function BoxArea(props: InputHTMLAttributes<HTMLTextAreaElement>) {
  const { theme } = useTheme();
  return (
    <textarea
      {...props}
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
        resize: "none",
        scrollbarWidth: "none",
        ...props.style,
      }}
    />
  );
}

export default BoxArea;
