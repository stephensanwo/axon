import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Controls,
  updateEdge,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import { CustomComponentNode } from "../Node";
import { NoteContext } from "../../context/notes";
import CustomEdge from "../Node/CustomEdge";
import TextPanel from "../TextPanel";
import FolderContext from "src/context/folder";
import AppContext from "src/context/app";

const FlowTreeDiv = styled.div`
  height: 85vh;
  width: 100%;
  margin: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  /* background-color: red; */
`;

const nodeTypes = {
  input: CustomComponentNode,
};
const edgeTypes = {
  buttonedge: CustomEdge,
};

const FlowTree = () => {
  // const { folderId, noteId } = useParams();
  // const noteData = useContext(NoteContext);
  // const folder = noteData.folders.filter((folder) => folder.id === folderId)[0];
  // const note = folder.notes.filter((note) => note.id === noteId)[0];
  const { isSideNavExpanded } = useContext(AppContext);
  const { note } = useContext(NoteContext);

  console.log(note);

  const [nodes, setNodes, onNodesChange] = useNodesState();
  const [edges, setEdges, onEdgesChange] = useEdgesState();

  //   const onElementsRemove = (elementsToRemove: object) =>
  //     setElements((els: any) => removeElements(elementsToRemove, els));

  //   const onEdgeUpdate = (oldEdge: any, newConnection: any) =>
  //     setEdges((els: any) => updateEdge(oldEdge, newConnection, els));

  useEffect(() => {
    setNodes(note?.nodes);
    setEdges(note?.edges);
  }, [note?.edges, note?.nodes, setEdges, setNodes]);

  const onConnect = (params: object) =>
    setEdges((els: any) => addEdge({ ...params, type: "buttonedge" }, els));

  const onLoad = (reactFlowInstance: any) =>
    reactFlowInstance.setTransform({
      x: 0,
      y: 0,
      zoom: 1,
    });

  console.log(edges);
  console.log(nodes);

  return (
    <FlowTreeDiv>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          connectionLineComponent={CustomEdge}
          onConnect={onConnect}
          onLoad={onLoad}
          snapToGrid={false}
          snapGrid={[15, 15]}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
        ></ReactFlow>
        <Controls style={{ left: isSideNavExpanded ? "320px" : "0px" }} />
      </ReactFlowProvider>
      {/* <TextPanel expanded={noteData.openTextPanel} /> */}
    </FlowTreeDiv>
  );
};

export default FlowTree;
