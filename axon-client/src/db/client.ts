import PouchDB from "pouchdb";
import { AttachmentEntity, BaseDocument, BaseEntity } from "./db.types";
import { uid } from "src/common/uid";

/**
 * DBClient: This class provides a wrapper around PouchDB
 *
 */
export class DBClient {
  client: PouchDB.Database;
  dbName: string;

  constructor(dbName: string) {
    this.dbName = dbName;
    this.client = new PouchDB(dbName, { adapter: "idb" });
  }

  /**
   * Create a new document in the database
   *
   * @param entity - The entity to create
   * @returns The id of the created document
   * @throws Error if the document cannot be created
   */
  async createRecord<T extends BaseEntity>(entity: T): Promise<T> {
    try {
      const id = uid();
      const doc: T & BaseEntity & BaseDocument = {
        ...entity,
        _id: id,
        id: id,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      };
      await this.client.put<T & BaseEntity & BaseDocument>(doc);
      return doc;
    } catch (err) {
      console.error(err);
      throw new Error(`Error creating ${this.dbName} record`);
    }
  }

  /**
   * Create a new attachment in the database
   *
   * @param entity - The entity to create
   * @returns The id of the created attachment
   * @throws Error if the attachment cannot be created
   */
  async createAttachmentRecord(
    entity: AttachmentEntity
  ): Promise<BaseEntity & AttachmentEntity> {
    try {
      console.log("Creating attachment");
      const id = uid();
      console.log("Creating attachment");
      console.log("Creating attachment id", id);
      console.log("Creating attachment name", entity.name);
      console.log("Creating attachment content_type", entity.content_type);
      console.log("Creating attachment data", entity.data);
      const doc: Omit<AttachmentEntity, "data"> & BaseEntity & BaseDocument = {
        _id: id,
        id: id,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        name: entity.name,
        content_type: entity.content_type,
        _attachments: {
          [entity.name]: {
            content_type: entity.content_type,
            data: entity.data,
          },
        },
      };
      console.log("Creating attachment doc", doc);
      await this.client.put(doc);
      return {
        id: id,
        created: doc.created,
        updated: doc.updated,
        name: entity.name,
        content_type: entity.content_type,
        data: entity.data,
      };
    } catch (err) {
      console.error(err);
      throw new Error(`Error creating ${this.dbName} attachment`);
    }
  }

  /**
   * Get all records with attachments
   *
   * @returns An array of records with attachments
   * @throws Error if the records cannot be fetched
   */
  async getAllRecordWithAttachments<T>({
    include_docs = true,
    attachments = true,
    descending = true,
  }: PouchDB.Core.AllDocsOptions): Promise<T[]> {
    try {
      const result = await this.client.allDocs<BaseEntity & AttachmentEntity>({
        include_docs,
        attachments,
        descending,
      });
      const res = result.rows.map((row) => {
        return {
          id: row.id,
          created: row.doc?.created,
          updated: row.doc?.updated,
          name: row.doc?.name,
          content_type: row.doc?.content_type,
          data: row.doc?._attachments,
        };
      }) as T[];
      return res;
    } catch (err) {
      console.log(err);
      throw new Error(`Error fetching ${this.dbName} attachments`);
    }
  }

  async getAttachment(id: string, attachmentName: string) {}

  async getAllRecords<T>(
    options?:
      | PouchDB.Core.AllDocsWithKeyOptions
      | PouchDB.Core.AllDocsOptions
      | PouchDB.Core.AllDocsWithinRangeOptions
      | undefined
  ) {
    try {
      const result = await this.client.allDocs<T>({
        include_docs: true,
        ...options,
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(`Error fetching ${this.dbName} records`);
    }
  }
}
