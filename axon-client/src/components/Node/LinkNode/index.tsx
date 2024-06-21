import React, { useState } from "react";
import { ResizeParams } from "reactflow";
import {
  Box,
  FormControl,
  Link,
  Text,
  TextInput,
  useTheme,
} from "@primer/react";
import { CiGlobe, CiUndo } from "react-icons/ci";
import { CustomNodeProps, NodeDataProps } from "src/types/node";
import NodeMenu from "src/components/Node/NodeMenu";
import { NodeHandles } from "src/components/Node/NodeHandles";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { useLink } from "src/hooks/content/useLink";
import { NodeMenuInfo } from "src/components/Node/NodeMenu/Shared";
import NodeWrapper from "src/components/Node/NodeWrapper";
import { NODE_RESIZER_GUTTER } from "src/components/Node/index.types";
import MenuButton from "src/components/Button/MenuButton";
import {
  LinkNodeContainer,
  LinkNodeImage,
  LinkNodeInput,
} from "./index.styles";
import { useNoteContext } from "src/hooks/notes/useNoteContext";

const LinkNode: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
  const { id, data } = props;
  const [previewLink, setPreviewLink] = useState<boolean>(
    data.link?.isLoadable!! ? true : false
  );
  const [resizing, setResizing] = useState<boolean>(false);
  const [linkState, setLinkState] = useState<"error" | "loading" | null>(null);
  const [linkInput, setLinkInput] = useState<string>("");
  const { selectedNode } = useNoteContext();
  const {
    deleteNode,
    duplicateNode,
    handleNodeClick,
    handleNodeInteraction,
    onResizeStart,
    onResizeEnd,
  } = useNodeEvents();
  const { fetchLinkData, resetLinkData } = useLink();
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
      <LinkNodeContainer
        id={`link-node-${id}`}
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
        {previewLink ? (
          <LinkNodeImage>
            <Box data-node-image-overlay-buttons>
              <MenuButton
                id={`link-node-undo-${id}`}
                name={"color.label"}
                onClick={() => resetLinkData(setLinkState, setPreviewLink)}
                disabled={false}
                width="24px"
                height="24px"
                hoverfill={theme?.colors.fg.default}
                backgroundHoverFill={theme?.colors.bg.variant2}
                borderradius="50%"
              >
                <CiUndo size={16} />
              </MenuButton>
              <MenuButton
                id={`link-node-launch-${id}`}
                name={"color.label"}
                onClick={() => window.open(data.link?.url!!)}
                disabled={false}
                width="24px"
                height="24px"
                hoverfill={theme?.colors.fg.default}
                backgroundHoverFill={theme?.colors.bg.variant2}
                borderradius="50%"
              >
                <CiGlobe size={16} />
              </MenuButton>
            </Box>
            <img
              id={`link-node-preview-img-${id}`}
              data-node-image
              src={data.link?.image!!}
            />
            <Box data-node-image-text>
              <Box>
                <Text>{data.link?.title}</Text>
              </Box>
              <Box>
                <Link
                  sx={{
                    fontSize: 0,
                  }}
                  href={data.link?.url}
                  target="_blank"
                >
                  {data.link?.url}
                </Link>
              </Box>
              <Box>
                <Text
                  sx={{
                    fontSize: 0,
                    lineHeight: 1.4,
                    display: "block",
                    color: theme?.colors.text.grayLight,
                  }}
                >
                  {data.link?.description}
                </Text>
              </Box>
            </Box>
          </LinkNodeImage>
        ) : (
          <LinkNodeInput>
            <Box data-node-icon>
              <CiGlobe fill={theme?.colors.fg.variant3} size={24} />
            </Box>
            <Box data-node-input-container>
              <Box>
                <FormControl>
                  <FormControl.Label visuallyHidden>Link</FormControl.Label>
                  <TextInput
                    id={`link-node-input-${id}`}
                    placeholder="https://www.example.com"
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
                    value={linkInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setLinkInput(() => e.target.value)
                    }
                    sx={{
                      fontSize: 0,
                      flex: 1,
                    }}
                    size="medium"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") {
                        fetchLinkData(linkInput, setLinkState, setPreviewLink);
                      }
                    }}
                    validationStatus={
                      linkState === "error" ? "error" : undefined
                    }
                  />
                </FormControl>
              </Box>
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
            </Box>
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
