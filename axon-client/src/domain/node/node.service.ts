import { defaultNodeStyles } from "../node/node.defaults";
import {
  NodeEntity,
  NodeEntityKeys,
  NodeStyle,
  NodeStyleEntity,
  NodeTypes,
} from "../node/node.entity";
import { nodeStylesDb } from "./node.db";
import { UpdateNodeStyleDto } from "./node.dto";
import { nodeRepository } from "./node.repository";
import { NodeContentTypes } from "src/types/node";
import { XYPosition } from "reactflow";
import nodeMetadata from "./node.meta";

export class NodeService {
  nodeStylesDb = nodeStylesDb;
  constructor() {}

  public async createDefaultNodeStyles(): Promise<boolean> {
    const existingStyles =
      await this.nodeStylesDb.getAllRecords<NodeStyleEntity>({
        startkey: `${NodeEntityKeys.NODE_STYLES}_`,
        endkey: `${NodeEntityKeys.NODE_STYLES}_\uffff`,
      });
    if (existingStyles.length > 0) {
      return true;
    }
    try {
      await this.nodeStylesDb.createRecord<NodeStyle>(defaultNodeStyles);
      return true;
    } catch (error) {
      throw new Error(`Error creating default node styles - ${error}`);
    }
  }

  public async getNodeStyles(): Promise<NodeStyleEntity> {
    try {
      const nodeStyles = await this.nodeStylesDb.getAllRecords<NodeStyleEntity>(
        {
          startkey: `${NodeEntityKeys.NODE_STYLES}_`,
          endkey: `${NodeEntityKeys.NODE_STYLES}_\uffff`,
        }
      );
      return nodeStyles[0];
    } catch (err) {
      console.error(err);
      throw new Error("Error fetching node styles");
    }
  }

  public async updateNodeStyles(entity: UpdateNodeStyleDto): Promise<boolean> {
    try {
      await this.nodeStylesDb.updateRecord<UpdateNodeStyleDto>(entity);
      return true;
    } catch (error) {
      throw new Error(`Error updating node styles - ${error}`);
    }
  }

  public async getNodes(boardId: string): Promise<NodeEntity[]> {
    try {
      const nodes = await nodeRepository.findNodesByBoardId(boardId);
      return nodes;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  public async buildNodeEntity({
    board_id,
    node_id,
    previousNode,
    position,
    node_type,
  }: {
    board_id: string;
    node_id: string;
    node_type: NodeTypes;
    isSubFlow?: boolean;
    parentNode?: string;
    node_content_type?: NodeContentTypes;
    previousNode: NodeEntity | null;
    position?: XYPosition;
  }) {
    const node = {} as NodeEntity;

    node.id = node_id;
    node.data.board_id = board_id;

    const defaultNodeStyles = await this.getNodeStyles();
    node.data.node_styles = {
      ...defaultNodeStyles,
    };

    const { nodeWidth, nodeHeight } = nodeMetadata.getNodeDimensions(node_type);
    node.height = nodeHeight;
    node.width = nodeWidth;

    node.type = node_type;

    const newXPosition = previousNode
      ? previousNode.position.x + 100 + 280
      : window.innerWidth / 2.5;
    const newYPosition = previousNode
      ? previousNode.position.y + 0
      : window.outerHeight / 2.5;

    node.position = {
      x: position?.x ?? newXPosition,
      y: position?.y ?? newYPosition,
    };
  }
}

const nodeService = new NodeService();
export default nodeService;
