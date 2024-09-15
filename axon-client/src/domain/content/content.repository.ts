import { contentDb } from "./content.db";

interface IContentRepository {}

export class ContentRepository implements IContentRepository {
  contentDb = contentDb;

  constructor() {
    this.contentDb.client.createIndex({
      index: { fields: ["type", "name"] },
    });
    this.setupChangeListener();
  }

  async findContentMatchByName(
    name: string
  ): Promise<PouchDB.Find.FindResponse<{}>> {
    console.log("name", name);
    const doc = await this.contentDb.client.find({
      selector: {
        type: { $eq: "content" },
        name: { $regex: `^${name}` },
      },
      sort: ["name"],
    });
    console.log("doc", doc);
    return doc;
  }

  async findContentIdByName(name: string): Promise<string> {
    const doc = await this.contentDb.client.find({
      selector: {
        type: { $eq: "content" },
        name: { $eq: name },
      },
      sort: ["name"],
      limit: 1,
    });
    return doc.docs[0]?._id || "";
  }

  // Method to setup changes listener
  public setupChangeListener() {}
}

export const contentRepository = new ContentRepository();
