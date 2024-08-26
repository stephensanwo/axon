import { Box } from "@primer/react";
import { useEffect } from "react";
import DeleteBoard from "../Form/DeleteBoard";
import UpdateBoard from "../Form/UpdateBoard";
import { BaseProjectProps } from "src/components/Project/index.types";

function SelectBoardOptions({
  projectState,
  projectStateDispatch,
}: BaseProjectProps) {
  const {
    projectFiles: { selectedBoards },
  } = projectState;

  useEffect(() => {
    projectStateDispatch({
      type: "CLEAR_SELECTED_BOARDS",
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
      {selectedBoards.length === 1 && (
        <UpdateBoard
          projectState={projectState}
          projectStateDispatch={projectStateDispatch}
        />
      )}
      {selectedBoards.length > 0 && (
        <DeleteBoard
          projectState={projectState}
          projectStateDispatch={projectStateDispatch}
        />
      )}
    </Box>
  );
}

export default SelectBoardOptions;
