import { BaseEntity } from "src/db/db.types";
import { DocumentFileEntity, DocumentFolderData } from "./document.entity";

export type CreateDocumentFolderDto = DocumentFolderData;

export type UpdateDocumentFolderDto = BaseEntity & DocumentFolderData;

export type GetDocumentFilesResponseDto = {
  folderId: string | null;
  files: DocumentFileEntity[];
};
