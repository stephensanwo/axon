import { XYPosition } from "reactflow";
import {
  NodeContentTypes,
  NodeEntity,
  NodeTypes,
} from "src/domain/node/node.entity";
import { useProjectContext } from "../project/hooks/useProjectContext";
import { uid } from "src/common/uid";
import { useMemo } from "react";
import { useBoardContext } from "../board/hooks/useBoardContext";
import { useSettingsContext } from "../settings/hooks/useSettingsContext";
import nodeMetadata from "src/domain/node/node.meta";
import nodeService from "src/domain/node/node.service";
import { NodeModel } from "src/domain/node/node.model";

export function useNodeEvents(): {
  node: NodeEntity | undefined;
  createNewNode: (
    node_type: NodeTypes,
    node_content_type: NodeContentTypes | null,
    position?: XYPosition
  ) => void;
} {
  const {
    boardState: {
      nodes: { data: nodes, selectedNode },
      board,
    },
  } = useBoardContext();
  const {
    settingsState: { settings },
  } = useSettingsContext();

  const node = useMemo(() => {
    const node = nodes?.find((node) => node.id === selectedNode?.id);
    return node;
  }, [nodes, selectedNode]);

  /**
   * Create new node
   * * creates a new node based on type and content type
   */
  const createNewNode = (
    node_type: NodeTypes,
    node_content_type: NodeContentTypes | null,
    position?: XYPosition,
    node_id?: string,
    isSubFlow?: boolean,
    parentNode?: string
  ): void => {
    const previousNode = nodes.length > 0 ? nodes[nodes.length - 1] : null;
    const type = node_type ?? settings.data?.boardSettings.default_node_type;
    const node = new NodeModel({
      board_id: board?.id!!,
      node_id: node_id ?? uid("node"),
      node_type: type,
      isSubFlow: isSubFlow,
      parentNode: parentNode,
      node_content_type: node_content_type,
      previousNode: previousNode,
      position: position,
    });
    node.init();

    newNode = {
      id: id,
      type: type,
      data: {
        user_id: note?.user_id,
        folder_id: note?.folder_id,
        note_id: note?.note_id,
        node_id: id,
        title: "",
        description: "New Text",
        icon: {
          name: "OverflowMenuHorizontal",
          size: 16,
        } as INodeIcon,
        contentType: node_content_type,
        position: {
          x: position?.x ?? newX,
          y: position?.y ?? newY,
        } as XYPosition,
        width: nodeWidth,
        height: nodeHeight,
      } as NodeDataProps,
      position: {
        x: position?.x ?? newX,
        y: position?.y ?? newY,
      },
      extent: isSubFlow ? "parent" : undefined,
      parentNode: isSubFlow && parentNode ? parentNode : undefined,
    };
  };

  return {
    createNewNode,
  };
}
