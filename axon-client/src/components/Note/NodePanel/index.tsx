import { IconButton, Tooltip } from "@primer/react";
import { useAppContext } from "src/hooks/app";
import { ThemeColors } from "src/shared/themes";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { ExtendedNodes } from "src/components/Note/Extensions/options";
import { NodePanelWrapper } from "./styles";
import { DefaultNodes } from "./options";

const NodePanel = () => {
  const { extensions } = useAppContext();
  const { createNewNode } = useNodeEvents();

  return (
    <NodePanelWrapper>
      {DefaultNodes.map((node, index) => (
        <Tooltip aria-label={node.name} direction="e">
          <IconButton
            key={index}
            id={node.id}
            name={node.name}
            onClick={() => {
              createNewNode(node.nodeType, node.nodeContentType);
            }}
            size="large"
            icon={() => node.icon}
            variant="default"
            aria-label={node.description}
          />
        </Tooltip>
      ))}
      {Array.from(extensions).length > 0 && (
        <>
          <div
            style={{
              background: ThemeColors.bgHighlight2,
              width: "35px",
              height: "1px",
              marginTop: "8px",
              marginBottom: "8px",
            }}
          ></div>
          {ExtendedNodes.map(
            (node, index) =>
              extensions.has(node.nodeType) && (
                <IconButton
                  key={index}
                  id={node.id}
                  name={node.name}
                  onClick={() => {
                    createNewNode(node.nodeType, node.nodeContentType);
                  }}
                  size="large"
                  icon={() => node.icon}
                  variant="default"
                  aria-label={node.description}
                />
              )
          )}
        </>
      )}
    </NodePanelWrapper>
  );
};

export default NodePanel;
