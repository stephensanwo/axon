import { BaseEntity } from "src/db/db.types";
import {
  DocumentFileEntity,
  DocumentFolderData,
  DocumentFolderEntity,
  DocumentTreeEntity,
} from "./document.entity";

export type CreateDocumentFolderDto = DocumentFolderData;

export type UpdateDocumentFolderDto = BaseEntity & DocumentFolderData;

export type GetDocumentFoldersResponseDto = {
  folders: DocumentFolderEntity[];
  folderTree: DocumentTreeEntity;
};

export type GetDocumentFilesResponseDto = {
  files: DocumentFileEntity[];
  folder: DocumentFolderEntity | null;
};
