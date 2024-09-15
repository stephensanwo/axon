import { uid } from "src/common/uid";
import { boardRepository } from "../board/board.repository";
import { defaultNodeStyles } from "../node/node.defaults";
import {
  NodeEntity,
  NodeStyle,
  NodeStyleEntity,
  NodeTypes,
} from "../node/node.entity";
import { nodeStylesDb } from "./node.db";
import { GetNodesResponseDto, UpdateNodeStyleDto } from "./node.dto";
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
        startkey: "node-styles_",
        endkey: "node-styles_\uffff",
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
          startkey: "node-styles_",
          endkey: "node-styles_\uffff",
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

  public async getNodes(boardName: string): Promise<GetNodesResponseDto> {
    try {
      const board_id = await boardRepository.findBoardIdByName(boardName);

      if (!board_id) {
        return {
          board_id: null,
          nodes: [],
        };
      }
      const nodes = await nodeRepository.findNodesByBoardId(board_id);
      return {
        board_id,
        nodes,
      };
    } catch (err) {
      console.error(err);
      throw new Error("Error fetching nodes");
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
