import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEditors } from "./BlockNoteEditorProvider";
import { useNoteContext } from "src/hooks/notes/useNoteContext";

export type EditorStorePluginProps = {
  id: string;
};

export function EditorStorePlugin(props: EditorStorePluginProps) {
  const { id } = props;
  const { selectedNode } = useNoteContext();
  const [editor] = useLexicalComposerContext();
  const editors = useEditors();
  console.log("editor", editors.editors);
  useEffect(() => {
    editors.createEditor(id, editor);
    return () => editors.deleteEditor(id);
  }, [selectedNode, editor]);
  return null;
}
