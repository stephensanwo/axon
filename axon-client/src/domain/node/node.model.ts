import { XYPosition } from "reactflow";
import { NodeContentTypes, NodeEntity, NodeTypes } from "./node.entity";
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
  previousNode: NodeEntity | null;
  position?: XYPosition;
}

export class NodeModel {
  node = {} as NodeEntity;
  constructor({
    board_id,
    node_id,
    node_type,
    isSubFlow,
    parentNode,
    node_content_type,
    previousNode,
    position,
  }: NodeModelParams) {
    let id = node_id ?? uid("node");
    this.node.id = id;
    this.node.data.node_id = id;
    this.node.data.board_id = board_id;
    this.node.type = node_type;
    this.node.extent = isSubFlow ? "parent" : undefined;
    this.node.parentId = isSubFlow && parentNode ? parentNode : undefined;
    this.buildNodeDimensions(node_type);
    this.buildNodePosition(previousNode, position);
  }

  async init() {
    await this.buildNodeStyles();
  }

  private buildContentType() {
    switch (this.node.type) {
      case "box":
        this.node.data.content_type = "markdown";
        break;
      case "block":
        this.node.data.content_type = "block_editor";
        break;
      case "icon":
        this.node.data.content_type = "json_editor";
        break;
      case "text":
        this.node.data.content_type = "markdown";
        break;
      default:
        this.node.data.content_type = null;
    }
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
}
