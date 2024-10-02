import PouchDB from "pouchdb";
import {
  AttachmentEntity,
  AttachmentRecord,
  BaseDocument,
  BaseEntity,
} from "./db.types";
import { uid } from "src/common/uid";
import pouchFind from "pouchdb-find";
PouchDB.plugin(pouchFind);

/**
 * DBClient: This class provides a wrapper around PouchDB
 *
 */
export class DBClient {
  client: PouchDB.Database;
  dbName: string;
  basePrefix: string;

  constructor(dbName: string, basePrefix: string) {
    this.dbName = dbName;
    this.basePrefix = basePrefix;
    this.client = new PouchDB(dbName, { adapter: "idb" });
  }

  public async createIndex(index: PouchDB.Find.CreateIndexOptions) {
    try {
      await this.client.createIndex(index);
    } catch (err) {
      console.error(err);
      throw new Error(`Error creating index for ${this.dbName}`);
    }
  }

  /**
   * Create a new document in the database
   *
   * @param entity - The entity to create
   * @returns The id of the created document
   * @throws Error if the document cannot be created
   */
  public async createRecord<T>(
    entity: T,
    record_id?: string
  ): Promise<T & BaseEntity> {
    try {
      const id = record_id ?? uid(this.basePrefix);
      const doc: T & BaseEntity & BaseDocument = {
        ...entity,
        _id: id,
        id: id,
        doc_key: this.basePrefix,
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
  public async createAttachmentRecord(
    entity: AttachmentEntity,
    parentId: string,
    parentName: string
  ): Promise<BaseEntity & AttachmentEntity> {
    try {
      const prefix = parentId
        ? `${this.basePrefix}_${parentId}`
        : `${this.basePrefix}`;
      const id = uid(prefix);
      const doc: AttachmentRecord & BaseDocument = {
        _id: id,
        id: id,
        doc_key: this.basePrefix,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        name: entity.name,
        content_type: entity.content_type,
        file_size: entity.data.size,
        parentId: parentId,
        parentName: parentName,
        _attachments: {
          [entity.name]: {
            content_type: entity.content_type,
            data: entity.data,
          },
        },
      };
      await this.client.put(doc);
      return {
        id: id,
        doc_key: doc.doc_key,
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
  public async getAllRecordWithAttachments<T>({
    include_docs = true,
    attachments = true,
    descending = true,
  }: PouchDB.Core.AllDocsOptions): Promise<T[]> {
    try {
      const result = await this.client.allDocs<BaseEntity & AttachmentEntity>({
        include_docs,
        attachments,
        descending,
        endkey: this.basePrefix,
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

  public async getRecordWithAttachments<T>(
    docId: string,
    options?: PouchDB.Core.GetOptions | undefined
  ): Promise<T & BaseEntity> {
    try {
      const doc = await this.client.get<
        T & BaseEntity & Record<string, AttachmentEntity>
      >(docId, {
        attachments: true,
        ...options,
      });
      return {
        id: doc._id,
        created: doc.created,
        updated: doc.updated,
        name: doc.name,
        content_type: doc.content_type,
        data: doc._attachments,
      } as T & BaseEntity & AttachmentEntity;
    } catch (err) {
      console.log(err);
      throw new Error(`Error fetching ${this.dbName} attachment`);
    }
  }

  public async getAttachment<T extends BaseEntity & AttachmentRecord>(
    dto: T
  ): Promise<Blob | Buffer> {
    try {
      // const file = await this.client.get<T>(dto.id);
      const attachment = await this.client.getAttachment(dto.id, dto.name);
      console.log("Attachment", attachment);
      return attachment;
    } catch (err) {
      console.log(err);
      throw new Error(`Error fetching ${this.dbName} attachment`);
    }
  }

  /**
   *
   * Note: if descending is true, the order of the records will be reversed so the order or startkey and endkey should be reversed
   */
  public async getAllRecords<T>(
    options?:
      | PouchDB.Core.AllDocsWithKeyOptions
      | PouchDB.Core.AllDocsWithKeysOptions
      | PouchDB.Core.AllDocsOptions
      | PouchDB.Core.AllDocsWithinRangeOptions
      | undefined
  ) {
    try {
      const defaultOptions = {
        include_docs: true,
        attachments: false,
      };
      const mergedOptions = { ...defaultOptions, ...options };
      const result = await this.client.allDocs<T>(mergedOptions);

      return result.rows.map((row) => row.doc) as T[];
    } catch (err) {
      console.log(err);
      throw new Error(`Error fetching ${this.dbName} records`);
    }
  }

  public async getRecord<T>(id: string): Promise<T & BaseEntity> {
    try {
      const doc = await this.client.get<T & BaseEntity & BaseDocument>(id);
      return doc;
    } catch (err) {
      console.log(err);
      throw new Error(`Error fetching ${this.dbName} record`);
    }
  }

  public async getDbInfo() {
    try {
      const info = await this.client.info();
      return info;
    } catch (err) {
      console.log(err);
      throw new Error(`Error fetching ${this.dbName} info`);
    }
  }

  public async deleteRecords(ids: string[]): Promise<boolean> {
    try {
      const result = await this.client.allDocs({
        include_docs: true,
        attachments: false,
        keys: ids,
      });
      const docs = result.rows
        .filter(
          (
            row
          ): row is {
            doc: PouchDB.Core.ExistingDocument<PouchDB.Core.AllDocsMeta>;
            id: string;
            key: string;
            value: { rev: string; deleted?: boolean };
          } => {
            return "doc" in row && row.doc !== undefined && row.doc !== null;
          }
        )
        .map((row) => {
          return {
            _id: row.doc._id,
            _rev: row.doc._rev,
            _deleted: true,
          };
        });
      await this.client.bulkDocs(docs);
      return true;
    } catch (err) {
      console.log(err);
      throw new Error(`Error deleting ${this.dbName} records`);
    }
  }

  public async updateRecord<T>(
    entity: T & BaseEntity
  ): Promise<T & BaseEntity> {
    try {
      const doc = await this.client.get<T & BaseEntity & BaseDocument>(
        entity.id
      );
      const updatedDoc = {
        ...doc,
        ...entity,
        _id: doc._id,
        _rev: doc._rev,
        updated: new Date().toISOString(),
      };
      await this.client.put(updatedDoc);
      return updatedDoc;
    } catch (err) {
      console.log(err);
      throw new Error(`Error updating ${this.dbName} record`);
    }
  }
}
