import { Handle as ReactFlowHandle, Position } from "reactflow";
import styled from "styled-components";

const Handle = styled(ReactFlowHandle)`
  background-color: ${(props: { background: string }) =>
    `${props.background} !important`};
  width: ${(props: { width: string }) => props.width};
  height: ${(props: { height: string }) => props.height};
  border-radius: ${(props: { borderradius: number }) => props.borderradius};
  border: none;
`;

export const NodeHandles: React.FC<{
  node_id: string;
  handleNodeInteraction: (id: string) => void;
}> = (props) => {
  const { node_id, handleNodeInteraction } = props;
  return (
    <>
      <Handle
        type="source"
        position={Position.Right}
        id="right_handle"
        borderradius={0}
        background={"transparent"}
        width={"10px"}
        height={"25%"}
        onMouseEnter={() => {
          handleNodeInteraction(node_id);
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom_handle"
        borderradius={0}
        background={"transparent"}
        width={"25%"}
        height={"10px"}
        onMouseEnter={() => {
          handleNodeInteraction(node_id);
        }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top_handle"
        borderradius={0}
        background={"transparent"}
        width={"25%"}
        height={"10px"}
        onMouseEnter={() => {
          handleNodeInteraction(node_id);
        }}
      />
      <Handle
        type="target"
        id="left_handle"
        position={Position.Left}
        borderradius={0}
        background={"transparent"}
        width={"10px"}
        height={"25%"}
        onMouseEnter={() => {
          handleNodeInteraction(node_id);
        }}
      />
    </>
  );
};
