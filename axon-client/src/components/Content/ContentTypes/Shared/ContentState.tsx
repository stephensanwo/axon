import { ThemeColors } from "src/shared/themes";
import {
  Transform_01,
  RelationshipExtraction,
  Websites,
} from "@carbon/pictograms-react";

export const ContentState: React.FC<{
  description: string;
  state: "invalidUrl" | "empty" | "invalidTable";
}> = (props) => {
  return (
    <ContentStateWrapper>
      {props.state === "empty" ? (
        <Transform_01 fill={ThemeColors.textDark} />
      ) : props.state === "invalidUrl" ? (
        <Websites fill={ThemeColors.textDark} />
      ) : props.state === "invalidTable" ? (
        <RelationshipExtraction fill={ThemeColors.textDark} />
      ) : null}
      <h6
        style={{
          color: ThemeColors.textDark,
          textAlign: "center",
        }}
      >
        {props.description}
      </h6>
    </ContentStateWrapper>
  );
};

const ContentStateWrapper: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  return (
    <div
      style={{
        height: "100%",
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
        {props.children}
      </div>
    </div>
  );
};
