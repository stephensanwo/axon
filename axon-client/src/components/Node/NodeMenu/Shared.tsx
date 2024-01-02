import { ThemeColors } from "src/shared/themes";

export const NodeMenuInfo: React.FC<{
  text: string;
  type: "error" | "warning" | "info";
}> = (props) => {
  const { text, type } = props;
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
              ? ThemeColors.dangerAction
              : type === "warning"
              ? ThemeColors.warning
              : ThemeColors.textDark,
          fontSize: "8px",
          fontStyle: "italic",
        }}
      >
        {text}
      </small>
    </div>
  );
};
