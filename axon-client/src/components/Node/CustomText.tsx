import React, { useContext, useState } from "react";
import { ResizeParams } from "reactflow";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import NodeMenu from "src/components/Node/NodeMenu";
import NoteContext from "src/context/notes";
import { ThemeColors } from "src/shared/themes";
import { TextArea } from "src/components/Input/TextArea";
import NodeWrapper from "src/components/Node/NodeWrapper";

const CustomText: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
  const { id, data } = props;
  const [resizing, setResizing] = useState<boolean>(false);
  const { selectedNode } = useContext(NoteContext);
  const contentRef = React.createRef<any>();
  const {
    duplicateNode,
    deleteNode,
    onResizeStart,
    onResizeEnd,
    handleNodeClick,
    handleNodeInteraction,
    handleNodeContentChange,
  } = useNodeEvents();

  const NODE_RESIZER_GUTTER: number = 4;

  return (
    <>
      <NodeWrapper
        nodeId={id}
        isVisible={selectedNode?.id === id}
        onResizeStart={(e: any, params: ResizeParams) => {
          setResizing(() => true);
          onResizeStart(id, params);
        }}
        onResizeEnd={(e: any, params: ResizeParams) => {
          onResizeEnd(id, params);
          setResizing(() => false);
        }}
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
        selected={selectedNode?.id === id}
        fontSize={data.node_styles.font_size}
        fontWeight={data.node_styles.font_weight}
        color={data.node_styles.font_color ?? ThemeColors.white}
        textalign={data.node_styles.font_alignment}
        padding={8}
        width={data?.width - NODE_RESIZER_GUTTER}
        height={data?.height - NODE_RESIZER_GUTTER}
        margin={NODE_RESIZER_GUTTER / 2}
        border={"transparent"}
        background={"transparent"}
      >
        {data?.description}
      </TextArea>
      {selectedNode?.id === id && !resizing && (
        <NodeMenu
          node_props={props}
          duplicateNode={duplicateNode}
          deleteNode={deleteNode}
        />
      )}
    </>
  );
};

export default CustomText;
