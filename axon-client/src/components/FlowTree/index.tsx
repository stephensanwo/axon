import { useContext } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Node,
  Viewport,
} from "reactflow";
import { NoteContext } from "../../context/notes";
import AppContext from "src/context/app";
import { ThemeColors } from "src/shared/themes";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { edgeTypes } from "../Edge/Types";
import { AxonControls } from "./Controls";
import NodeContext from "src/context/node";
import { nodeTypes } from "../Node/NodeTypes";
import { ReactFlowInstance } from "reactflow";
import { FlowTreeDiv } from "./styles";
import "reactflow/dist/style.css";
import { useNoteContext } from "src/hooks/notes/useNoteContext";

const FlowTree = () => {
  return (
    <FlowTreeDiv onMouseDown={(e: any) => e.preventDefault()}>
      <Flow />
      <AxonControls />
    </FlowTreeDiv>
  );
};

const Flow = () => {
  const { noteSettingsOptions } = useNoteContext();
  const { nodes, edges, onNodesChange, onEdgesChange, setSelectedNode } =
    useContext(NoteContext);
  const { globalNodeMutex } = useContext(NodeContext);
  const {
    onConnect,
    onConnectStart,
    onConnectEnd,
    onNodeDragStart,
    onNodeDragStop,
  } = useNodeEvents();

  const onInit = (reactFlowInstance: ReactFlowInstance) => {
    reactFlowInstance.zoomTo(1);
  };

  const defaultViewport: Viewport = { x: 0, y: 0, zoom: 1 };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      onInit={onInit}
      snapToGrid={false}
      snapGrid={[15, 15]}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onlyRenderVisibleElements={true}
      onNodeDragStart={(event: any, node: Node, nodes: Node[]) =>
        onNodeDragStart(event, node, nodes)
      }
      onNodeDragStop={(event: any, node: Node, nodes: Node[]) =>
        onNodeDragStop(event, node, nodes)
      }
      // onNodeDragStop={(event: React.MouseEvent, node: INode) => {}}
      // edgesUpdatable={!globalNodeMutex}
      // edgesFocusable={!globalNodeMutex}
      // nodesFocusable={!globalNodeMutex}
      nodesDraggable={!globalNodeMutex}
      nodesConnectable={!globalNodeMutex}
      draggable={!globalNodeMutex}
      panOnDrag={!globalNodeMutex}
      elementsSelectable={!globalNodeMutex}
      defaultViewport={defaultViewport}
      zoomOnDoubleClick={false}
      // onDoubleClickCapture={() => setSelectedNode(null)}
    >
      {noteSettingsOptions.grid && (
        <Background
          id="2"
          gap={50}
          offset={1}
          color={ThemeColors.bgHighlight2}
          variant={BackgroundVariant.Lines}
        />
      )}
    </ReactFlow>
  );
};

export default FlowTree;
