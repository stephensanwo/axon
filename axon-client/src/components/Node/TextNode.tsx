import React, { useContext, useState } from "react";
import { NoteContext } from "../../context/notes";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import NodeMenu from "./NodeMenu";
import { Handle } from "./NodeHandles";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { Position } from "reactflow";
import { NodeResizer, ResizeParams } from "reactflow";
import { TextArea } from "../Input/TextArea";
import { ThemeColors } from "src/shared/themes";

const TextNode: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
  const { id, data, type } = props;
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
    handleNodeContentChange,
  } = useNodeEvents();

  return (
    <>
      <NodeResizer
        nodeId={id}
        color={ThemeColors.borderLight}
        isVisible={selectedNode?.id === id}
        keepAspectRatio={false}
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
        shouldResize={() => true}
      />
      <TextArea
        ref={contentRef}
        disabled={false}
        onChange={(e: any) => handleNodeContentChange(e)}
        onClick={() => handleNodeClick(id)}
        onFocus={() => handleNodeClick(id)}
        onBlur={() => {}}
        onMouseEnter={() => {
          handleNodeInteraction(data.node_id);
        }}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        autoSave="off"
        autoFocus={false}
        selected={selectedNode?.id === id}
        fontSize={data.node_styles.font_size}
        fontWeight={data.node_styles.font_weight}
        color={data.node_styles.font_color}
        textalign={data.node_styles.font_alignment}
        padding={8}
        width={data?.width - 4}
        height={data?.height - 4}
        margin={2}
        borderradius={`${data?.node_styles.border_radius}px`}
        borderstyle={data.node_styles.border_style}
        border={data.node_styles.border_color}
        background={data.node_styles.background_color}
      >
        {data?.description}
      </TextArea>
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

export default TextNode;
