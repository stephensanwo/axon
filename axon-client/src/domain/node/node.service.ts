import { defaultNodeStyles } from "../node/node.defaults";
import { NodeStyle, NodeStyleEntity } from "../node/node.entity";
import { nodeDefaultsDb } from "./node.db";
import { UpdateNodeStyleDto } from "./node.dto";

export class NodeService {
  nodeDefaultsDb = nodeDefaultsDb;
  constructor() {}

  public async createDefaultNodeStyles(): Promise<boolean> {
    const existingStyles =
      await this.nodeDefaultsDb.getAllRecords<NodeStyleEntity>({
        startkey: "node_defaults_",
        endkey: "node_defaults_\uffff",
      });
    if (existingStyles.length > 0) {
      return true;
    }
    try {
      await this.nodeDefaultsDb.createRecord<NodeStyle>(defaultNodeStyles);
      return true;
    } catch (error) {
      throw new Error(`Error creating default node styles - ${error}`);
    }
  }

  public async getNodeStyles(): Promise<NodeStyleEntity> {
    try {
      const nodeStyles =
        await this.nodeDefaultsDb.getAllRecords<NodeStyleEntity>({
          startkey: "node_defaults_",
          endkey: "node_defaults_\uffff",
        });
      return nodeStyles[0];
    } catch (err) {
      console.error(err);
      throw new Error("Error fetching node styles");
    }
  }

  public async updateNodeStyles(entity: UpdateNodeStyleDto): Promise<boolean> {
    try {
      await this.nodeDefaultsDb.updateRecord<UpdateNodeStyleDto>(entity);
      return true;
    } catch (error) {
      throw new Error(`Error updating node styles - ${error}`);
    }
  }
}

const nodeService = new NodeService();
export default nodeService;
