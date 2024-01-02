import React from "react";
import { ThemeColors } from "src/shared/themes";
import {
  NodeMenuHeader,
  NodeMenuWrapper,
  NodeMenuItem,
  NodeMenuSubHeaders,
  NodeMenuBody,
  NodeMenuItemLabel,
  RadioFlex,
} from "./styles";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import IconButton from "src/components/Button/IconButton";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import NumberInput from "src/components/Input/NumberInput";
import {
  CgBorderStyleDashed,
  CgBorderStyleSolid,
  CgBorderStyleDotted,
} from "react-icons/cg";

const NodeFormatting: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
  const { type, id, data } = props;
  const { updateNodeBorderRadius, updateNodeBorderStyle } = useNodeEvents();
  return (
    <NodeMenuWrapper>
      <NodeMenuHeader>
        <NodeMenuSubHeaders lg>Node Formatting</NodeMenuSubHeaders>
      </NodeMenuHeader>
      <NodeMenuBody>
        <NodeMenuItem>
          <div
            style={{
              display: "flex",
              gap: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <NodeMenuItemLabel>Border Radius</NodeMenuItemLabel>
              <NumberInput
                id={`node-border-radius-${id}`}
                value={data.node_styles.border_radius}
                suffix="px"
                step={8}
                minValue={0}
                maxValue={24}
                setValue={updateNodeBorderRadius}
                disabled={type === "paragraph"}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <NodeMenuItemLabel>Border Style</NodeMenuItemLabel>
              <RadioFlex id={`select-border-style-${id}`}>
                <IconButton
                  id={`node-border-solid-${id}`}
                  name="Solid"
                  onClick={() => updateNodeBorderStyle("solid")}
                  width="24px"
                  height="24px"
                  background={ThemeColors.bgHighlight2}
                  disabled={type === "paragraph"}
                >
                  <CgBorderStyleSolid size={14} />
                </IconButton>
                <IconButton
                  id={`node-border-dashed-${id}`}
                  name="Dashed"
                  onClick={() => updateNodeBorderStyle("dashed")}
                  width="24px"
                  height="24px"
                  background={ThemeColors.bgHighlight2}
                  disabled={type === "paragraph"}
                >
                  <CgBorderStyleDashed size={14} />
                </IconButton>
                <IconButton
                  id={`node-border-dotted-${id}`}
                  name="Dotted"
                  onClick={() => updateNodeBorderStyle("dotted")}
                  width="24px"
                  height="24px"
                  background={ThemeColors.bgHighlight2}
                  disabled={type === "paragraph"}
                >
                  <CgBorderStyleDotted size={14} />
                </IconButton>
              </RadioFlex>
            </div>
          </div>
        </NodeMenuItem>
      </NodeMenuBody>
    </NodeMenuWrapper>
  );
};

export default NodeFormatting;
