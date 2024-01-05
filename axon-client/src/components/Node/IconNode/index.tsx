import React, { useContext, useState } from "react";
import { ResizeParams } from "reactflow";
import { NoteContext } from "src/context/notes";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import NodeMenu from "src/components/Node/NodeMenu";
import { NodeHandles } from "src/components/Node/NodeHandles";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import RenderIcon from "src/components/EditableLabels/RenderIcon";
import { ThemeColors } from "src/shared/themes";
import { IconNodeContainer, IconNodeContent } from "./index.styles";
import NodeWrapper from "../NodeWrapper";

const IconNode: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
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
      <NodeHandles node_id={id} handleNodeInteraction={handleNodeInteraction} />
    </>
  );
};

export default IconNode;
