import React, { useContext, useState } from "react";
import { NoteContext } from "../../context/notes";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import NodeMenu from "./NodeMenu";
import { Handle } from "./NodeHandles";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { Position } from "reactflow";
import { ResizeParams } from "reactflow";
import { ThemeColors } from "src/shared/themes";
import { BlockNoteEditor as AxonBlockNoteEditor } from "src/components/BlockNoteEditor";
import NodeWrapper from "./NodeWrapper";
const BlockNode: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
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
      <NodeWrapper
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
        shouldResize={() => true}
      />
      <div
        ref={contentRef}
        onClick={() => handleNodeClick(id)}
        onFocus={() => handleNodeClick(id)}
        onBlur={() => {}}
        onMouseEnter={() => {
          handleNodeInteraction(data.node_id);
        }}
        style={{
          width: data?.width - 4,
          height: data?.height - 4,
        }}
      >
        <AxonBlockNoteEditor namespace={`inline-${selectedNode?.id!!}`} />
      </div>

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

export default BlockNode;
