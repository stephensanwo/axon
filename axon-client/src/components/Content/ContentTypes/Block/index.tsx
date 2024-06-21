import { LexicalComposer } from "@lexical/react/LexicalComposer";
import React, { useContext, useMemo } from "react";
import { BlockNoteEditorProps } from "src/components/BlockNoteEditor/index.types";
import { EDITOR_NODES } from "src/components/BlockNoteEditor/nodes";
import { EDITOR_THEME } from "src/components/BlockNoteEditor/theme";
import {
  ContentBody,
  ContentContainer,
} from "src/components/Content/index.styles";
import { BlockNoteEditor } from "src/components/BlockNoteEditor";
import NoteContext from "src/context/notes";
import { useBlock } from "src/hooks/content/useBlock";
import TipTap from "src/components/TipTapEditor";

const Block = () => {
  const { selectedNode } = useContext(NoteContext);
  const { block, handleBlockEditorStateUpdate } = useBlock();

  // // Catch any errors that occur during Lexical updates and log them
  // // or throw them as needed. If you don't throw them, Lexical will
  // // try to recover gracefully without losing user data.
  // function onError(error: any) {
  //   console.error(error);
  // }

  // console.log("selectedNode", selectedNode?.id!!);

  // const initialConfig = useMemo(() => {
  //   console.log("selectedNode block", block);

  //   return {
  //     namespace: `content-${selectedNode?.id!!}`,
  //     theme: EDITOR_THEME,
  //     onError,
  //     nodes: EDITOR_NODES,
  //     editorState: selectedNode?.data?.block!!,
  //   };
  // }, [selectedNode]);

  // console.log("selectedNode Config", initialConfig);

  // const editorProps: BlockNoteEditorProps = useMemo(() => {
  //   console.log("selectedNode block", `content-${selectedNode?.id!!}`);

  //   return {
  //     namespace: `content-${selectedNode?.id!!}`,
  //     type: "content",
  //     initialEditorState: selectedNode?.data?.block!!,
  //     updateExternalEditorState: handleBlockEditorStateUpdate,
  //   };
  // }, [selectedNode]);

  // console.log("selectedNode editorProps", editorProps);

  return (
    <ContentContainer>
      <ContentBody>
        {/* <AxonBlockNoteEditor
          namespace={selectedNode?.id!!}
          type="content"
          initialEditorState={block!!}
          updateExternalEditorState={handleBlockEditorStateUpdate}
        /> */}
        {/* <LexicalComposer initialConfig={initialConfig}>
          {React.createElement(BlockNoteEditor, { ...editorProps })}
        </LexicalComposer> */}
        {/* <BlockNoteEditor {...editorProps} /> */}
        <TipTap
          content="<p>Hello World 2</p>"
          updateEvent={handleBlockEditorStateUpdate}
        />
        {/* <TipTap content="<p>Hello World 2</p>" /> */}
      </ContentBody>
    </ContentContainer>
  );
};

export default Block;
