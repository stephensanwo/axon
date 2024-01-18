import React, { useState } from "react";
import { Box } from "@primer/react";
import { ResizeParams } from "reactflow";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { BlockNoteEditor as AxonBlockNoteEditor } from "src/components/BlockNoteEditor";
import { useNoteContext } from "src/hooks/notes/useNoteContext";
import NodeWrapper from "./NodeWrapper";
import NodeMenu from "./NodeMenu";
import { NodeHandles } from "./NodeHandles";
import { NODE_RESIZER_GUTTER } from "./index.types";

const BlockNode: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
  const { id, data } = props;
  const [resizing, setResizing] = useState<boolean>(false);
  const { selectedNode } = useNoteContext();
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
      <NodeWrapper
        nodeId={id}
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
      <Box
        id={`block-node-${id}`}
        ref={contentRef}
        onClick={() => handleNodeClick(id)}
        onFocus={() => handleNodeClick(id)}
        onBlur={() => {}}
        onMouseEnter={() => {
          handleNodeInteraction(data.node_id);
        }}
        sx={{
          width: data?.width - NODE_RESIZER_GUTTER,
          height: data?.height - NODE_RESIZER_GUTTER,
        }}
      >
        <AxonBlockNoteEditor namespace={`inline-${selectedNode?.id!!}`} />
      </Box>

      {selectedNode?.id === id && !resizing && (
        <NodeMenu
          node_props={props}
          deleteNode={deleteNode}
          duplicateNode={duplicateNode}
        />
      )}
      <NodeHandles node_id={id} handleNodeInteraction={handleNodeInteraction} />
    </>
  );
};

export default BlockNode;
