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
  Background,
  BackgroundVariant,
} from "react-flow-renderer";
import { CustomComponentNode } from "../Node";
import { NoteContext } from "../../context/notes";
import CustomEdge from "../Node/CustomEdge";
import NodePanel from "../NodePanel";
import FolderContext from "src/context/folder";
import AppContext from "src/context/app";
import { ThemeColors } from "src/shared/themes";

const FlowTreeDiv = styled.div`
  height: calc(100vh - 40px);
  width: 100%;
  margin: auto;
  /* padding-top: 10px;
  padding-bottom: 10px; */
  /* background-color: #2b2929; */
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
  const { isSideNavExpanded, appSettings } = useContext(AppContext);
  const { note, nodePanel } = useContext(NoteContext);
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
    setEdges((els: any) =>
      addEdge({ ...params, type: "buttonedge", animated: true }, els)
    );

  const onLoad = (reactFlowInstance: any) =>
    reactFlowInstance.setTransform({
      x: 0,
      y: 0,
      zoom: 1,
    });

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
          onlyRenderVisibleElements={true}
        >
          {appSettings.grid && (
            <Background
              id="2"
              gap={50}
              offset={1}
              color={ThemeColors.bgHighlight2}
              variant={BackgroundVariant.Lines}
            />
          )}
        </ReactFlow>
        <Controls style={{ left: isSideNavExpanded ? "320px" : "0px" }} />
      </ReactFlowProvider>
      <NodePanel expanded={nodePanel.toogle} />
    </FlowTreeDiv>
  );
};

export default FlowTree;
