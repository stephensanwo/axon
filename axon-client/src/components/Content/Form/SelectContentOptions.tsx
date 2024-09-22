import { Box } from "@primer/react";
import { useEffect } from "react";
import { BaseContentProps } from "../index.types";
import UpdateContent from "./UpdateContent";
import DeleteContent from "./DeleteContent";

function SelectContentOptions({
  contentState,
  contentStateDispatch,
}: BaseContentProps) {
  const {
    contentList: { selectedContent },
  } = contentState;

  useEffect(() => {
    contentStateDispatch({
      type: "CLEAR_SELECTED_CONTENT",
    });
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      {selectedContent.length === 1 && (
        <UpdateContent
          contentState={contentState}
          contentStateDispatch={contentStateDispatch}
        />
      )}
      {selectedContent.length > 0 && (
        <DeleteContent
          contentState={contentState}
          contentStateDispatch={contentStateDispatch}
        />
      )}
    </Box>
  );
}

export default SelectContentOptions;
