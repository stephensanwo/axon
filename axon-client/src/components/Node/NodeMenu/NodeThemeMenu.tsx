import React from "react";
import {
  Box,
  FormControl,
  Radio,
  Text,
  TextInput,
  useTheme,
} from "@primer/react";
import { TbCircleFilled } from "react-icons/tb";
import { ColorPalette } from "src/shared/themes";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import MenuButton from "src/components/Button/MenuButton";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import { validateHexColor } from "src/utils/styles";
import {
  NodeMenuHeader,
  NodeMenuWrapper,
  NodeMenuItem,
  NodeMenuSubHeaders,
  NodeMenuBody,
  RadioGrid,
  NodeMenuItemLabel,
  RadioFlex,
} from "./index.styles";

const NodeThemeMenu: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
  const { id, data, type } = props;
  const [customColor, setCustomColor] = React.useState<string>("");
  const { updateNodeColor, updateNodeTheme } = useNodeEvents();
  const { theme } = useTheme();

  return (
    <NodeMenuWrapper>
      <NodeMenuHeader>
        <NodeMenuSubHeaders lg>Theme</NodeMenuSubHeaders>
      </NodeMenuHeader>
      <NodeMenuBody>
        <NodeMenuItem>
          <NodeMenuItemLabel>Select Theme</NodeMenuItemLabel>
          <Box
            id={`select-theme-radio-group-${id}`}
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
            <FormControl>
              <Radio
                name="background-fill"
                value={data.node_theme.style}
                id={`background-fill-${id}`}
                onChange={() =>
                  updateNodeTheme({
                    style: "background-fill",
                  })
                }
                checked={data.node_theme.style === "background-fill"}
                disabled={
                  type === "paragraph" ||
                  data.node_theme.style === "background-fill"
                }
              />
              <FormControl.Label>
                <Text
                  sx={{
                    fontSize: 0,
                    fontWeight: 400,
                  }}
                >
                  Fill
                </Text>
              </FormControl.Label>
            </FormControl>
            <FormControl>
              <Radio
                name="border-outline"
                value={data.node_theme.style}
                id={`border-outline-${id}`}
                onChange={() =>
                  updateNodeTheme({
                    style: "border-outline",
                  })
                }
                checked={data.node_theme.style === "border-outline"}
                disabled={data.node_theme.style === "border-outline"}
              />
              <FormControl.Label>
                <Text
                  sx={{
                    fontSize: 0,
                    fontWeight: 400,
                  }}
                >
                  Outline
                </Text>
              </FormControl.Label>
            </FormControl>
            <FormControl>
              <Radio
                name="none"
                value={data.node_theme.style}
                id={`none-${id}`}
                onChange={() =>
                  updateNodeTheme({
                    style: "none",
                  })
                }
                checked={data.node_theme.style === "none"}
                disabled={
                  type === "paragraph" || data.node_theme.style === "none"
                }
              />
              <FormControl.Label>
                <Text
                  sx={{
                    fontSize: 0,
                    fontWeight: 400,
                  }}
                >
                  None
                </Text>
              </FormControl.Label>
            </FormControl>
          </Box>
        </NodeMenuItem>
        <NodeMenuItem>
          <NodeMenuItemLabel>Select Color</NodeMenuItemLabel>
          <RadioGrid id={`select-theme-${id}`}>
            {Object.values(ColorPalette).map((color, index) => {
              return (
                <MenuButton
                  key={index}
                  id={`node-color-${color.label}`}
                  name={color.label}
                  onClick={() => updateNodeColor(color.hex)}
                  width="24px"
                  height="24px"
                  background={theme?.colors.bg.variant2b}
                  fill={color.hex}
                  borderradius="50%"
                >
                  <TbCircleFilled size={18} />
                </MenuButton>
              );
            })}
          </RadioGrid>
        </NodeMenuItem>
        <NodeMenuItem>
          <Box>
            <RadioFlex>
              <NodeMenuItemLabel>Custom Color</NodeMenuItemLabel>
              <MenuButton
                id={`node-color-custom`}
                name={"color.label"}
                onClick={() =>
                  validateHexColor(customColor) && updateNodeColor(customColor)
                }
                disabled={!validateHexColor(customColor)}
                width="24px"
                height="24px"
                background={theme?.colors.bg.variant2b}
                fill={
                  validateHexColor(customColor)
                    ? customColor
                    : theme?.colors.bg.variant2b
                }
                borderradius="50%"
              >
                <TbCircleFilled size={18} />
              </MenuButton>
            </RadioFlex>
          </Box>
          <Box>
            <FormControl>
              <FormControl.Label visuallyHidden>Hex Color</FormControl.Label>
              <TextInput
                id="node-custom-color"
                placeholder="Paste custom hex i.e #000000"
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                autoSave="off"
                autoFocus={false}
                monospace
                block
                style={{
                  backgroundColor: theme?.colors.bg.variant2b,
                }}
                value={customColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCustomColor(() => e.target.value)
                }
                sx={{
                  fontSize: 0,
                  flex: 1,
                }}
                size="medium"
              />

              {customColor.length > 0 && !validateHexColor(customColor) && (
                <FormControl.Validation variant="error">
                  Invalid HEX Color
                </FormControl.Validation>
              )}
            </FormControl>
          </Box>
        </NodeMenuItem>
      </NodeMenuBody>
    </NodeMenuWrapper>
  );
};

export default NodeThemeMenu;
