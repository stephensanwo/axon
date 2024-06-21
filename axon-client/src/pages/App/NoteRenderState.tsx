import { ThemeColors } from "src/shared/themes";
import {
  RetrieveAndRank,
  SecureData,
  Warning_02,
} from "@carbon/pictograms-react";
import AxonLoader from "src/components/Loader/Loader";
import styled from "styled-components";

const NoteRenderStateWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NoteRenderState: React.FC<{
  state: "loading" | "error" | "empty" | "public-empty" | "public-error";
}> = (props) => {
  return (
    <NoteRenderStateWrapper>
      {props.state === "empty" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <RetrieveAndRank fill={ThemeColors.textDark} />
          <h6
            style={{
              color: ThemeColors.textDark,
              textAlign: "center",
            }}
          >
            Select a note <br /> to start adding content
          </h6>
        </div>
      )}
      {props.state === "public-empty" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <RetrieveAndRank fill={ThemeColors.textDark} />
          <h6
            style={{
              color: ThemeColors.textDark,
              textAlign: "center",
            }}
          >
            The note has no content <br /> <a href="/">Sign up</a> to create a
            note
          </h6>
        </div>
      )}
      {props.state === "loading" && <AxonLoader />}
      {props.state === "error" && (
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
            Unable to load note <br /> Please try again later
          </h6>
        </div>
      )}
      {props.state === "public-error" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <SecureData fill={ThemeColors.textDark} />
          <h6
            style={{
              color: ThemeColors.textDark,
              textAlign: "center",
            }}
          >
            The note does not exist <br /> or you do not have permission to view
            it.
          </h6>
        </div>
      )}
    </NoteRenderStateWrapper>
  );
};
