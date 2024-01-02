import { useContext } from "react";
import IconButton from "src/components/Button/IconButton";
import { ThemeColors } from "src/shared/themes";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { DefaultNodes } from "./options";
import AppContext from "src/context/app";
import { ExtendedNodes } from "../Extensions/options";
import { NodePanelWrapper } from "./styles";

const NodePanel = () => {
  const { extensions } = useContext(AppContext);
  const { createNewNode } = useNodeEvents();

  return (
    <NodePanelWrapper>
      {DefaultNodes.map((node, index) => (
        <IconButton
          key={index}
          id={node.id}
          name={node.name}
          onClick={() => {
            createNewNode(node.nodeType, node.nodeContentType);
          }}
          width="45px"
          height="45px"
          background={ThemeColors.bgDark2}
          tooltipPosition="right"
        >
          {node.icon}
        </IconButton>
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
                  width="45px"
                  height="45px"
                  background={ThemeColors.bgDark2}
                  tooltipPosition="right"
                >
                  {node.icon}
                </IconButton>
              )
          )}
        </>
      )}
    </NodePanelWrapper>
  );
};

export default NodePanel;
