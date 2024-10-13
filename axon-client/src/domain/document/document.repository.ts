import { foldersDb, filesDb } from "./document.db";
import { DocumentEntityKeys, DocumentFileEntity } from "./document.entity";

interface IDocumentRepository {}

export class DocumentRepository implements IDocumentRepository {
  foldersDb = foldersDb;
  filesDb = filesDb;

  constructor() {
    this.foldersDb.client.createIndex({
      index: { fields: ["doc_key", "name"] },
    });
    this.setupChangeListener();
  }

  async findDocumentMatchByName(
    name: string
  ): Promise<PouchDB.Find.FindResponse<{}>> {
    const doc = await this.foldersDb.client.find({
      selector: {
        doc_key: { $eq: DocumentEntityKeys.FOLDER },
        name: { $regex: `^${name}` },
      },
      sort: ["name"],
    });
    return doc;
  }

  async findDocumentIdByName(name: string): Promise<string> {
    const doc = await this.foldersDb.client.find({
      selector: {
        doc_key: { $eq: DocumentEntityKeys.FOLDER },
        name: { $eq: name },
      },
      sort: ["name"],
      limit: 1,
    });
    return doc.docs[0]?._id || "";
  }

  async findDocumentFilesByFolderId(
    folderId: string
  ): Promise<PouchDB.Core.ExistingDocument<DocumentFileEntity>[]> {
    const doc = await this.filesDb.client.find({
      selector: {
        doc_key: { $eq: DocumentEntityKeys.FILE },
        parentId: { $eq: folderId },
      },
    });
    return doc.docs as PouchDB.Core.ExistingDocument<DocumentFileEntity>[];
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

export const documentRepository = new DocumentRepository();
