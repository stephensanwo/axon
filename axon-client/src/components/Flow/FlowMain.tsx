import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Node,
  useEdgesState,
  useNodesState,
  Viewport,
} from "@xyflow/react";
import { useNodeEvents } from "src/hooks/node/useNodeEvents";
import { edgeTypes } from "../Edge/Types";
import NodeContext from "src/context/node";
import { nodeTypes } from "../Node/NodeTypes";
import { ReactFlowInstance } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useNoteContext } from "src/hooks/notes/useNoteContext";
import { FlowProps } from "./index.types";

const FlowMain = ({ initialNodes, initialEdges }: FlowProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes ?? []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges ?? []);

  //   const {
  //     onConnect,
  //     onConnectStart,
  //     onConnectEnd,
  //     onNodeDragStart,
  //     onNodeDragStop,
  //   } = useNodeEvents();

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
      //   onConnect={onConnect}
      //   onConnectStart={onConnectStart}
      //   onConnectEnd={onConnectEnd}
      //   onInit={onInit}
      snapToGrid={false}
      snapGrid={[15, 15]}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onlyRenderVisibleElements={true}
      //   onNodeDragStart={(event: any, node: Node, nodes: Node[]) =>
      //     onNodeDragStart(event, node, nodes)
      //   }
      //   onNodeDragStop={(event: any, node: Node, nodes: Node[]) =>
      //     onNodeDragStop(event, node, nodes)
      //   }
      // onNodeDragStop={(event: React.MouseEvent, node: INode) => {}}
      // edgesUpdatable={!globalNodeMutex}
      // edgesFocusable={!globalNodeMutex}
      // nodesFocusable={!globalNodeMutex}
      //   nodesDraggable={!globalNodeMutex}
      //   nodesConnectable={!globalNodeMutex}
      //   draggable={!globalNodeMutex}
      //   panOnDrag={!globalNodeMutex}
      //   elementsSelectable={!globalNodeMutex}
      defaultViewport={defaultViewport}
      zoomOnDoubleClick={false}
      // onDoubleClickCapture={() => setSelectedNode(null)}
    >
      {/* {noteSettingsOptions.grid && (
        <Background
          id="2"
          gap={50}
          offset={1}
          color={ThemeColors.bgHighlight2}
          variant={BackgroundVariant.Lines}
        />
      )} */}
    </ReactFlow>
  );
};

export default FlowMain;
