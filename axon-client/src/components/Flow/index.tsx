import { FlowControls } from "./FlowControls";
import FlowMain from "./FlowMain";
import { Box } from "@primer/react";
import { FlowProps } from "./index.types";
import NodeOptions from "../NodeOptions";
import { useBoardStore } from "src/context/board/board.store";

const Flow = ({ initialNodes, initialEdges }: FlowProps) => {
  const { nodeOptions, toggleNodeOptions } = useBoardStore();
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        margin: "auto",
        position: "relative",
      }}
      onMouseDown={(e: any) => e.preventDefault()}
    >
      <NodeOptions.Selector />
      <FlowMain initialNodes={initialNodes} initialEdges={initialEdges} />
      <FlowControls />
    </Box>
  );
};

export default Flow;
