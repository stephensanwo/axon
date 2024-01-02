import { EditorState } from "lexical";
import { useEffect, useState } from "react";
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

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

function OnChangePlugin(props: {
  onChange: (editorState: EditorState) => void;
}): null {
  const { onChange } = props;
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      console.log("editorState", editorState);
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

export const BlockNoteEditor: React.FC<{
  namespace: string;
}> = (props) => {
  const { namespace } = props;
  const initialConfig = {
    namespace: `block-editor-${namespace}`,
    theme: EDITOR_THEME,
    onError,
    nodes: EDITOR_NODES,
  };

  const [editorState, setEditorState] = useState<EditorState | null>(null);
  function onChange(editorState: EditorState) {
    setEditorState(editorState);
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Toolbar>
        <BannerActionsPlugin />
        <HistoryActionsPlugin />
        <YoutubeActionsPlugin />
      </Toolbar>
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="editor-wrapper" id="block-note-editor" />
        }
        placeholder={<div data-editor-placeholder>Start typing...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HeadingPlugin />
      <ParagraphPlugin />
      <LinkPlugin />
      <BannerPlugin />
      <HistoryPlugin />
      <YouTubePlugin />
      <FloatingTextFormatToolbarPlugin />
      <MyCustomAutoFocusPlugin />
      <OnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
};
