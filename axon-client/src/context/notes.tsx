import React, { createContext, useReducer, useState } from "react";
import noteReducer from "../reducers/notes";
import noteStore from "./notes.json";
import { Reducer } from "react";
import { NotesActionProps } from "../types/notes";

interface NoteContextProviderProps {
  children: React.ReactNode;
}

export interface NodeDataProps {
  id: string;
  label: string;
  title: string;
  description: string;
  node_category: "component" | "note" | "code" | "anchor";
  node_type: string;
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
  content_type: "markdown";
  content_header: string;
  content_data: string;
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

export interface NoteProps {
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

interface FolderProps {
  id: string;
  name: string;
  created_by: string;
  created_on: string;
  last_edit?: string;
  notes: Array<NoteProps>;
}

interface NoteContextProps {
  folders: Array<FolderProps>;
  folderDispatch: React.Dispatch<NotesActionProps>;
  flowSelectedNode: string;
  setFlowSelectedNode: React.Dispatch<React.SetStateAction<string>> | any;
  flowSelectedFolder: string;
  setFlowSelectedFolder: React.Dispatch<React.SetStateAction<string>> | any;
  openTextPanel: boolean;
  setOpenTextPanel: React.Dispatch<React.SetStateAction<boolean>> | any;
}

export const NoteContext = createContext({} as NoteContextProps);

export const NoteContextProvider = ({ children }: NoteContextProviderProps) => {
  const [folders_, setFolders] = useState<any>(noteStore);
  const [folders, folderDispatch] = useReducer<Reducer<any, NotesActionProps>>(
    noteReducer,
    noteStore
  );

  const [flowSelectedNode, setFlowSelectedNode] = useState<string>("");
  const [flowSelectedFolder, setFlowSelectedFolder] = useState<string>("");

  const [openTextPanel, setOpenTextPanel] = useState<boolean>(false);

  // console.log(folders);
  return (
    <NoteContext.Provider
      value={{
        folders,
        folderDispatch,
        flowSelectedNode,
        setFlowSelectedNode,
        flowSelectedFolder,
        setFlowSelectedFolder,
        openTextPanel,
        setOpenTextPanel,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
