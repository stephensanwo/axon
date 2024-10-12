import {
  DocumentEventStatus,
  DocumentEntityKeys,
} from "src/domain/document/document.entity";

export enum DocumentFolderRouteParams {
  DOCUMENT_FOLDER_NAME = "documentFolderName",
  DOCUMENT_FILE_PREVIEW = "preview",
}

export const DocumentFoldersQueryKey = [
  DocumentEntityKeys.DOCUMENT,
  DocumentEntityKeys.FOLDERS,
];

export const DocumentFolderQueryKey = [
  DocumentEntityKeys.DOCUMENT,
  DocumentEntityKeys.FOLDER,
];

export const DocumentFilesQueryKey = [
  DocumentEntityKeys.DOCUMENT,
  DocumentEntityKeys.FILE,
];

export type DocumentFileStatus = {
  type: "document:upload";
  name: string;
  content_type: string;
  status: DocumentEventStatus;
};

export type DocumentLevels = "folder" | "file";
