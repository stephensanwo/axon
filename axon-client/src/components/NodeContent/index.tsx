import { Box } from "@primer/react";
import { NodeContentProps } from "src/context/board/board.types";

function NodeContent({}: {
  nodeContent: NodeContentProps;
  toggleNodeContent: (action: "open" | "closed") => void;
}) {
  return <Box>NodeContent</Box>;
}

export default NodeContent;
