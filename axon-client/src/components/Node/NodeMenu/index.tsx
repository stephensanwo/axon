import React, { useState } from "react";
import IconButton from "src/components/Button/IconButton";
import { useNodeMenuEvents } from "src/hooks/node/useNodeMenuEvents";
import { NodeMenuSelectorContainer, NodeMenuSelectorWrapper } from "./styles";
import { NodeMenuDropdown } from "./Router";
import {
  CustomNodeProps,
  NodeDataProps,
  NodeMenuEvents,
  NodeTypes,
} from "src/types/node";
import { DefaultMenuButtons, ActionMenuButtons } from "./NodeMenuButtons";
import { ThemeColors } from "src/shared/themes";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { useNoteMenuEvents } from "src/hooks/notes/useNoteMenuEvents";

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
    <NodeMenuSelectorWrapper>
      <NodeMenuSelectorContainer>
        {ActionMenuButtons.map((button) => (
          <IconButton
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
          </IconButton>
        ))}
        <div
          style={{
            background: ThemeColors.bgHighlight2,
            width: "1px",
            height: "32px",
            marginLeft: "8px",
            marginRight: "8px",
          }}
        ></div>
        {DefaultMenuButtons.map((button) => {
          const disabledState = nodeMenuState(button.id, type!!);
          if (!disabledState) {
            return (
              <IconButton
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
              </IconButton>
            );
          }
        })}
      </NodeMenuSelectorContainer>
      <NodeMenuDropdown nodeMenu={nodeMenu} node_props={props.node_props} />
    </NodeMenuSelectorWrapper>
  );
};

export default NodeMenu;
