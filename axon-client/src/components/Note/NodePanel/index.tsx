import { IconButton, Tooltip } from "@primer/react";
import { useAppContext } from "src/hooks/app";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { ExtensionNodes } from "src/components/Extensions/ExtensionNodes";
import { NodePanelBox } from "./styles";
import { DefaultNodes } from "./options";

const NodePanel = () => {
  const { extensions } = useAppContext();
  const { createNewNode } = useNodeEvents();

  return (
    <NodePanelBox>
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
            variant="invisible"
            aria-label={node.description}
            sx={{
              borderBottomLeftRadius: index === DefaultNodes.length ? 4 : 0,
              borderBottomRightRadius: index === DefaultNodes.length ? 4 : 0,
              borderTopLeftRadius: index === 0 ? 4 : 0,
              borderTopRightRadius: index === 0 ? 4 : 0,
            }}
          />
        </Tooltip>
      ))}
      {/* {Array.from(extensions).length > 0 && (
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
      )} */}
    </NodePanelBox>
  );
};

export default NodePanel;
