import { XYPosition } from "reactflow";
import {
  NodeContentTypes,
  NodeEntity,
  NodeStyleEntity,
  NodeTypes,
} from "./node.entity";
import { uid } from "src/common/uid";
import nodeService from "./node.service";
import nodeMetadata from "./node.meta";

interface NodeModelParams {
  board_id: string;
  node_id: string;
  node_type: NodeTypes;
  isSubFlow?: boolean;
  parentNode?: string;
  node_content_type?: NodeContentTypes | null;
  node_content_type_id?: string | null;
  previousNode: NodeEntity | null;
  position?: XYPosition;
}

export class NodeModel {
  node: NodeEntity;

  constructor({
    board_id,
    node_id,
    node_type,
    isSubFlow,
    parentNode,
    node_content_type,
    node_content_type_id,
    previousNode,
    position,
  }: NodeModelParams) {
    let id = node_id ?? uid("node");
    const nodeContentData = nodeMetadata.getNodeContentData(node_type);
    this.node = {
      id: id,
      type: node_type,
      data: {
        node_id: id,
        board_id: board_id,
        content_type: node_content_type ?? null,
        content_type_id: node_content_type_id ?? "",
        content_data: nodeContentData,
        node_styles: {} as NodeStyleEntity,
      },
      position: { x: 0, y: 0 },
      width: 0,
      height: 0,
    };
    this.node.extent = isSubFlow ? "parent" : undefined;
    this.node.parentId = isSubFlow && parentNode ? parentNode : undefined;

    this.buildNodeDimensions(node_type);
    this.buildNodePosition(previousNode, position);
    this.buildNodeStyles();
  }

  async init() {
    await this.buildNodeStyles();
  }

  private async buildNodeStyles() {
    const defaultNodeStyles = await nodeService.getNodeStyles();
    this.node.data.node_styles = {
      ...defaultNodeStyles,
    };
  }

  private buildNodeDimensions(node_type: NodeTypes) {
    const { nodeWidth, nodeHeight } = nodeMetadata.getNodeDimensions(node_type);
    this.node.position = {
      x: this.node.position.x,
      y: this.node.position.y,
    };
    this.node.width = nodeWidth;
    this.node.height = nodeHeight;
  }

  private buildNodePosition(
    previousNode: NodeEntity | null,
    position?: XYPosition
  ) {
    const newXPosition = previousNode
      ? previousNode.position.x + 100 + 280
      : window.innerWidth / 2.5;
    const newYPosition = previousNode
      ? previousNode.position.y + 0
      : window.outerHeight / 2.5;

    this.node.position = {
      x: position?.x ?? newXPosition,
      y: position?.y ?? newYPosition,
    };
  }

  get(): NodeEntity {
    return this.node;
  }
}
