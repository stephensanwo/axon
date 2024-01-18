import React, { useContext, useState } from "react";
import { ResizeParams } from "reactflow";
import { NoteContext } from "src/context/notes";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import NodeMenu from "src/components/Node/NodeMenu";
import { NodeHandles } from "src/components/Node/NodeHandles";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import NodeWrapper from "src/components/Node/NodeWrapper";
import { BoundingBoxWrapper } from "./index.styles";

const BoundingBox: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
  const { id, data } = props;
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
      <NodeWrapper
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
      />
      <BoundingBoxWrapper
        id={`bounding-box-${id}`}
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
      <NodeHandles node_id={id} handleNodeInteraction={handleNodeInteraction} />
    </>
  );
};

export default BoundingBox;
