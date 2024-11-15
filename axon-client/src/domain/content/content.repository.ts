import { contentDb, contentFolderDb, contentTypeDataDb } from "./content.db";
import {
  ContentEntity,
  ContentEntityKeys,
  ContentTypeDataEntity,
} from "./content.entity";

interface IContentRepository {}

export class ContentRepository implements IContentRepository {
  contentDb = contentDb;
  contentTypeDataDb = contentTypeDataDb;
  contentFolderDb = contentFolderDb;

  constructor() {
    this.contentDb.client.createIndex({
      index: { fields: ["doc_key", "name"] },
    });

    this.contentFolderDb.client.createIndex({
      index: { fields: ["doc_key", "name"] },
    });

    this.contentTypeDataDb.client.createIndex({
      index: { fields: ["doc_key", "content_id"] },
    });

    this.setupChangeListener();
  }

  async findContentFolderMatchByName(
    name: string
  ): Promise<PouchDB.Find.FindResponse<{}>> {
    const doc = await this.contentFolderDb.client.find({
      selector: {
        doc_key: { $eq: ContentEntityKeys.CONTENT_FOLDER },
        name: { $regex: `^${name}` },
      },
    });
    return doc;
  }

  async findContentFolderIdByName(name: string): Promise<string> {
    const doc = await this.contentFolderDb.client.find({
      selector: {
        doc_key: { $eq: ContentEntityKeys.CONTENT_FOLDER },
        name: { $eq: name },
      },
    });
    return doc.docs[0]?._id || "";
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
  async findContentByFolderId(
    folderId: string
  ): Promise<PouchDB.Core.ExistingDocument<ContentEntity>[]> {
    const doc = await this.contentDb.client.find({
      selector: {
        doc_key: { $eq: ContentEntityKeys.CONTENT },
        content_folder_id: { $eq: folderId },
      },
    });
    return doc.docs as PouchDB.Core.ExistingDocument<ContentEntity>[];
  }
  // Method to setup changes listener
  public setupChangeListener() {}
}

export const contentRepository = new ContentRepository();
