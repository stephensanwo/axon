import { edgeDb } from "./edge.db";
import { EdgeEntity } from "./edge.entity";

interface IEdgeRepository {}

export class EdgeRepository implements IEdgeRepository {
  edgeDb = edgeDb;

  constructor() {
    this.edgeDb.client.createIndex({
      index: { fields: ["name"] },
    });
    this.setupChangeListener();
  }

  async findEdgesByBoardId(
    board_id: string
  ): Promise<PouchDB.Core.ExistingDocument<EdgeEntity>[]> {
    const doc = await this.edgeDb.client.find({
      selector: {
        board_id: { $eq: board_id },
      },
    });
    return doc.docs as PouchDB.Core.ExistingDocument<EdgeEntity>[];
  }

  // Method to setup changes listener
  public setupChangeListener() {}
}

export const edgeRepository = new EdgeRepository();
