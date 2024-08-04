export interface BaseDocument {
  _id: string;
  _rev?: string;
  _attachments?: PouchDB.Core.Attachments;
  _conflicts?: any;
}

export interface BaseEntity {
  id: string;
  created: string;
  updated: string;
}

export interface AttachmentEntity {
  name: string;
  content_type: string;
  data: Blob;
}

export interface AttachmentRecord extends BaseEntity {
  parentId: string;
  name: string;
  content_type: string;
  file_size: number;
}

export interface BaseUserEntity {
  id: string;
  email: string;
}

export interface BaseCollectionEntity<T> {
  records: T[];
  totalRecords: number;
}