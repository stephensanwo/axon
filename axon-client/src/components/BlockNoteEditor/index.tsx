import { EditorState, SerializedEditor } from "lexical";
import { useDeferredValue, useEffect, useState } from "react";
import "./index.scss";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingPlugin } from "./Plugins/Heading";
import { Toolbar } from "./Toolbar";
import { ParagraphActionsPlugin, ParagraphPlugin } from "./Plugins/Paragraph";
import { HistoryActionsPlugin } from "./Plugins/History";
// import { AlignActionsPlugin } from "./Plugins/Alignment";
import { BannerActionsPlugin, BannerPlugin } from "./Plugins/Banner";
import { EDITOR_THEME } from "./theme";
import { EDITOR_NODES } from "./nodes";
import LinkPlugin from "./Plugins/Link";
import YouTubePlugin, { YoutubeActionsPlugin } from "./Plugins/Youtube";
import FloatingTextFormatToolbarPlugin from "./FloatingMenu";
import { BlockNoteEditorProps } from "./index.types";
import { useDebounce } from "@uidotdev/usehooks";
import { useNoteContext } from "src/hooks/notes/useNoteContext";
import { EditorStorePlugin } from "./EditorStorePlugin";
import {
  EditorProvider,
  useEditor,
  useEditors,
} from "./BlockNoteEditorProvider";

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function AutoFocusPlugin(props: { id: string }) {
  // const [editor] = useLexicalComposerContext();
  const editor = useEditor(props.id);
  const { selectedNode } = useNoteContext();
  console.log("focus editor", editor);
  useEffect(() => {
    // Focus the editor when the effect fires!
    if (
      props.id === `node-${selectedNode?.id!!}` ||
      props.id === `content-${selectedNode?.id!!}`
    ) {
      editor?.focus();
    }
  }, [selectedNode]);

  return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

function OnChangePlugin(props: {
  namespace: string;
  // onChange: (editorState: EditorState) => void;
  updateExternalEditorState: (editorState: string) => void;
}): null {
  const { updateExternalEditorState } = props;
  const [debounceTime, setEndDebounce] = useState(5);
  const [editor] = useLexicalComposerContext();
  const { selectedNode } = useNoteContext();
  //  TODO: Use proper debouncing
  // useEffect(() => {
  //   console.log("debounce", debounceTime);
  //   return editor.registerUpdateListener(({ editorState }) => {
  //     if (debounceTime === 0) {
  //       const serializedEditorState = editorState?.toJSON();
  //       updateExternalEditorState(JSON.stringify(serializedEditorState));
  //       setEndDebounce(50);
  //     }
  //     // console.log("editor.time", debounceTime);
  //     setEndDebounce((prev) => prev - 1);
  //     // onChange(editorState);
  //   });
  // }, [editor]);

  useEffect(() => {
    return editor.registerUpdateListener((listener) => {
      if (debounceTime === 0) {
        if (
          editor._config.namespace === `node-${selectedNode?.id!!}` ||
          editor._config.namespace === `content-${selectedNode?.id!!}`
        ) {
          console.log(
            "updateExternalEditorState",
            listener.editorState.toJSON()
          );
          updateExternalEditorState(
            JSON.stringify(listener.editorState.toJSON())
          );
        }
      } else {
        setEndDebounce((prev) => prev - 1);
      }
    });
  }, [editor, debounceTime]);

  return null;
}

export function BlockNoteEditor(props: BlockNoteEditorProps) {
  const { updateExternalEditorState, namespace, initialEditorState } = props;
  // const [editor] = useLexicalComposerContext();
  const initialConfig = {
    namespace: `block-editor`,
    theme: EDITOR_THEME,
    onError,
    nodes: EDITOR_NODES,
    // editorState: JSON.stringify(initialEditorState),
  };

  // const [editorState, setEditorState] = useState<EditorState | null>(null);
  // function onChange(editorState: EditorState) {
  //   setEditorState(editorState);
  // }

  // const editorState = editor.parseEditorState(initialEditorState);
  // editor.setEditorState(editorState);

  // useEffect(() => {
  //   console.log("selectedNode config props data", editor._editorState);
  // }, [namespace]);
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorProvider>
        <Toolbar>
          <BannerActionsPlugin />
          <HistoryActionsPlugin />
          <YoutubeActionsPlugin />
        </Toolbar>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="editor-wrapper"
              id="block-note-editor"
            />
          }
          placeholder={<div data-editor-placeholder>Start typing...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <EditorStorePlugin id={namespace} />
        <HeadingPlugin />
        <ParagraphPlugin />
        <LinkPlugin />
        <BannerPlugin />
        <HistoryPlugin />
        <YouTubePlugin />
        <FloatingTextFormatToolbarPlugin />
        <AutoFocusPlugin id={namespace} />
        <OnChangePlugin
          // onChange={onChange}
          namespace={namespace}
          updateExternalEditorState={updateExternalEditorState}
        />
      </EditorProvider>
    </LexicalComposer>
  );
}
