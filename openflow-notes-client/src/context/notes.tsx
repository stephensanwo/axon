import React, { createContext, useState } from "react";
import noteStore from "./notes.json";

interface NoteContextProviderProps {
  children: React.ReactNode;
}

export interface NodeProps {
  id: string;
  type: string;
  data: {
    id: string;
    label: string;
    title: string;
    description: string;
    node_category: "component" | "note" | "code" | "simple-node";
    node_type: string;
  };
  position: {
    x: number;
    y: number;
  };
  code?: string;
  note?: string;
  className: string;
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
  note: string;
}
interface FolderProps {
  id: string;
  name: string;
  created_by: string;
  created_on: string;
  last_edit?: string;
  link: string;
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

export const NoteContext = createContext({} as NoteContextProps);

export const NoteContextProvider = ({ children }: NoteContextProviderProps) => {
  const [folders, setFolders] = useState<any>(noteStore);
  const [flowSelectedNode, setFlowSelectedNode] = useState<string>("");
  const [openTextPanel, setOpenTextPanel] = useState<boolean>(false);
  return (
    <NoteContext.Provider
      value={{
        folders,
        setFolders,
        flowSelectedNode,
        setFlowSelectedNode,
        openTextPanel,
        setOpenTextPanel,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
