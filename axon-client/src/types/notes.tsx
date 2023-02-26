import { Edge } from "react-flow-renderer";

export interface NoteProps {
  date_created: string;
  description: string;
  folder_id: string;
  last_edited: string;
  name: string;
  note_id: string;
  user_id: string;
  nodes: Array<NodeProps>;
  edges: Array<EdgeProps>;
}

export type NoteActionProps =
  | {
      type: "init_note";
      payload: NoteProps;
    }
  | {
      type: "init_note";
      payload: NoteProps;
    }
  | {
      type: "edit_note";
      payload: {
        folder_id: string;
        name: string;
      };
    }
  | {
      type: "delete_note";
      payload: {
        folder_id: string;
      };
    };

export interface SelectedNoteProps {
  folder_id: string;
  note_id: string;
}

export interface CreateNoteProps {
  folder_id: string;
  note_description: string;
  note_name: string;
}

export interface NodeDataProps {
  id: string;
  label: string;
  title: string;
  description: string;
  node_category: "component" | "note" | "code" | "anchor";
  node_type: string;
}

export interface NodeContentProps {
  id: string;
  content_type: "markdown";
  content_header: string;
  content_data: string;
}

export interface NodeStyleProps {
  background_styles: Object;
  label_styles: Object;
  description_styles: Object;
}

export interface NodeProps {
  id: string;
  type: string;
  data: NodeDataProps;
  position: {
    x: number;
    y: number;
  };
  code?: string;
  note?: string;
  className: string;
  content?: Array<NodeContentProps>;
  node_styles: NodeStyleProps;
}

export interface EdgeProps {
  id: string;
  source: string;
  target: string;
  type: string;
  label: string;
}

export interface CodeSnippetProps {
  id: string;
  code_text: string;
  language: string;
  language_desc: string;
}

export interface MarkdownNoteProps {
  id: string;
  markdown_text: string;
  published: boolean;
}

export interface NoteProps_ {
  id: string;
  name: string;
  category: "flow" | "code-snippet" | "notes";
  description: string;
  created_by: string;
  created_on: string;
  last_edit?: string;
  nodes: Array<NodeProps>;
  edges: Array<EdgeProps>;
  code: Array<CodeSnippetProps>;
  note: MarkdownNoteProps;
}

export interface FolderProps {
  id: string;
  name: string;
  created_by: string;
  created_on: string;
  last_edit?: string;
  notes: Array<NoteProps>;
}

interface NoteContextProps {
  folders: Array<FolderProps>;
  setFolders:
    | React.Dispatch<React.SetStateAction<Array<FolderProps>>>
    | React.Dispatch<React.SetStateAction<FolderProps>>
    | any;
  flowSelectedNode: string;
  setFlowSelectedNode: React.Dispatch<React.SetStateAction<string>> | any;
  openTextPanel: boolean;
  setOpenTextPanel: React.Dispatch<React.SetStateAction<boolean>> | any;
}

export enum NotesActionType {
  NEW_FOLDER = "new_folder",
  EDIT_FOLDER = "edit_folder",
  DELETE_FOLDER = "delete_folder",
}

// export type NotesActionProps =
//   | {
//       type: "new_folder";
//       payload: FolderProps;
//     }
//   | {
//       type: "edit_folder";
//       payload: FolderProps;
//     }
//   | {
//       type: "delete_folder";
//       payload: FolderProps;
//     };

interface NEW_FOLDER {
  type: NotesActionType.NEW_FOLDER;
  payload: Required<FolderProps>;
}

interface EDIT_FOLDER {
  type: NotesActionType.EDIT_FOLDER;
  payload: FolderProps;
}

interface DELETE_FOLDER {
  type: NotesActionType.DELETE_FOLDER;
  payload: string;
}

export type NotesActionProps = NEW_FOLDER | EDIT_FOLDER | DELETE_FOLDER;
// export type NotesAction =
//   | { type: NotesActionType.NEW_FOLDER; payload: Required<FolderProps> }
//   | {
//       type: NotesActionType.EDIT_FOLDER;
//       payload: Required<FolderProps>;
//     }
//   | { type: NotesActionType.DELETE_FOLDER; payload: string };
