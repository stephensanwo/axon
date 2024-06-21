import React, { useState } from "react";
import { ResizeParams } from "reactflow";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { TextArea } from "src/components/Input/TextArea";
import { useNoteContext } from "src/hooks/notes/useNoteContext";
import NodeMenu from "./NodeMenu";
import { NodeHandles } from "./NodeHandles";
import NodeWrapper from "./NodeWrapper";
import { NODE_RESIZER_GUTTER } from "./index.types";

const TextNode: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
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
    handleNodeContentChange,
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
      <TextArea
        id={`text-node-${id}`}
        ref={contentRef}
        disabled={false}
        onChange={(e: any) => handleNodeContentChange(e)}
        onClick={() => handleNodeClick(id)}
        onFocus={() => handleNodeClick(id)}
        onBlur={() => {}}
        onMouseEnter={() => {
          handleNodeInteraction(data.node_id);
        }}
        selected={selectedNode?.id === id}
        fontSize={data.node_styles.font_size}
        fontWeight={data.node_styles.font_weight}
        color={data.node_styles.font_color}
        textalign={data.node_styles.font_alignment}
        padding={8}
        width={data?.width - NODE_RESIZER_GUTTER}
        height={data?.height - NODE_RESIZER_GUTTER}
        margin={NODE_RESIZER_GUTTER / 2}
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
      <NodeHandles node_id={id} handleNodeInteraction={handleNodeInteraction} />
    </>
  );
};

export default TextNode;
