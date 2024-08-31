import { edgeDefaultsDb } from "./edge.db";
import { defaultEdgeStyles } from "./edge.defaults";
import { UpdateEdgeStyleDto } from "./edge.dto";
import { EdgeStyle, EdgeStyleEntity } from "./edge.entity";

export class EdgeService {
  edgeDefaultsDb = edgeDefaultsDb;

  constructor() {}

  public async createDefaultEdgeStyles(): Promise<boolean> {
    const existingStyles =
      await this.edgeDefaultsDb.getAllRecords<EdgeStyleEntity>({
        startkey: "edge_defaults_",
        endkey: "edge_defaults_\uffff",
      });
    if (existingStyles.length > 0) {
      return true;
    }
    try {
      await this.edgeDefaultsDb.createRecord<EdgeStyle>(defaultEdgeStyles);
      return true;
    } catch (error) {
      throw new Error(`Error creating default edge styles - ${error}`);
    }
  }

  public async getEdgeStyles(): Promise<EdgeStyleEntity> {
    try {
      const edgeStyles =
        await this.edgeDefaultsDb.getAllRecords<EdgeStyleEntity>({
          startkey: "edge_defaults_",
          endkey: "edge_defaults_\uffff",
        });
      return edgeStyles[0];
    } catch (err) {
      console.error(err);
      throw new Error("Error fetching edge styles");
    }
  }

  public async updateEdgeStyles(entity: UpdateEdgeStyleDto): Promise<boolean> {
    try {
      await this.edgeDefaultsDb.updateRecord<UpdateEdgeStyleDto>(entity);
      return true;
    } catch (error) {
      throw new Error(`Error updating edge styles - ${error}`);
    }
  }
}

const edgeService = new EdgeService();
export default edgeService;
