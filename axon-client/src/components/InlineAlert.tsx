import { ThemeColors } from "src/shared/themes";

const InlineAlert = (props: { text: string }) => {
  return (
    <div
      style={{
        marginTop: "32px",
        marginBottom: "16px",
      }}
    >
      <small
        style={{
          color: ThemeColors.dangerAction,
        }}
      >
        {props.text}
      </small>
    </div>
  );
};

export default InlineAlert;
