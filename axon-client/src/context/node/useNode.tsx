import { Node, useReactFlow, XYPosition } from "@xyflow/react";
import {
  NodeContentTypes,
  NodeEntity,
  NodeTypes,
} from "src/domain/node/node.entity";
import { uid } from "src/common/uid";
import { useMemo } from "react";
import { NodeModel } from "src/domain/node/node.model";
import { useBoard } from "src/context/board/hooks/useBoard";
import { useNodeStore } from "./node.store";
import { useInitFlow } from "../board/hooks/useInitFlow";
export function useNode(): {
  createNewNode: (
    node_type: NodeTypes,
    node_content_type: NodeContentTypes | null,
    position?: XYPosition,
    node_id?: string,
    isSubFlow?: boolean,
    parentNode?: string
  ) => void;
} {
  const { board } = useBoard();
  const flow = useReactFlow();
  const nodes = flow.getNodes();
  const edges = flow.getEdges();

  console.log("nodes", nodes);
  console.log("edges", edges);
  const { selectedNode } = useNodeStore();

  const node = useMemo(() => {
    // const node = nodes?.find((node) => node.id === selectedNode?.id);
    const node = flow.getNode(selectedNode?.id!!);
    return node;
  }, [nodes, selectedNode]);

  /**
   * Create new node
   * * creates a new node based on type and content type
   */
  function createNewNode(
    node_type: NodeTypes,
    node_content_type: NodeContentTypes | null,
    position?: XYPosition,
    node_id?: string,
    isSubFlow?: boolean,
    parentNode?: string
  ): void {
    const previousNode = nodes.length > 0 ? nodes[nodes.length - 1] : null;
    // const type = node_type ?? settings.data?.boardSettings.default_node_type;
    const node = new NodeModel({
      board_id: board?.data?.board?.id!!,
      node_id: node_id ?? uid("node"),
      node_type: node_type,
      isSubFlow: isSubFlow,
      parentNode: parentNode,
      node_content_type: node_content_type,
      previousNode: previousNode as NodeEntity,
      position: position,
    });
    node.init();
    // flow.addNodes([node.node]);
    flow.setNodes((nds: Node[]) => nds.concat(node.node));
    console.log(node);
  }

  return {
    createNewNode,
  };
}
