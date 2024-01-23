import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
} from "reactflow";
import { Box, Text, useTheme } from "@primer/react";
import { EdgeLabel } from "./index.styles";
import EdgeMenu from "./EdgeMenu";

const StraightEdge: React.FC<EdgeProps> = (props) => {
  const {
    id,
    label,
    sourceX,
    sourceY,
    targetX,
    targetY,
    style,
    markerEnd,
    selected,
    labelStyle,
  } = props;

  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const { theme } = useTheme();

  const edgeMenuStyle = {
    height: selected ? "400px" : "0px",
    width: selected ? "250px" : "150px",
  };

  return (
    <>
      <BaseEdge
        id={`react-flow__edge-${id}`}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 1,
        }}
      />
      <EdgeLabelRenderer>
        <Box
          sx={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${
              labelY - 20
            }px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: "all",
            height: edgeMenuStyle.height,
            width: edgeMenuStyle.width,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "8px",
            backgroundColor: theme?.colors.bg.variant2b,
            zIndex: 100000000,
            borderRadius: "8px",
            marginBottom: "20px",
          }}
          className="nodrag nopan"
        >
          <EdgeLabel>
            {!selected && (
              <Text fontSize={1} sx={labelStyle}>
                {label}
              </Text>
            )}
          </EdgeLabel>
          {selected && <EdgeMenu {...props}></EdgeMenu>}
        </Box>
      </EdgeLabelRenderer>
    </>
  );
};

export default StraightEdge;
