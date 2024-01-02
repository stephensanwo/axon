import React, { useContext, useState } from "react";
import { NoteContext } from "../../context/notes";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import NodeMenu from "./NodeMenu";
import { NodeHandles } from "./NodeHandles";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { ThemeColors } from "src/shared/themes";
import { NodeResizer, ResizeParams } from "reactflow";
import styled from "styled-components";
import { useLink } from "src/hooks/content/useLink";
import { TextInput } from "../Input/TextInput";
import IconButton from "../Button/IconButton";
import { Launch, Link } from "@carbon/icons-react";
import { Reset } from "@carbon/icons-react";
import { ArrowRight } from "@carbon/icons-react";
import { NodeMenuInfo } from "./NodeMenu/Shared";

const LinkNodeContainer = styled.div`
  border: none;
  border-radius: 0;
  padding: 0px;
  width: ${(props: { width: string }) => props.width && `${props.width}px`};
  height: ${(props: { height: string }) => props.height && `${props.height}px`};
  background-color: ${ThemeColors.bgDark2};
  border-radius: 8px;
  margin: ${(props: { margin: string }) => props.margin && `${props.margin}px`};
`;

const LinkNodeInput = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  padding-top: 32px;

  & div[data-node-icon] {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${ThemeColors.bgHighlight1};
    padding: 4px;
    border-radius: 50%;
  }

  & div[data-node-input-container] {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  & div[data-node-input] {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
`;

const LinkNodeImage = styled.div`
  width: 100%;
  height: 100%;

  & img[data-node-image] {
    width: 100%;
    height: 70%;
    object-fit: cover;
    border: none;
    outline: none;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }

  & div[data-node-image-overlay-buttons] {
    width: calc(100% - 16px);
    left: 50%;
    transform: translateX(-50%);
    height: 24px;
    position: absolute;
    top: 8px;
    display: flex;
    justify-content: space-between;
  }

  & div[data-node-image-text] {
    padding: 8px;
  }

  & p[data-node-image-title] {
    font-size: 10px;
    font-weight: 600;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.5;
  }

  & a[data-node-image-href] {
    font-size: 8px;
    margin: 0;
    display: block;
    /* overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; */
  }

  & small[data-node-image-meta] {
    font-size: 8px;
    margin: 0;
    display: block;
    /* overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; */
    color: ${ThemeColors.textLight};
  }
`;

const LinkNode: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
  const { id, data } = props;
  const [previewLink, setPreviewLink] = useState<boolean>(
    data.link?.isLoadable!! ? true : false
  );
  const [resizing, setResizing] = useState<boolean>(false);
  const [linkState, setLinkState] = useState<"error" | "loading" | null>(null);
  const [linkInput, setLinkInput] = useState<string>("");
  const { selectedNode } = useContext(NoteContext);
  const {
    deleteNode,
    duplicateNode,
    handleNodeClick,
    handleNodeInteraction,
    onResizeStart,
    onResizeEnd,
  } = useNodeEvents();
  const { fetchLinkData, resetLinkData } = useLink();

  return (
    <>
      <NodeResizer
        nodeId={id}
        color={ThemeColors.borderLight}
        isVisible={selectedNode?.id === id}
        keepAspectRatio={false}
        onResizeStart={(e: any, params: ResizeParams) => {
          setResizing(() => true);
          onResizeStart(id, params);
        }}
        onResizeEnd={(e: any, params: ResizeParams) => {
          onResizeEnd(id, params);
          setResizing(() => false);
        }}
        minWidth={280}
        minHeight={200}
        lineStyle={{
          border: "0.9px dashed",
          borderSpacing: "10 10",
        }}
        shouldResize={() => true}
      />
      <LinkNodeContainer
        tabIndex={0}
        active={selectedNode?.id === id}
        background={data.node_styles.background_color}
        borderradius={`${data.node_styles.border_radius}px`}
        borderstyle={data.node_styles.border_style}
        border={data.node_styles.border_color}
        width={data.width - 4}
        height={data.height - 4}
        margin={2}
        onClick={() => handleNodeClick(id)}
      >
        {previewLink ? (
          <LinkNodeImage>
            <div data-node-image-overlay-buttons>
              <IconButton
                id={`node-color-custom`}
                name={"color.label"}
                onClick={() => resetLinkData(setLinkState, setPreviewLink)}
                disabled={false}
                width="24px"
                height="24px"
                background={ThemeColors.bgHighlight2}
                borderradius="50%"
              >
                <Reset size={16} />
              </IconButton>
              <IconButton
                id={`node-color-custom`}
                name={"color.label"}
                onClick={() => window.open(data.link?.url!!)}
                disabled={false}
                width="24px"
                height="24px"
                background={ThemeColors.bgHighlight2}
                borderradius="50%"
              >
                <Launch size={16} />
              </IconButton>
            </div>
            <img data-node-image src={data.link?.image!!} />
            <div data-node-image-text>
              <p data-node-image-title> {data.link?.title}</p>
              <a data-node-image-href href={data.link?.url} target="_blank">
                {data.link?.url}
              </a>
              <small data-node-image-meta> {data.link?.description}</small>
            </div>
          </LinkNodeImage>
        ) : (
          <LinkNodeInput>
            <div data-node-icon>
              <Link fill={ThemeColors.textDark} size={24} />
            </div>
            <div data-node-input-container>
              <div data-node-input>
                <TextInput
                  labelText={""}
                  id="code-file-name"
                  placeholder="https://www.example.com"
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  autoSave="off"
                  autoFocus={false}
                  warn={linkState === "error"}
                  style={{
                    backgroundColor: ThemeColors.bgHighlight1,
                  }}
                  value={linkInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLinkInput(() => e.target.value)
                  }
                />
                <IconButton
                  id={`node-color-custom`}
                  name={"color.label"}
                  onClick={() =>
                    fetchLinkData(linkInput, setLinkState, setPreviewLink)
                  }
                  disabled={false}
                  width="24px"
                  height="24px"
                  background={ThemeColors.bgHighlight1}
                  borderradius="4px"
                  fill={ThemeColors.textDark}
                  hoverfill={ThemeColors.primary}
                >
                  <ArrowRight size={16} />
                </IconButton>
              </div>
              <NodeMenuInfo
                text={
                  linkState === "error"
                    ? "Something went wrong, please try again with a valid url"
                    : linkState === "loading"
                    ? "Checking url..."
                    : "Paste a valid link to preview it and add to your flow"
                }
                type={linkState === "error" ? "error" : "info"}
              />
            </div>
          </LinkNodeInput>
        )}
      </LinkNodeContainer>
      {selectedNode?.id === id && !resizing && (
        <NodeMenu
          node_props={props}
          deleteNode={deleteNode}
          duplicateNode={duplicateNode}
        />
      )}
      <NodeHandles node_id={id} handleNodeInteraction={handleNodeInteraction} />
    </>
  );
};

export default LinkNode;
