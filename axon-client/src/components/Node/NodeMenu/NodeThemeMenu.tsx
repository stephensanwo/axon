import React from "react";
import { CircleSolid } from "@carbon/icons-react";
import { ColorPalette, ThemeColors } from "src/shared/themes";
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
import { RadioButton } from "@carbon/react";
import { TextInputWithIcon } from "src/components/Input/TextInput";
import { validateHexColor } from "src/utils/styles";

const NodeThemeMenu: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
  const { id, data, type } = props;
  const [customColor, setCustomColor] = React.useState<string>("");
  const { updateNodeColor, updateNodeTheme } = useNodeEvents();

  return (
    <NodeMenuWrapper>
      <NodeMenuHeader>
        <NodeMenuSubHeaders lg>Theme</NodeMenuSubHeaders>
      </NodeMenuHeader>
      <NodeMenuBody>
        <NodeMenuItem>
          <NodeMenuItemLabel>Select Theme</NodeMenuItemLabel>
          <div
            id={`select-theme-radio-group-${id}`}
            style={{
              display: "flex",
            }}
          >
            <RadioButton
              labelText="Fill"
              value={data.node_theme.style}
              id={`background-fill-${id}`}
              onClick={() =>
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
            <RadioButton
              labelText="Outline"
              value={data.node_theme.style}
              id={`border-outline-${id}`}
              onClick={() =>
                updateNodeTheme({
                  style: "border-outline",
                })
              }
              checked={data.node_theme.style === "border-outline"}
              disabled={data.node_theme.style === "border-outline"}
            />
            <RadioButton
              labelText="None"
              value={data.node_theme.style}
              id={`none-${id}`}
              onClick={() =>
                updateNodeTheme({
                  style: "none",
                })
              }
              checked={data.node_theme.style === "none"}
              disabled={
                type === "paragraph" || data.node_theme.style === "none"
              }
            />
          </div>
        </NodeMenuItem>
        <NodeMenuItem>
          <NodeMenuItemLabel>Select Color</NodeMenuItemLabel>
          <RadioGrid id={`select-theme-${id}`}>
            {Object.values(ColorPalette).map((color, index) => {
              return (
                <IconButton
                  key={index}
                  id={`node-color-${color.label}`}
                  name={color.label}
                  onClick={() => updateNodeColor(color.hex)}
                  width="24px"
                  height="24px"
                  background={ThemeColors.bgHighlight2}
                  fill={color.hex}
                  borderradius="50%"
                >
                  <CircleSolid size={18} />
                </IconButton>
              );
            })}
          </RadioGrid>
        </NodeMenuItem>
        <NodeMenuItem>
          <TextInputWithIcon
            labelText={""}
            id="code-file-name"
            placeholder="Enter custom hex color i.e. #000000"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            autoSave="off"
            autoFocus={false}
            warn={
              (customColor.length > 0 && !validateHexColor(customColor)) ?? true
            }
            style={{
              backgroundColor: ThemeColors.bgHighlight1,
            }}
            value={customColor}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCustomColor(() => e.target.value)
            }
            icon={
              <IconButton
                id={`node-color-custom`}
                name={"color.label"}
                onClick={() =>
                  validateHexColor(customColor) && updateNodeColor(customColor)
                }
                disabled={!validateHexColor(customColor)}
                width="24px"
                height="24px"
                background={ThemeColors.bgHighlight2}
                fill={
                  validateHexColor(customColor)
                    ? customColor
                    : ThemeColors.border
                }
                borderradius="50%"
              >
                <CircleSolid size={18} />
              </IconButton>
            }
          />
        </NodeMenuItem>
      </NodeMenuBody>
    </NodeMenuWrapper>
  );
};

export default NodeThemeMenu;
