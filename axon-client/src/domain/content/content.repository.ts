import { contentDb, contentTypeDataDb } from "./content.db";
import { ContentEntityKeys, ContentTypeDataEntity } from "./content.entity";

interface IContentRepository {}

export class ContentRepository implements IContentRepository {
  contentDb = contentDb;
  contentTypeDataDb = contentTypeDataDb;
  constructor() {
    this.contentDb.client.createIndex({
      index: { fields: ["doc_key", "name"] },
    });

    this.contentTypeDataDb.client.createIndex({
      index: { fields: ["doc_key", "content_id"] },
    });

    this.setupChangeListener();
  }

  async findContentMatchByName(
    name: string
  ): Promise<PouchDB.Find.FindResponse<{}>> {
    const doc = await this.contentDb.client.find({
      selector: {
        doc_key: { $eq: ContentEntityKeys.CONTENT },
        name: { $regex: `^${name}` },
      },
      sort: ["name"],
    });
    return doc;
  }

  async findContentIdByName(name: string): Promise<string> {
    const doc = await this.contentDb.client.find({
      selector: {
        doc_key: { $eq: "content" },
        name: { $eq: name },
      },
      sort: ["name"],
      limit: 1,
    });
    return doc.docs[0]?._id || "";
  }

  async findContentTypeDataIdByContentId(id: string): Promise<string> {
    const doc = await this.contentTypeDataDb.client.find({
      selector: {
        doc_key: { $eq: ContentEntityKeys.CONTENT_TYPE_DATA },
        content_id: { $eq: id },
      },
    });
    return doc.docs[0]?._id || "";
  }

  // Method to setup changes listener
  public setupChangeListener() {}
}

export const contentRepository = new ContentRepository();
