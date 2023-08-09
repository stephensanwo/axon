import { INoteSummary } from "./folders";

export interface INote {
  date_created: string;
  description: string;
  folder_id: string;
  last_edited: string;
  note_name: string;
  note_id: string;
  user_id: string;
  nodes: Array<INode>;
  edges: Array<EdgeProps>;
}

export type INoteAction =
  | {
      type: "INIT_NOTE";
      payload: INote;
    }
  | {
      type: "ADD_NODE";
      payload: {
        node_type: "input-node" | "anchor-node";
        node_data: INote;
      };
    }
  | {
      type: "EDIT_NOTE";
      payload: {
        folder_id: string;
        name: string;
      };
    }
  | {
      type: "DELETE_NOTE";
      payload: {
        folder_id: string;
      };
    };

export interface ISelectedNote extends Omit<INote, "nodes" | "edges"> {
  folder_name: string;
}

export interface ICreateNoteProps
  extends Omit<
    INoteSummary,
    "user_id" | "note_id" | "date_created" | "last_edited"
  > {}

export interface IUpdateNoteProps
  extends Omit<INoteSummary, "user_id" | "date_created" | "last_edited"> {}
export interface NodeDataProps {
  id: string;
  label: string;
  title: string;
  description: string;
  category: "input-node" | "anchor-node";
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

export interface INode {
  id: string;
  type: string;
  data: NodeDataProps;
  position: {
    x: number;
    y: number;
  };
  className: string;
  content: string;
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

export interface INoteModal {
  new: boolean;
  publish: boolean;
}
