import { Handle as ReactFlowHandle, Position } from "@xyflow/react";
import styled from "styled-components";

interface HandleProps {
  background: string;
  width: string;
  height: string;
  borderradius: number;
  hovercolor: string;
}

const Handle = styled(ReactFlowHandle)<HandleProps>`
  background-color: ${({ background }: HandleProps) => background};
  width: ${({ width }: HandleProps) => width};
  height: ${({ height }: HandleProps) => height};
  border-radius: ${({ borderradius }: HandleProps) => `${borderradius}px`};
  border: none;
  transition:
    background-color 0.1s ease,
    width 0.3s ease;
  :hover {
    background-color: ${({ hovercolor }: HandleProps) => hovercolor};
    background-size: cover;
    background-position: center;
  }
`;

export function NodeHandles({
  node_id,
  handleNodeInteraction,
  verticalHandles = {
    background: "transparent",
    width: "2px",
    height: "calc(100% - 4px)",
    borderradius: 0,
    hovercolor: "transparent",
  },
  horizontalHandles = {
    background: "transparent",
    width: "calc(100% - 4px)",
    height: "2px",
    borderradius: 0,
    hovercolor: "transparent",
  },
}: {
  node_id: string;
  handleNodeInteraction?: () => void;
  verticalHandles?: HandleProps;
  horizontalHandles?: HandleProps;
}) {
  return (
    <>
      <Handle
        type="source"
        position={Position.Right}
        id={`right_handle_${node_id}`}
        {...verticalHandles}
        onMouseEnter={() => handleNodeInteraction}
      ></Handle>
      <Handle
        type="source"
        position={Position.Bottom}
        id={`bottom_handle_${node_id}`}
        {...horizontalHandles}
        onMouseEnter={() => handleNodeInteraction}
      />
      <Handle
        type="target"
        position={Position.Top}
        id={`top_handle_${node_id}`}
        {...horizontalHandles}
        onMouseEnter={() => handleNodeInteraction}
      />
      <Handle
        type="target"
        id={`left_handle_${node_id}`}
        position={Position.Left}
        {...verticalHandles}
        onMouseEnter={() => handleNodeInteraction}
      />
    </>
  );
}
