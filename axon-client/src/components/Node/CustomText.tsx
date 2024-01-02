import React, { useContext, useState } from "react";
import { CustomNodeProps, INode, NodeDataProps } from "src/types/node";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import NodeMenu from "./NodeMenu";
import NoteContext from "src/context/notes";
import { ThemeColors } from "src/shared/themes";
import { NodeResizer, ResizeParams } from "reactflow";
import { TextArea } from "../Input/TextArea";

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
        color={data.node_styles.font_color ?? ThemeColors.white}
        textalign={data.node_styles.font_alignment}
        padding={8}
        width={data?.width - 4}
        height={data?.height - 4}
        margin={2}
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
