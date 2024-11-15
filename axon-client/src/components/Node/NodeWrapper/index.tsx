import { useTheme } from "@primer/react";
import React, { CSSProperties } from "react";
import { NodeResizer, NodeResizerProps } from "@xyflow/react";

export interface INodeWrapperProps extends NodeResizerProps {}

export const DefaultWrapperStyle: CSSProperties = {
  border: "0.9px dashed",
  borderSpacing: "10 10",
};

const NodeWrapper: React.FC<INodeWrapperProps> = ({
  nodeId,
  color,
  isVisible = true,
  keepAspectRatio = false,
  onResizeStart,
  onResizeEnd,
  lineStyle = DefaultWrapperStyle,
  shouldResize = () => true,
  ...props
}) => {
  const { theme } = useTheme();
  return (
    <NodeResizer
      nodeId={nodeId}
      color={color ?? theme?.colors.border.variant2}
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
