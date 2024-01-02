import { ThemeColors } from "src/shared/themes";
import { Warning_02 } from "@carbon/pictograms-react";

export const EmptyFolders = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Warning_02 fill={ThemeColors.textDark} />
        <h6
          style={{
            color: ThemeColors.textDark,
            textAlign: "center",
          }}
        >
          Error loading folders <br /> Please try again later
        </h6>
      </div>
    </div>
  );
};
