import { boardsDb } from "./board.db";
import { BoardEntity } from "./board.entity";

interface IBoardRepository {}

export class BoardRepository implements IBoardRepository {
  boardsDb = boardsDb;

  constructor() {
    this.boardsDb.client.createIndex({
      index: { fields: ["name"] },
    });
    this.setupChangeListener();
  }

  async findBoardMatchByName(
    name: string
  ): Promise<PouchDB.Find.FindResponse<{}>> {
    const doc = await this.boardsDb.client.find({
      selector: {
        name: { $regex: `^${name}` },
      },
      sort: ["name"],
    });
    return doc;
  }

  async findBoardIdByName(name: string): Promise<string> {
    const doc = await this.boardsDb.client.find({
      selector: {
        name: { $eq: name },
      },
      sort: ["name"],
      limit: 1,
    });
    return doc.docs[0]?._id || "";
  }

  async findBoardByProjectId(
    projectId: string
  ): Promise<PouchDB.Core.ExistingDocument<BoardEntity>[]> {
    const doc = await this.boardsDb.client.find({
      selector: {
        projectId: { $eq: projectId },
      },
    });
    return doc.docs as PouchDB.Core.ExistingDocument<BoardEntity>[];
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

export const boardRepository = new BoardRepository();
