import React, { useState } from "react";
import { CiImageOn, CiUndo } from "react-icons/ci";
import { ResizeParams } from "reactflow";
import { Box, FormControl, TextInput, useTheme } from "@primer/react";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import NodeMenu from "src/components/Node/NodeMenu";
import { NodeHandles } from "src/components/Node/NodeHandles";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import MenuButton from "src/components/Button/MenuButton";
import { NodeMenuInfo } from "src/components/Node/NodeMenu/Shared";
import { useMedia } from "src/hooks/content/useMedia";
import { IMAGE_ERROR_URL } from "src/types/image";
import NodeWrapper from "src/components/Node/NodeWrapper";
import { useNoteContext } from "src/hooks/notes/useNoteContext";
import { NODE_RESIZER_GUTTER } from "src/components/Node/index.types";
import {
  ImageNodeContainer,
  ImageNodeImage,
  ImageNodeInput,
} from "./index.styles";

const ImageNode: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
  const { id, data } = props;
  const [previewImage, setPreviewImage] = useState<boolean>(
    data.inlineImage?.url!! ? true : false
  );
  const [resizing, setResizing] = useState<boolean>(false);
  const [imageInput, setImageInput] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");
  const { selectedNode } = useNoteContext();
  const {
    deleteNode,
    duplicateNode,
    handleNodeClick,
    handleNodeInteraction,
    onResizeStart,
    onResizeEnd,
  } = useNodeEvents();
  const { handleMediaUrl } = useMedia();
  const { theme } = useTheme();

  return (
    <>
      <NodeWrapper
        nodeId={id}
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
        shouldResize={() => true}
      />
      <ImageNodeContainer
        id={`image-node-${id}`}
        tabIndex={0}
        active={selectedNode?.id === id}
        background={data.node_styles.background_color}
        borderradius={`${data.node_styles.border_radius}px`}
        borderstyle={data.node_styles.border_style}
        border={data.node_styles.border_color}
        width={data.width - NODE_RESIZER_GUTTER}
        height={data.height - NODE_RESIZER_GUTTER}
        margin={2}
        onClick={() => handleNodeClick(id)}
      >
        {previewImage ? (
          <ImageNodeImage>
            <Box data-node-image-overlay-buttons>
              <MenuButton
                id={`image-node-undo-${id}`}
                name={"color.label"}
                onClick={() => {
                  setPreviewImage(false);
                  setImageError("");
                }}
                disabled={false}
                width="24px"
                height="24px"
                hoverfill={theme?.colors.fg.default}
                backgroundHoverFill={theme?.colors.bg.variant2}
                borderradius="50%"
              >
                <CiUndo size={16} />
              </MenuButton>
            </Box>
            <img
              id={`image-node-preview-${id}`}
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
            <Box data-node-icon>
              <CiImageOn fill={theme?.colors.fg.variant3} size={24} />
            </Box>
            <Box data-node-input-container>
              <Box>
                <FormControl>
                  <FormControl.Label visuallyHidden>
                    Image Url
                  </FormControl.Label>
                  <TextInput
                    id={`image-node-url-input-${id}`}
                    placeholder="Type url and press enter"
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    autoSave="off"
                    autoFocus={false}
                    monospace
                    block
                    style={{
                      backgroundColor: theme?.colors.bg.variant2b,
                    }}
                    value={imageInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setImageInput(() => e.target.value)
                    }
                    sx={{
                      fontSize: 0,
                      flex: 1,
                    }}
                    size="medium"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") {
                        handleMediaUrl(imageInput, setPreviewImage);
                      }
                    }}
                  />
                </FormControl>
              </Box>
              <NodeMenuInfo
                text={
                  "Paste a valid image url to preview it and add to your flow"
                }
                type={"info"}
              />
            </Box>
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
