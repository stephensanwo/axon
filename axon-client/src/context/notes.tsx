import React, { createContext, useEffect, useRef, useState } from "react";
import {
  INote,
  INoteAction,
  INoteSettingsOptions,
  INoteTheme,
  NoteMenuTypes,
} from "src/types/notes";
import { useNodesState } from "reactflow";
import { useEdgesState } from "reactflow";
import { IEdge } from "src/types/edge";
import {
  INode,
  NodeMenuEvents,
  NodeStyleProps,
  NodeThemes,
} from "src/types/node";
import { useNoteQuery } from "src/hooks/notes/useNoteQuery";
import { useInitNotes } from "src/hooks/notes/useInitNotes";
import { UseQueryResult } from "@tanstack/react-query";
// import useEventSocket from "src/hooks/events/useEventSocket";
import { Message } from "src/types/event";
import { useNetworkState, useIdle } from "@uidotdev/usehooks";
import { noteThemePalette } from "src/theme/noteTheme";

interface NoteProviderProps {
  children: React.ReactNode;
}

interface NoteContextProps {
  note: INote;
  noteDispatch: React.Dispatch<INoteAction>;
  noteQuery: UseQueryResult<INote, unknown>;
  selectedNode: INode | null;
  setSelectedNode: React.Dispatch<React.SetStateAction<INode | null>>;
  interactiveNode: React.MutableRefObject<INode>;
  nodes: INode[];
  setNodes: any;
  onNodesChange: any;
  edges: IEdge[];
  setEdges: any;
  onEdgesChange: any;
  noteMenu: NoteMenuTypes | null;
  setNoteMenu: React.Dispatch<React.SetStateAction<NoteMenuTypes | null>>;
  publicId: string | null;
  setPublicId: React.Dispatch<React.SetStateAction<string | null>>;
  // isAutoSave: boolean;
  // sendMessage: (message: Message) => void;
  noteTheme: INoteTheme;
  setNoteTheme: React.Dispatch<React.SetStateAction<INoteTheme>>;
  defaultNodeStyles: NodeStyleProps;
  setDefaultNodeStyles: React.Dispatch<React.SetStateAction<NodeStyleProps>>;
  defaultNodeTheme: NodeThemes;
  setDefaultNodeTheme: React.Dispatch<React.SetStateAction<NodeThemes>>;
  noteSettingsOptions: INoteSettingsOptions;
  setNoteSettingsOptions: React.Dispatch<
    React.SetStateAction<INoteSettingsOptions>
  >;
}

export const NoteContext = createContext({} as NoteContextProps);

export const NoteProvider = ({ children }: NoteProviderProps) => {
  // const { isAutoSave, sendMessage } = useEventSocket();
  const { noteData, publicNoteId, noteQuery } = useNoteQuery();
  const [nodes, setNodes, onNodesChange] = useNodesState([] as INode[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as IEdge[]);
  const [selectedNode, setSelectedNode] = useState<INode | null>({} as INode);
  const interactiveNode = useRef<INode>({} as INode);
  const [publicId, setPublicId] = useState<string | null>(null);
  const [noteMenu, setNoteMenu] = useState<NoteMenuTypes | null>(null);
  const [noteTheme, setNoteTheme] = useState<INoteTheme>(noteThemePalette);

  const [defaultNodeStyles, setDefaultNodeStyles] = useState<NodeStyleProps>({
    background_color: "#DAEF68",
    border_color: "",
    font_color: "#000000",
    font_weight: 400,
    font_alignment: "left",
    font_size: 16,
    border_style: "solid",
    border_radius: 8,
  });

  const [defaultNodeTheme, setDefaultNodeTheme] = useState<NodeThemes>({
    style: "background-fill",
    color: "#DAEF68",
  });

  const [noteSettingsOptions, setNoteSettingsOptions] =
    useState<INoteSettingsOptions>({
      grid: false,
      default_node_settings: {
        node_type: "text",
      },
    });

  const { note, noteDispatch } = useInitNotes(
    noteData,
    setNodes,
    setEdges,
    publicNoteId,
    setPublicId
  );
  console.log("Note", note);
  // useEffect(() => {
  //   console.log("Updating Nodes in Context", nodes);
  //   if (nodes) {
  //     noteDispatch({
  //       type: "UPDATE_NODES",
  //       payload: nodes as INode[],
  //     });
  //   }
  // }, [nodes]);

  // useEffect(() => {
  //   console.log("Updating Edges in Context", edges);
  //   if (edges) {
  //     noteDispatch({
  //       type: "UPDATE_EDGES",
  //       payload: edges as IEdge[],
  //     });
  //   }
  // }, [edges]);

  // const network = useNetworkState();
  // const idle = useIdle(5000);

  // const [time, setTime] = useState(5); // Initial time in seconds

  // useEffect(() => {
  //   let timer: any;

  //   const sendPostRequest = async () => {
  //     // Replace this with your actual POST request code
  //     // if (network.online === true && idle === false) {
  //     //   console.log("Sending POST request...");
  //     //   console.log("Note: ", note);
  //     //   const updatedNote = note;
  //     //   updatedNote.nodes = nodes;
  //     //   updatedNote.edges = edges;
  //     //   sendMessage(updatedNote);
  //     // } else {
  //     //   console.log("Not sending POST request...");
  //     // }
  //   };

  //   timer = setInterval(() => {
  //     if (time > 0) {
  //       setTime((prevTime) => prevTime - 1);
  //     } else {
  //       sendPostRequest();
  //       setTime(5); // Reset the timer to 5 seconds
  //     }
  //   }, 1000); // Update every second

  //   return () => {
  //     clearInterval(timer); // Clear the interval on component unmount
  //   };
  // }, [time]);

  return (
    <NoteContext.Provider
      value={{
        note,
        noteDispatch,
        noteQuery,
        selectedNode,
        setSelectedNode,
        interactiveNode,
        nodes: nodes as INode[],
        setNodes,
        onNodesChange,
        edges: edges as IEdge[],
        setEdges,
        onEdgesChange,
        noteMenu,
        setNoteMenu,
        publicId,
        setPublicId,
        // isAutoSave,
        // sendMessage,
        noteTheme,
        setNoteTheme,
        defaultNodeStyles,
        setDefaultNodeStyles,
        defaultNodeTheme,
        setDefaultNodeTheme,
        noteSettingsOptions,
        setNoteSettingsOptions,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
