import React from "react";
import { ThemeColors } from "src/shared/themes";
import {
  NodeMenuHeader,
  NodeMenuWrapper,
  NodeMenuItem,
  NodeMenuSubHeaders,
  NodeMenuBody,
  RadioGrid,
  NodeMenuItemLabel,
} from "./styles";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import IconButton from "src/components/Button/IconButton";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import NumberInput from "src/components/Input/NumberInput";
import { TextAlignLeft } from "@carbon/icons-react";
import { TextAlignCenter } from "@carbon/icons-react";

const NodeTextFormatting: React.FC<CustomNodeProps<NodeDataProps>> = (
  props
) => {
  const { id, data } = props;
  const { updateNodeFontSize, updateNodeFontWeight, updateNodeFontAlignment } =
    useNodeEvents();
  return (
    <NodeMenuWrapper>
      <NodeMenuHeader>
        <NodeMenuSubHeaders lg>Text Formatting</NodeMenuSubHeaders>
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
              <NodeMenuItemLabel>Font Size</NodeMenuItemLabel>
              <NumberInput
                id={`node-font-size-${id}`}
                value={data.node_styles.font_size}
                suffix="px"
                step={4}
                minValue={12}
                maxValue={48}
                setValue={updateNodeFontSize}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <NodeMenuItemLabel>Font Weight</NodeMenuItemLabel>
              <NumberInput
                id={`node-font-weight-${id}`}
                value={data.node_styles.font_weight}
                step={200}
                minValue={200}
                maxValue={600}
                setValue={updateNodeFontWeight}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <NodeMenuItemLabel>Alignment</NodeMenuItemLabel>
              <RadioGrid id={`select-alignment-${id}`}>
                <IconButton
                  id={`node-left-align-${id}`}
                  name="Left Align"
                  onClick={() => updateNodeFontAlignment("left")}
                  width="24px"
                  height="24px"
                  background={ThemeColors.bgHighlight2}
                >
                  <TextAlignLeft size={14} />
                </IconButton>
                <IconButton
                  id={`node-center-align-${id}`}
                  name="Center Align"
                  onClick={() => updateNodeFontAlignment("center")}
                  width="24px"
                  height="24px"
                  background={ThemeColors.bgHighlight2}
                >
                  <TextAlignCenter size={14} />
                </IconButton>
              </RadioGrid>
            </div>
          </div>
        </NodeMenuItem>
      </NodeMenuBody>
    </NodeMenuWrapper>
  );
};

export default NodeTextFormatting;
