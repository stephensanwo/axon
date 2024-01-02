import React, { useMemo } from "react";
import { ThemeColors } from "src/shared/themes";
import {
  NodeMenuBody,
  NodeMenuHeader,
  NodeMenuItem,
  NodeMenuItemLabel,
  NodeMenuSubHeaders,
  NodeMenuWrapper,
  RadioGrid,
} from "./styles";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import IconButton from "src/components/Button/IconButton";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import useCarbonIcons from "src/hooks/useCarbonIcons";
import { Search as SearchIcon } from "@carbon/icons-react";
import { TextInputWithIcon } from "src/components/Input/TextInput";
import NumberInput from "src/components/Input/NumberInput";

const SelectIconMenu: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
  const { id, data } = props;
  const {
    iconSearch: { iconSearchResult, icons, findIcon },
    updateNodeIcon,
    updateNodeIconSize,
  } = useNodeEvents();

  //   Memoize Icon rendering
  const iconComponents = useMemo(() => {
    return icons.map((icon) => {
      const Icon = useCarbonIcons(icon);
      return (
        <IconButton
          key={icon}
          id="select-icon"
          name={icon}
          onClick={() => updateNodeIcon(icon)}
          width="24px"
          height="24px"
          background={ThemeColors.bgHighlight2}
        >
          <Icon width={14} height={14} />
        </IconButton>
      );
    });
  }, [icons]);

  return (
    <NodeMenuWrapper>
      <NodeMenuHeader>
        <NodeMenuSubHeaders lg>Icon</NodeMenuSubHeaders>
      </NodeMenuHeader>
      <NodeMenuBody>
        <NodeMenuItem>
          <NodeMenuItemLabel>Icon Size</NodeMenuItemLabel>
          <NumberInput
            id={`node-icon-size-${id}`}
            value={data.icon?.size!!}
            step={8}
            minValue={16}
            maxValue={64}
            setValue={updateNodeIconSize}
          />
        </NodeMenuItem>
        <NodeMenuItem>
          <TextInputWithIcon
            labelText={""}
            id={`select-icon-${id}`}
            placeholder="Start typing to find an icon i.e email"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            autoSave="off"
            autoFocus={false}
            warn={false}
            invalid={false}
            style={{ backgroundColor: ThemeColors.bgHighlight1 }}
            value={iconSearchResult}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => findIcon(e)}
            icon={
              <IconButton
                id={`node-icon-search-button-${id}`}
                name={"color.label"}
                onClick={() => {}}
                disabled={true}
                width="24px"
                height="24px"
                background={"tranparent"}
                fill={""}
              >
                <SearchIcon fill={ThemeColors.textDark} size={16} />
              </IconButton>
            }
          />
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
                  color: ThemeColors.textDark,
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
