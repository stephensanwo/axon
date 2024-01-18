import React, { useState } from "react";
import MenuButton from "src/components/Button/MenuButton";
import { useNodeMenuEvents } from "src/hooks/node/useNodeMenuEvents";
import {
  CustomNodeProps,
  NodeDataProps,
  NodeMenuEvents,
  NodeTypes,
} from "src/types/node";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { useNoteMenuEvents } from "src/hooks/notes/useNoteMenuEvents";
import { HorizontalDivider } from "src/components/Divider";
import { DefaultMenuButtons, ActionMenuButtons } from "./NodeMenuButtons";
import { NodeMenuDropdown } from "./Router";
import {
  NodeMenuSelectorContainer,
  NodeMenuSelectorWrapper,
} from "./index.styles";

const NodeMenu: React.FC<{
  node_props: CustomNodeProps<NodeDataProps>;
  deleteNode: (id: string) => void;
  duplicateNode: (data: NodeDataProps, type: NodeTypes) => void;
}> = (props) => {
  const {
    node_props: { type, id, data },
    duplicateNode,
    deleteNode,
  } = props;
  const [nodeMenu, setNodeMenu] = useState<NodeMenuEvents | null>(null);
  const { toggleNodeMenu, nodeMenuState } = useNodeMenuEvents();
  const { toggleNoteMenu } = useNoteMenuEvents();
  const { setDefaultStyles } = useNodeEvents();

  return (
    <NodeMenuSelectorWrapper id={`node-menu-${id}`}>
      <NodeMenuSelectorContainer>
        {ActionMenuButtons.map((button) => (
          <MenuButton
            key={button.id}
            id={button.id}
            name={button.name}
            onClick={() =>
              button.id === "delete-node"
                ? deleteNode(id)
                : button.id === "duplicate-node"
                ? duplicateNode(data, type!!)
                : button.id === "set-default"
                ? setDefaultStyles()
                : toggleNodeMenu(button.id, setNodeMenu)
            }
            width="32px"
            height="32px"
            selected={nodeMenu === button.id}
            hideTooltip={true}
          >
            {button.icon}
          </MenuButton>
        ))}
        <HorizontalDivider margin={8} height={32} />
        {DefaultMenuButtons.map((button) => {
          const disabledState = nodeMenuState(button.id, type!!);
          if (!disabledState) {
            return (
              <MenuButton
                key={button.id}
                id={button.id}
                name={button.name}
                onClick={() => {
                  button.id === "node-content"
                    ? toggleNoteMenu("toggle-content")
                    : toggleNodeMenu(button.id, setNodeMenu);
                }}
                width="32px"
                height="32px"
                selected={nodeMenu === button.id}
                hideTooltip={true}
                disabled={nodeMenuState(button.id, type!!)}
              >
                {button.icon}
              </MenuButton>
            );
          }
        })}
      </NodeMenuSelectorContainer>
      <NodeMenuDropdown nodeMenu={nodeMenu} node_props={props.node_props} />
    </NodeMenuSelectorWrapper>
  );
};

export default NodeMenu;
