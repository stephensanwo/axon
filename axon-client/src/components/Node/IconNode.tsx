import React, { useContext, useState } from "react";
import { NoteContext } from "../../context/notes";
import { BorderStyles, CustomNodeProps, NodeDataProps } from "src/types/node";
import NodeMenu from "./NodeMenu";
import { Handle } from "./NodeHandles";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import RenderIcon from "../EditableLabels/RenderIcon";
import { ThemeColors } from "src/shared/themes";
import { Position } from "reactflow";
import { NodeResizer, ResizeParams } from "reactflow";
import styled from "styled-components";

const IconNodeContainer = styled.div`
  border: none;
  border-radius: 0;
  padding: 0;
  width: ${(props: { width: string }) => props.width && `${props.width}px`};
  height: ${(props: { height: string }) => props.height && `${props.height}px`};
  background-color: ${(props: { background: string }) =>
    props.background && props.background};
  border-radius: ${(props: { borderradius: string }) => props.borderradius};
  border: ${(props: { border: string; borderstyle: BorderStyles }) =>
    props.border && `1px ${props.borderstyle} ${props.border}`};
  margin: ${(props: { margin: string }) => props.margin && `${props.margin}px`};
`;

export const IconNodeContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 4px;
`;
const IconNode: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
  const { id, type, data } = props;
  const [resizing, setResizing] = useState<boolean>(false);
  const { selectedNode } = useContext(NoteContext);
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
        minWidth={45}
        minHeight={45}
        maxWidth={100}
        maxHeight={100}
        keepAspectRatio={true}
        shouldResize={() => true}
      />
      <IconNodeContainer
        tabIndex={0}
        active={selectedNode?.id === id}
        background={data.node_styles.background_color}
        borderradius={`${data.node_styles.border_radius}px`}
        borderstyle={data.node_styles.border_style}
        border={data.node_styles.border_color}
        width={data.width - 4}
        height={data.height - 4}
        margin={2}
      >
        <IconNodeContent>
          {data.icon && (
            <RenderIcon
              iconName={data.icon.name}
              size={`${data.icon.size}`}
              fill={
                data.node_theme.style === "background-fill"
                  ? data.node_styles.font_color
                  : data.node_theme.style === "border-outline"
                  ? data.node_styles.border_color
                  : data.node_theme.style === "none"
                  ? data.node_theme.color
                  : ThemeColors.white
              }
            />
          )}
          {/* Overlay */}
          <div
            onClick={() => handleNodeClick(id)}
            style={{
              backgroundColor: "transparent",
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          ></div>
        </IconNodeContent>
      </IconNodeContainer>
      {selectedNode?.id === id && !resizing && (
        <NodeMenu
          node_props={props}
          deleteNode={deleteNode}
          duplicateNode={duplicateNode}
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

export default IconNode;
