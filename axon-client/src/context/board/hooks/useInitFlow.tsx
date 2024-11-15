import { useEdgesState, useNodesState } from "reactflow";
import { NodeEntity } from "src/domain/node/node.entity";
import { EdgeEntity } from "src/domain/edge/edge.entity";

export function useInitFlow(
  initialNodes: NodeEntity[],
  initialEdges: EdgeEntity[]
) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes ?? []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges ?? []);

  return { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange };
}
