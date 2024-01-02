import React, { createContext, useRef, useState } from "react";
import { INote, INoteAction } from "src/types/notes";
import { useNodesState } from "reactflow";
import { useEdgesState } from "reactflow";
import { IEdge } from "src/types/edge";
import { INode, NodeMenuEvents } from "src/types/node";
import { useInitNotes } from "src/hooks/notes/useInitNotes";
import { UseQueryResult } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { usePublicNoteQuery } from "src/hooks/public/usePublicNoteQuery";

interface PublicPublicProps {
  children: React.ReactNode;
}

interface PublicNoteContextProps {
  note: INote;
  noteDispatch: React.Dispatch<INoteAction>;
  noteQuery: UseQueryResult<INote, unknown>;
  selectedNode: INode;
  setSelectedNode: React.Dispatch<React.SetStateAction<INode>>;
  interactiveNode: React.MutableRefObject<INode>;
  nodes: INode[];
  setNodes: any;
  onNodesChange: any;
  edges: IEdge[];
  setEdges: any;
  onEdgesChange: any;
  viewSwitcher: "flow" | "stack";
  setViewSwitcher: React.Dispatch<React.SetStateAction<"flow" | "stack">>;
}

export const PublicNoteContext = createContext({} as PublicNoteContextProps);

export const PublicNoteProvider = ({ children }: PublicPublicProps) => {
  const { public_note_id } = useParams();
  const { noteData, noteQuery } = usePublicNoteQuery(public_note_id);
  const [nodes, setNodes, onNodesChange] = useNodesState([] as INode[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as IEdge[]);
  const [selectedNode, setSelectedNode] = useState<INode>({} as INode);
  const interactiveNode = useRef<INode>({} as INode);
  const [viewSwitcher, setViewSwitcher] = useState<"flow" | "stack">("flow");
  const { note, noteDispatch } = useInitNotes(noteData, setNodes, setEdges);

  return (
    <PublicNoteContext.Provider
      value={{
        note,
        noteDispatch,
        noteQuery,
        selectedNode,
        setSelectedNode,
        interactiveNode,
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
        viewSwitcher,
        setViewSwitcher,
      }}
    >
      {children}
    </PublicNoteContext.Provider>
  );
};

export default PublicNoteContext;
