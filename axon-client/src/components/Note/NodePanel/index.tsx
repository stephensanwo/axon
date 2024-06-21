import { IconButton, Tooltip } from "@primer/react";
import { useAppContext } from "src/hooks/app";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { ExtensionNodes } from "src/components/Extensions/ExtensionNodes";
import { NodePanelWrapper } from "./styles";
import { DefaultNodes } from "./options";

const NodePanel = () => {
  const { extensions } = useAppContext();
  const { createNewNode } = useNodeEvents();

  return (
    <NodePanelWrapper>
      {DefaultNodes.map((node, index) => (
        <Tooltip aria-label={node.name} direction="e" key={index}>
          <IconButton
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
          {ExtensionNodes.map(
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
