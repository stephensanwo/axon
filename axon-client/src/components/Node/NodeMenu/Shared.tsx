import { useTheme } from "@primer/react";

export const NodeMenuInfo: React.FC<{
  text: string;
  type: "error" | "warning" | "info";
}> = (props) => {
  const { text, type } = props;
  const { theme } = useTheme();
  return (
    <div
      style={{
        width: "100%",
        height: "24px",
        display: "flex",
      }}
    >
      <small
        style={{
          color:
            type === "error"
              ? theme?.colors.danger.default
              : type === "warning"
              ? theme?.colors.warning.default
              : theme?.colors.text.gray,
          fontSize: "8px",
          fontStyle: "italic",
        }}
      >
        {text}
      </small>
    </div>
  );
};
