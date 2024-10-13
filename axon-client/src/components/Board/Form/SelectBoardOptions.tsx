import { Box } from "@primer/react";
import { useEffect } from "react";
import DeleteBoard from "./DeleteBoard";
import UpdateBoard from "./UpdateBoard";
import { useBoardStore } from "src/context/board/board.store";

function SelectBoardOptions() {
  const { selectedBoards, setSelectedBoards } = useBoardStore();

  useEffect(() => {
    setSelectedBoards([]);
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
      {selectedBoards.length === 1 && <UpdateBoard />}
      {selectedBoards.length > 0 && <DeleteBoard />}
    </Box>
  );
}

export default SelectBoardOptions;
