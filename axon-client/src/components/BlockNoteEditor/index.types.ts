import { SerializedEditor } from "lexical";

export type FloatingMenuDropdownTypes = "align" | "text" | "link";

export type BlockNoteEditorProps =
  | {
      namespace: string;
      initialEditorState: string;
      type: "node";
      updateExternalEditorState: (editorState: string) => void;
    }
  | {
      namespace: string;
      initialEditorState: string;
      type: "content";
      updateExternalEditorState: (editorState: string) => void;
    };

export interface IBlockComposer {
  editorProps: BlockNoteEditorProps;
}
