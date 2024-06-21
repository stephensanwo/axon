import React from "react";
import {
  CgBorderStyleDashed,
  CgBorderStyleSolid,
  CgBorderStyleDotted,
} from "react-icons/cg";
import { Box, useTheme } from "@primer/react";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import NumberInput from "src/components/Input/NumberInput";
import MenuButton from "src/components/Button/MenuButton";
import {
  NodeMenuHeader,
  NodeMenuWrapper,
  NodeMenuItem,
  NodeMenuSubHeaders,
  NodeMenuBody,
  NodeMenuItemLabel,
} from "./index.styles";

const NodeFormatting: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
  const { type, id, data } = props;
  const { theme } = useTheme();
  const { updateNodeBorderRadius, updateNodeBorderStyle } = useNodeEvents();
  return (
    <NodeMenuWrapper>
      <NodeMenuHeader>
        <NodeMenuSubHeaders lg>Node Formatting</NodeMenuSubHeaders>
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
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <NodeMenuItemLabel>Border Style</NodeMenuItemLabel>
              <Box
                id={`select-border-style-${id}`}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <MenuButton
                  id={`node-border-solid-${id}`}
                  name="Solid"
                  onClick={() => updateNodeBorderStyle("solid")}
                  width="28px"
                  height="28px"
                  hoverfill={theme?.colors.fg.default}
                  backgroundHoverFill={theme?.colors.bg.variant2}
                  disabled={type === "paragraph"}
                >
                  <CgBorderStyleSolid size={14} />
                </MenuButton>
                <MenuButton
                  id={`node-border-dashed-${id}`}
                  name="Dashed"
                  onClick={() => updateNodeBorderStyle("dashed")}
                  width="28px"
                  height="28px"
                  hoverfill={theme?.colors.fg.default}
                  backgroundHoverFill={theme?.colors.bg.variant2}
                  disabled={type === "paragraph"}
                >
                  <CgBorderStyleDashed size={14} />
                </MenuButton>
                <MenuButton
                  id={`node-border-dotted-${id}`}
                  name="Dotted"
                  onClick={() => updateNodeBorderStyle("dotted")}
                  width="28px"
                  height="28px"
                  hoverfill={theme?.colors.fg.default}
                  backgroundHoverFill={theme?.colors.bg.variant2}
                  disabled={type === "paragraph"}
                >
                  <CgBorderStyleDotted size={14} />
                </MenuButton>
              </Box>
            </Box>
          </Box>
        </NodeMenuItem>
      </NodeMenuBody>
    </NodeMenuWrapper>
  );
};

export default NodeFormatting;
