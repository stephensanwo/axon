import React, { CSSProperties } from "react";
import { NodeResizer, NodeResizerProps } from "reactflow";
import { ThemeColors } from "src/shared/themes";

export interface INodeWrapperProps extends NodeResizerProps {}

export const DefaultWrapperStyle: CSSProperties = {
  border: "0.9px dashed",
  borderSpacing: "10 10",
};

const NodeWrapper: React.FC<INodeWrapperProps> = ({
  nodeId,
  color = ThemeColors.borderLight,
  isVisible = true,
  keepAspectRatio = false,
  onResizeStart,
  onResizeEnd,
  lineStyle = DefaultWrapperStyle,
  shouldResize = () => true,
  ...props
}) => {
  return (
    <NodeResizer
      nodeId={nodeId}
      color={color}
      isVisible={isVisible}
      keepAspectRatio={keepAspectRatio}
      onResizeStart={onResizeStart}
      onResizeEnd={onResizeEnd}
      lineStyle={lineStyle}
      shouldResize={shouldResize}
      {...props}
    />
  );
};

export default NodeWrapper;
