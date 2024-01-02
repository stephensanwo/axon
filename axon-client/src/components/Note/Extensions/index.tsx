import { ThemeColors } from "src/shared/themes";
import {
  NoteMenuContainer,
  NoteMenuContent,
  NoteMenuContentBody,
  NoteMenuContentHeader,
} from "../styles";
import { ExtendedNodes } from "./options";
import { NodeExtensionItem, NodeExtensionItemWrapper } from "./styles";
import IconButton from "src/components/Button/IconButton";
import { PinFilled } from "@carbon/icons-react";
import { useContext, useState } from "react";
import AppContext from "src/context/app";
import { useExtensions } from "src/hooks/notes/useExtensions";
import { TagButton } from "src/components/Button/TagButton";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import Config from "./Config";
import { NodeOptions } from "src/types/node";

const Extensions = () => {
  const { extensions } = useContext(AppContext);
  const { addExtension, removeExtension } = useExtensions();
  const { createNewNode } = useNodeEvents();
  const [nodeOption, setNodeOption] = useState<NodeOptions | null>(null);
  const disablePinning = extensions.size >= 10;

  return (
    <NoteMenuContainer>
      <NoteMenuContent>
        {nodeOption === null ? (
          <>
            <NoteMenuContentHeader marginBottom={"32px"}>
              <h2>Extensions</h2>
            </NoteMenuContentHeader>
            <NoteMenuContentBody>
              <NodeExtensionItemWrapper>
                {ExtendedNodes.map((nodeOption, index) => {
                  const isSelected = extensions.has(nodeOption.nodeType);
                  return (
                    <NodeExtensionItem
                      key={index}
                      disabled={nodeOption.disabled}
                      onClick={() =>
                        !nodeOption.disabled && setNodeOption(() => nodeOption)
                      }
                    >
                      <div
                        style={{
                          marginBottom: "16px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>{nodeOption.icon}</div>
                        <IconButton
                          key={index}
                          id={nodeOption.id}
                          name={nodeOption.name}
                          onClick={(e) => {
                            e.stopPropagation();
                            isSelected
                              ? removeExtension(nodeOption.nodeType, extensions)
                              : addExtension(nodeOption.nodeType, extensions);
                          }}
                          width="24px"
                          height="24px"
                          background={ThemeColors.bgDark2}
                          tooltipPosition="right"
                          selected={isSelected}
                          disabled={disablePinning || nodeOption.disabled}
                        >
                          <PinFilled size={12} />
                        </IconButton>
                      </div>
                      <div>
                        <p>{nodeOption.name}</p>
                        <small
                          style={{
                            color: ThemeColors.textDark,
                            fontSize: "10px",
                            lineHeight: 0.5,
                          }}
                        >
                          {nodeOption.description.slice(0, 40) +
                            `${
                              nodeOption.description.length > 40 ? "..." : ""
                            }`}
                        </small>
                      </div>
                      <div
                        style={{
                          marginTop: "16px",
                          display: "flex",
                          gap: "8px",
                        }}
                      >
                        <TagButton
                          id="favourite-node"
                          label="Add Node"
                          onClick={(e) => {
                            e.stopPropagation();
                            createNewNode(
                              nodeOption.nodeType,
                              nodeOption.nodeContentType
                            );
                          }}
                          disabled={nodeOption.disabled}
                        />
                        {nodeOption.configOptions && (
                          <TagButton
                            id="configure-node"
                            label="Configure"
                            onClick={(e) => {
                              e.stopPropagation();
                              setNodeOption(() => nodeOption);
                            }}
                            disabled={nodeOption.disabled}
                          />
                        )}
                      </div>
                    </NodeExtensionItem>
                  );
                })}
              </NodeExtensionItemWrapper>
            </NoteMenuContentBody>
          </>
        ) : (
          <Config nodeOption={nodeOption} setNodeOption={setNodeOption} />
        )}
      </NoteMenuContent>
    </NoteMenuContainer>
  );
};

export default Extensions;
