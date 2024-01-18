import React from "react";
import { PiTextAlignLeftLight, PiTextAlignCenterLight } from "react-icons/pi";
import { Box, useTheme } from "@primer/react";
import MenuButton from "src/components/Button/MenuButton";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import NumberInput from "src/components/Input/NumberInput";
import {
  NodeMenuHeader,
  NodeMenuWrapper,
  NodeMenuItem,
  NodeMenuSubHeaders,
  NodeMenuBody,
  NodeMenuItemLabel,
} from "./index.styles";

const NodeTextFormatting: React.FC<CustomNodeProps<NodeDataProps>> = (
  props
) => {
  const { id, data } = props;
  const { theme } = useTheme();
  const { updateNodeFontSize, updateNodeFontWeight, updateNodeFontAlignment } =
    useNodeEvents();
  return (
    <NodeMenuWrapper>
      <NodeMenuHeader>
        <NodeMenuSubHeaders lg>Text Formatting</NodeMenuSubHeaders>
      </NodeMenuHeader>
      <NodeMenuBody>
        <NodeMenuItem>
          <Box
            sx={{
              display: "flex",
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
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
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <NodeMenuItemLabel>Font Weight</NodeMenuItemLabel>
              <NumberInput
                id={`node-font-weight-${id}`}
                value={data.node_styles.font_weight}
                step={200}
                minValue={200}
                maxValue={800}
                setValue={updateNodeFontWeight}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <NodeMenuItemLabel>Alignment</NodeMenuItemLabel>
              <Box
                id={`select-alignment-${id}`}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <MenuButton
                  id={`node-left-align-${id}`}
                  name="Left Align"
                  onClick={() => updateNodeFontAlignment("left")}
                  width="28px"
                  height="28px"
                  aria-label="Left Align"
                  hoverfill={theme?.colors.fg.default}
                  backgroundHoverFill={theme?.colors.bg.variant2}
                >
                  <PiTextAlignLeftLight size={20} />
                </MenuButton>
                <MenuButton
                  id={`node-center-align-${id}`}
                  name="Center Align"
                  onClick={() => updateNodeFontAlignment("center")}
                  aria-label="Center Align"
                  width="28px"
                  height="28px"
                  hoverfill={theme?.colors.fg.default}
                  backgroundHoverFill={theme?.colors.bg.variant2}
                >
                  <PiTextAlignCenterLight size={20} />
                </MenuButton>
              </Box>
            </Box>
          </Box>
        </NodeMenuItem>
      </NodeMenuBody>
    </NodeMenuWrapper>
  );
};

export default NodeTextFormatting;
