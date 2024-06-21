import React, { useMemo } from "react";
import { Box, FormControl, TextInput, useTheme } from "@primer/react";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import useCarbonIcons from "src/hooks/useCarbonIcons";
import NumberInput from "src/components/Input/NumberInput";
import MenuButton from "src/components/Button/MenuButton";
import {
  NodeMenuBody,
  NodeMenuHeader,
  NodeMenuItem,
  NodeMenuItemLabel,
  NodeMenuSubHeaders,
  NodeMenuWrapper,
  RadioGrid,
} from "./index.styles";

const SelectIconMenu: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
  const { id, data } = props;
  const {
    iconSearch: { iconSearchResult, icons, findIcon },
    updateNodeIcon,
    updateNodeIconSize,
  } = useNodeEvents();
  const { theme } = useTheme();

  //   Memoize Icon rendering
  const iconComponents = useMemo(() => {
    return icons.map((icon) => {
      const Icon = useCarbonIcons(icon);
      return (
        <MenuButton
          key={icon}
          id="select-icon"
          name={icon}
          onClick={() => updateNodeIcon(icon)}
          width="24px"
          height="24px"
          hoverfill={theme?.colors.fg.default}
          backgroundHoverFill={theme?.colors.bg.variant2}
        >
          <Icon width={14} height={14} />
        </MenuButton>
      );
    });
  }, [icons]);

  return (
    <NodeMenuWrapper>
      <NodeMenuHeader>
        <NodeMenuSubHeaders lg>Icon Options</NodeMenuSubHeaders>
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
              <NodeMenuItemLabel>Icon Size</NodeMenuItemLabel>
              <NumberInput
                id={`node-icon-size-${id}`}
                value={data.icon?.size!!}
                step={8}
                minValue={16}
                maxValue={64}
                setValue={updateNodeIconSize}
              />
            </Box>
          </Box>
        </NodeMenuItem>
        <NodeMenuItem>
          <FormControl>
            <FormControl.Label visuallyHidden>Hex Color</FormControl.Label>
            <TextInput
              id={`select-icon-${id}`}
              placeholder="Start typing to find an icon"
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
              value={iconSearchResult}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => findIcon(e)}
              sx={{
                fontSize: 0,
                flex: 1,
              }}
              size="medium"
            />
          </FormControl>
          {iconComponents.length > 0 ? (
            <RadioGrid>{iconComponents}</RadioGrid>
          ) : (
            <div
              style={{
                width: "100%",
                marginTop: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "24px",
              }}
            >
              <small
                style={{
                  color: theme?.colors.text.gray,
                }}
              >
                No Icons Found
              </small>
            </div>
          )}
        </NodeMenuItem>
      </NodeMenuBody>
    </NodeMenuWrapper>
  );
};

export default SelectIconMenu;
