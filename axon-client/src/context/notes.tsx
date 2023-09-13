import React, { createContext, useReducer, useState } from "react";
import noteReducer from "../reducers/notes";
import { Reducer } from "react";
import { INode, INodePanel, INote, INoteAction } from "src/types/notes";

interface NoteProviderProps {
  children: React.ReactNode;
}

interface NoteContextProps {
  note: INote;
  noteDispatch: React.Dispatch<INoteAction>;
  nodePanel: INodePanel;
  setNodePanel: React.Dispatch<React.SetStateAction<INodePanel>>;
  selectedNode: INode;
  setSelectedNode: React.Dispatch<React.SetStateAction<INode>>;
  interactiveNode: INode;
  setInteractiveNode: React.Dispatch<React.SetStateAction<INode>>;
}

export const NoteContext = createContext({} as NoteContextProps);

export const NoteProvider = ({ children }: NoteProviderProps) => {
  const [note, noteDispatch] = useReducer<Reducer<INote, INoteAction>>(
    noteReducer,
    {} as INote
  );

  const [nodePanel, setNodePanel] = useState<INodePanel>({
    toogle: false,
    styles: false,
    markdown: false,
    settings: false,
  });

  const [selectedNode, setSelectedNode] = useState<INode>({} as INode);
  const [interactiveNode, setInteractiveNode] = useState<INode>({} as INode);
  return (
    <NoteContext.Provider
      value={{
        note,
        noteDispatch,
        nodePanel,
        setNodePanel,
        selectedNode,
        setSelectedNode,
        interactiveNode,
        setInteractiveNode,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
