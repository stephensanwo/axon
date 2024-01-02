import React, { useContext, useRef, useState } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from "reactflow";
import { OverflowMenuHorizontal } from "@carbon/icons-react";
import { useEdgeEvents } from "src/hooks/edge/useEdgeEvents";
import EdgeContext from "src/context/edge";
import IconButton from "../Button/IconButton";
import { EditableLabel, EdgeLabel, EdgeButton } from "./styles";

const CustomEdge: React.FC<EdgeProps> = ({
  id,
  label,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { handleEdgeClick, handleEdgeLabelContentChange } = useEdgeEvents();
  const { setEdgeMenu } = useContext(EdgeContext);
  const [edgeLabel, setEdgeLabel] = useState<React.ReactNode>(label);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleLabelClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdgeLabel(e.target.value);
    handleEdgeLabelContentChange(e.target.value);
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 1,
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: "all",
            height: "70px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "8px",
          }}
          className="nodrag nopan"
        >
          <EdgeLabel>
            <EditableLabel
              id={id}
              ref={inputRef}
              contentEditable
              onClick={handleLabelClick}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              autoSave="off"
              autoFocus={false}
              value={edgeLabel}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleLabelChange(e)
              }
            />
          </EdgeLabel>
          <EdgeButton>
            <IconButton
              id="toggle-edge-menu"
              name="Toggle Edge Menu"
              onClick={() => {
                setEdgeMenu("edge-options");
                handleEdgeClick(id);
              }}
              width="24px"
              height="24px"
              hideTooltip={true}
              borderradius="50%"
            >
              <OverflowMenuHorizontal size="16" />
            </IconButton>
          </EdgeButton>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
