import React, { useContext, useState } from "react";
import { NoteContext } from "../../context/notes";
import { CustomNodeProps, INode, NodeDataProps } from "src/types/node";
import NodeMenu from "./NodeMenu";
import { Handle } from "./NodeHandles";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { ThemeColors } from "src/shared/themes";
import { Position } from "reactflow";
import { NodeResizer, ResizeParams } from "reactflow";
import styled from "styled-components";

const BoundingBoxWrapper = styled.div`
  background-color: ${(props: { background: string }) => props.background};
  width: ${(props: { width: string }) => `${props.width}px`};
  height: ${(props: { height: string }) => `${props.height}px`};
  border: ${(props: { border: string }) =>
    props.border && `1px solid ${props.border}`};
  box-sizing: border-box;
  border-radius: ${(props: { borderradius: string }) => props.borderradius};
`;

const BoundingBox: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
  const { id, data } = props;
  const [resizing, setResizing] = useState<boolean>(false);
  const { selectedNode } = useContext(NoteContext);
  const contentRef = React.createRef<any>();
  const {
    deleteNode,
    duplicateNode,
    onResizeStart,
    onResizeEnd,
    handleNodeClick,
    handleNodeInteraction,
  } = useNodeEvents();

  return (
    <>
      <NodeResizer
        color={ThemeColors.borderLight}
        isVisible={selectedNode?.id === id}
        keepAspectRatio={true}
        onResizeStart={(e: any, params: ResizeParams) => {
          setResizing(() => true);
          onResizeStart(id, params);
        }}
        onResizeEnd={(e: any, params: ResizeParams) => {
          onResizeEnd(id, params);
          setResizing(() => false);
        }}
        lineStyle={{
          border: "0.9px dashed",
          borderSpacing: "10 10",
        }}
      />
      <BoundingBoxWrapper
        onClick={() => handleNodeClick(id)}
        width={data?.width}
        height={data?.height}
        border={resizing ? "transparent" : data.node_styles.border_color}
        borderradius={`${8}px`}
        background={data.node_styles.background_color}
      ></BoundingBoxWrapper>
      {selectedNode?.id === id && !resizing && (
        <NodeMenu
          node_props={props}
          duplicateNode={duplicateNode}
          deleteNode={deleteNode}
        />
      )}
      <Handle
        type="source"
        position={Position.Right}
        id="right_handle"
        borderradius={0}
        background={"transparent"}
        width={"10px"}
        height={"100%"}
        onMouseEnter={() => {
          handleNodeInteraction(id);
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom_handle"
        borderradius={0}
        background={"transparent"}
        width={"100%"}
        height={"10px"}
        onMouseEnter={() => {
          handleNodeInteraction(id);
        }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top_handle"
        borderradius={0}
        background={"transparent"}
        width={"100%"}
        height={"10px"}
        onMouseEnter={() => {
          handleNodeInteraction(id);
        }}
      />
      <Handle
        type="target"
        id="left_handle"
        position={Position.Left}
        borderradius={0}
        background={"transparent"}
        width={"10px"}
        height={"100%"}
        onMouseEnter={() => {
          handleNodeInteraction(id);
        }}
      />
    </>
  );
};

export default BoundingBox;
