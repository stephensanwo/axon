import { useContext } from "react";
import ReactFlow, { ReactFlowProvider } from "reactflow";
import CustomEdge from "../Edge/CurveEdge";
import { edgeTypes } from "../Edge/Types";
import { AxonControls } from "./Controls";
import { nodeTypes } from "../Node/NodeTypes";
import { ReactFlowInstance } from "reactflow";
import PublicNoteContext from "src/context/public";
import { FlowTreeDiv } from "./styles";

const PublicFlowTree = () => {
  return (
    <FlowTreeDiv onMouseDown={(e: any) => e.preventDefault()}>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </FlowTreeDiv>
  );
};

const Flow = () => {
  const { interactiveNode, nodes, edges, onNodesChange, onEdgesChange } =
    useContext(PublicNoteContext);

  const onInit = (reactFlowInstance: ReactFlowInstance) => {
    reactFlowInstance.zoomTo(1);
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      connectionLineComponent={CustomEdge}
      //   onConnect={onConnect}
      //   onConnectStart={onConnectStart}
      //   onConnectEnd={onConnectEnd}
      onInit={onInit}
      // snapToGrid={false}
      // snapGrid={[15, 15]}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onlyRenderVisibleElements={true}
      //   onNodeDragStop={(event: React.MouseEvent, node: INode) => {
      //     const updatedNode = interactiveNode.current;
      //     updatedNode.position = node.position;
      //     console.log("Updated Node", updatedNode);
      //     handleSendNodeEvent(
      //       nodeEvents.UPDATE_NODE,
      //       JSON.stringify(updatedNode)
      //     );
      //   }}
      //   edgesUpdatable={!globalNodeMutex}
      //   edgesFocusable={!globalNodeMutex}
      nodesDraggable={false}
      //   nodesConnectable={!globalNodeMutex}
      //   nodesFocusable={!globalNodeMutex}
      //   draggable={!globalNodeMutex}
      //   panOnDrag={!globalNodeMutex}
      //   elementsSelectable={!globalNodeMutex}
    ></ReactFlow>
  );
};

export default PublicFlowTree;
