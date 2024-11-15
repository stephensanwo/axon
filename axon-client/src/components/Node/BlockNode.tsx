import React, { useMemo, useState } from "react";
import { Box } from "@primer/react";
import { ResizeParams } from "@xyflow/react";
import {
  BLOCK_EDITOR_INITIAL_STATE,
  CustomNodeProps,
  NodeDataProps,
} from "src/types/node";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { BlockNoteEditor } from "src/components/BlockNoteEditor";
import { useNoteContext } from "src/hooks/notes/useNoteContext";
import NodeWrapper from "./NodeWrapper";
import NodeMenu from "./NodeMenu";
import { NodeHandles } from "./NodeHandles";
import { NODE_RESIZER_GUTTER } from "./index.types";
import { useBlockNodeEvents } from "src/hooks/node/useBlockNodeEvents";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { EDITOR_THEME } from "../BlockNoteEditor/theme";
import { EDITOR_NODES } from "../BlockNoteEditor/nodes";
import { BlockNoteEditorProps } from "../BlockNoteEditor/index.types";
import Tiptap from "../TipTapEditor";

const BlockNode: React.FC<CustomNodeProps<NodeDataProps>> = (props) => {
  const { id, data } = props;
  const [resizing, setResizing] = useState<boolean>(false);
  const { selectedNode } = useNoteContext();
  const { handleBlockNodeEditorStateUpdate } = useBlockNodeEvents(id);
  const contentRef = React.createRef<any>();
  const {
    deleteNode,
    duplicateNode,
    onResizeStart,
    onResizeEnd,
    handleNodeClick,
    handleNodeInteraction,
  } = useNodeEvents();

  // Catch any errors that occur during Lexical updates and log them
  // or throw them as needed. If you don't throw them, Lexical will
  // try to recover gracefully without losing user data.
  function onError(error: any) {
    console.error(error);
  }

  const initialConfig = useMemo(() => {
    return {
      namespace: `node-${selectedNode?.id!!}`,
      theme: EDITOR_THEME,
      onError,
      nodes: EDITOR_NODES,
      // editorState: data?.block!!,
    };
  }, [selectedNode]);

  const editorProps: BlockNoteEditorProps = useMemo(() => {
    return {
      namespace: `node-${selectedNode?.id!!}`,
      type: "node",
      initialEditorState: data?.block!!,
      updateExternalEditorState: handleBlockNodeEditorStateUpdate,
    };
  }, [selectedNode]);

  // useEffect(() => {
  //   console.log("selectedNode config", editorProps, initialConfig);
  // }, [selectedNode]);
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
        shouldResize={() => true}
      />
      <Box
        id={`block-node-${id}`}
        ref={contentRef}
        onClick={() => handleNodeClick(id)}
        onFocus={() => handleNodeClick(id)}
        onBlur={() => {}}
        onMouseEnter={() => {
          handleNodeInteraction(data.node_id);
        }}
        sx={{
          width: data?.width - NODE_RESIZER_GUTTER,
          height: data?.height - NODE_RESIZER_GUTTER,
        }}
      >
        {/* <LexicalComposer initialConfig={initialConfig}>
          {React.createElement(BlockNoteEditor, { ...editorProps })}
        </LexicalComposer> */}
        {/* <BlockComposer
          editorProps={{
            namespace: `node-${selectedNode?.id!!}`,
            type: "node",
            initialEditorState: data?.block ?? BLOCK_EDITOR_INITIAL_STATE,
            updateExternalEditorState: handleBlockNodeEditorStateUpdate,
          }}
        ></BlockComposer> */}
        {/* <BlockNoteEditor {...editorProps} /> */}
        <Tiptap content="<p>Hello World 2</p>" updateEvent={() => {}} />
      </Box>

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

export default BlockNode;
