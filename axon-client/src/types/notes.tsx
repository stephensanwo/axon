import { IEdge } from "./edge";
import { INoteSummary } from "./folders";
import {
  ExtendedNodeTypes,
  INode,
  NodeStyleProps,
  NodeThemes,
  NodeTypes,
} from "./node";

export interface INote {
  date_created: string;
  description: string;
  folder_id: string;
  last_edited: string;
  note_name: string;
  note_id: string;
  user_id: string;
  nodes: Array<INode>;
  edges: Array<IEdge>;
}

export interface INoteSettings {
  grid: boolean;
  snapToGrid: boolean;
  defaultNodeType: NodeTypes;
  defaultNodeStyles: NodeStyleProps;
  defaultNodeTheme: NodeThemes;
}

export type INoteAction =
  | {
      type: "INIT_NOTE";
      payload: INote;
    }
  | {
      type: "UPDATE_NODES";
      payload: INode[];
    }
  | {
      type: "UPDATE_EDGES";
      payload: IEdge[];
    };

export interface IMutateNote
  extends Omit<INoteSummary, "user_id" | "date_created" | "last_edited"> {}

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

export interface INoteModal {
  new: boolean;
  publish: boolean;
}

export interface IDefaultNodeSettings {
  node_type: NodeTypes;
}

export type NoteMenuEvents =
  | "toggle-content"
  | "toggle-publish"
  | "toggle-settings"
  | "toggle-user"
  | "toggle-extensions";
