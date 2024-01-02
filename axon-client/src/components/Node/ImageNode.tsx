import React, { useContext, useState } from "react";
import { NoteContext } from "../../context/notes";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import NodeMenu from "./NodeMenu";
import { NodeHandles } from "./NodeHandles";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { ThemeColors } from "src/shared/themes";
import styled from "styled-components";
import { Image } from "@carbon/icons-react";
import { TextInput } from "../Input/TextInput";
import IconButton from "../Button/IconButton";
import { Reset } from "@carbon/icons-react";
import { ArrowRight } from "@carbon/icons-react";
import { NodeMenuInfo } from "./NodeMenu/Shared";
import { useMedia } from "src/hooks/content/useMedia";
import { NodeResizer, ResizeParams } from "reactflow";
import { IMAGE_ERROR_URL } from "src/types/image";

const ImageNodeContainer = styled.div`
  border: none;
  border-radius: 0;
  padding: 0px;
  width: ${(props: { width: string }) => props.width && `${props.width}px`};
  height: ${(props: { height: string }) => props.height && `${props.height}px`};
  border-radius: 8px;
  margin: ${(props: { margin: string }) => props.margin && `${props.margin}px`};
`;

const ImageNodeInput = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  padding-top: 32px;
  background-color: ${ThemeColors.bgDark2};
  border-radius: 8px;

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

const ImageNodeImage = styled.div`
  width: 100%;
  height: 100%;

  & img[data-node-image] {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    border-radius: 8px;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & small[data-node-image-meta] {
    font-size: 8px;
    margin: 0;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${ThemeColors.textLight};
  }
`;

const ImageNode: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
  const { id, data } = props;
  const [previewImage, setPreviewImage] = useState<boolean>(
    data.inlineImage?.url!! ? true : false
  );
  const [resizing, setResizing] = useState<boolean>(false);
  const [imageInput, setImageInput] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");
  const { selectedNode } = useContext(NoteContext);
  const {
    deleteNode,
    duplicateNode,
    handleNodeClick,
    handleNodeInteraction,
    onResizeStart,
    onResizeEnd,
  } = useNodeEvents();
  const { handleMediaUrl } = useMedia();

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
      <ImageNodeContainer
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
        {previewImage ? (
          <ImageNodeImage>
            <div data-node-image-overlay-buttons>
              <IconButton
                id={`node-color-custom`}
                name={"color.label"}
                onClick={() => {
                  setPreviewImage(false);
                  setImageError("");
                }}
                disabled={false}
                width="24px"
                height="24px"
                background={ThemeColors.bgHighlight2}
                borderradius="50%"
              >
                <Reset size={16} />
              </IconButton>
            </div>
            <img
              data-node-image
              src={imageError || data.inlineImage?.url!!}
              onError={() => setImageError(IMAGE_ERROR_URL)}
              style={{
                objectFit: imageError ? "cover" : "fill",
              }}
            />
          </ImageNodeImage>
        ) : (
          <ImageNodeInput>
            <div data-node-icon>
              <Image fill={ThemeColors.textDark} size={24} />
            </div>
            <div data-node-input-container>
              <div data-node-input>
                <TextInput
                  labelText={""}
                  id="code-file-name"
                  placeholder="Image Url"
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  autoSave="off"
                  autoFocus={false}
                  style={{
                    backgroundColor: ThemeColors.bgHighlight1,
                  }}
                  value={imageInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setImageInput(() => e.target.value)
                  }
                />
                <IconButton
                  id={`node-color-custom`}
                  name={"color.label"}
                  onClick={() => {
                    handleMediaUrl(imageInput, setPreviewImage);
                  }}
                  disabled={imageInput.length === 0 && true}
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
                  "Paste a valid image url to preview it and add to your flow"
                }
                type={"info"}
              />
            </div>
          </ImageNodeInput>
        )}
      </ImageNodeContainer>
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

export default ImageNode;
