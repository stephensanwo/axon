import { Box, useTheme } from "@primer/react";
import { PiAppWindowFill } from "react-icons/pi";
import { formatDateToRelativeTime } from "src/common/date";
import Card from "src/components/Common/Card";
import { useBoard } from "src/context/board/hooks/useBoard";
import { UpdateBoardDto } from "src/domain/board/board.dto";
import { BoardEntity } from "src/domain/board/board.entity";

function BoardRecents({ boardRecents }: { boardRecents: BoardEntity[] }) {
  const { theme } = useTheme();
  const { updateBoard } = useBoard();
  return (
    <Box
      sx={{
        height: "150px",
        display: "flex",
        alignItems: "center",
        gap: 4,
        overflowX: "scroll",
        scrollbarWidth: "none",
        mb: 4,
      }}
    >
      {boardRecents.map((board, index) => (
        <Card.Button
          key={index}
          icon={
            <PiAppWindowFill size={64} color={theme?.colors.primary.default} />
          }
          title={board.name}
          subtitle={formatDateToRelativeTime(board.updated)}
          border
          trailingAction={() => {
            // Unpin board
            const boardUpdateDto: UpdateBoardDto = {
              ...board,
              pinned: false,
            };
            updateBoard.mutate(boardUpdateDto);
          }}
          onClick={() => console.log("click")}
        ></Card.Button>
      ))}
    </Box>
  );
}

export default BoardRecents;
