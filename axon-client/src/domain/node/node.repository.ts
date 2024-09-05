import { nodeDb } from "./node.db";
import { NodeEntity } from "./node.entity";

interface INodeRepository {}

export class NodeRepository implements INodeRepository {
  nodeDb = nodeDb;

  constructor() {
    this.nodeDb.client.createIndex({
      index: { fields: ["name"] },
    });
    this.setupChangeListener();
  }

  async findNodesByBoardId(
    board_id: string
  ): Promise<PouchDB.Core.ExistingDocument<NodeEntity>[]> {
    const doc = await this.nodeDb.client.find({
      selector: {
        board_id: { $eq: board_id },
      },
    });
    return doc.docs as PouchDB.Core.ExistingDocument<NodeEntity>[];
  }

  // Method to setup changes listener
  public setupChangeListener() {
    // TODO Setup indexing for search
    // this.foldersDb.client
    //   .changes<DocumentFolderEntity>({
    //     since: "now",
    //     live: true,
    //     include_docs: true,
    //   })
    //   .on("change", (change) => {
    //     console.log("Change detected:", change);
    //     // Handle the change event
    //     searchService.addDocumentFolderToIndex(
    //       change.doc as DocumentFolderEntity
    //     );
    //   })
    //   .on("error", (err) => {
    //     console.error("Error in changes listener:", err);
    //   });
    // this.filesDb.client
    //   .changes<DocumentFileEntity>({
    //     since: "now",
    //     live: true,
    //     include_docs: true,
    //   })
    //   .on("change", (change) => {
    //     console.log("Change detected:", change);
    //     // Handle the change event
    //   })
    //   .on("error", (err) => {
    //     console.error("Error in changes listener:", err);
    //   });
  }
}

export const nodeRepository = new NodeRepository();
