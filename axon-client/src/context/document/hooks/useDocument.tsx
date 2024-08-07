import documentService from "src/domain/document/document.service";
import { useDocumentWorker } from "../../../hooks/worker/useDocumentWorker";
import { useDocumentContext } from "./useDocumentContext";
import {
  CreateDocumentFolderDto,
  UpdateDocumentFolderDto,
} from "src/domain/document/document.dto";
import { useDataMutation } from "../../../hooks/api/useDataMutation";
import {
  DocumentEventPayload,
  DocumentFileEntity,
  DocumentFolderEntity,
  DocumentQueryKeys,
  DocumentUploadEventPayload,
} from "src/domain/document/document.entity";
import { UseMutationResult } from "@tanstack/react-query";
import { uid } from "src/common/uid";
import { useDocumentFileRoute } from "./useDocumentRoute";

export function useDocument(): {
  uploadDocument: (folderId: string, folderName: string) => void;
  createDocumentFolder: UseMutationResult<
    DocumentFolderEntity,
    unknown,
    CreateDocumentFolderDto,
    unknown
  >;
  deleteDocumentFolder: UseMutationResult<boolean, unknown, string[], unknown>;
  updateDocumentFolder: UseMutationResult<
    boolean,
    unknown,
    UpdateDocumentFolderDto,
    unknown
  >;
  deleteDocumentFile: UseMutationResult<boolean, unknown, string[], unknown>;
  downloadDocumentFile: (file: DocumentFileEntity[]) => void;
} {
  const { postMessage } = useDocumentWorker();
  const { documentStateDispatch, documentState } = useDocumentContext();
  const { documentFolderName } = useDocumentFileRoute();

  async function uploadDocument(folderId: string, folderName: string) {
    const documentFile = await documentService.buildDocumentUploadFile();
    if (!documentFile) return;
    const documentEvent: DocumentEventPayload = {
      "document:upload": {
        file: documentFile,
        folderId,
        folderName,
        eventId: uid(),
      } as DocumentUploadEventPayload,
    };
    documentStateDispatch({
      type: "SET_DOCUMENT_FOLDER_FILE_STATUS",
      payload: {
        [documentEvent["document:upload"].eventId]: {
          type: "document:upload",
          name: documentFile.name,
          content_type: documentFile.type,
          status: "pending",
        },
      },
    });
    postMessage(documentEvent);
    return;
  }

  const createDocumentFolder = useDataMutation<
    CreateDocumentFolderDto,
    DocumentFolderEntity
  >({
    mutationFn: async (dto: CreateDocumentFolderDto) =>
      documentService.createDocumentFolder(dto),
    optionalQueryKeysToInvalidate: [[...DocumentQueryKeys.DOCUMENT_FOLDERS]],
    onSuccessCallback: () => {
      documentStateDispatch({
        type: "CLEAR_CREATE_DOCUMENT_FOLDER_FORM",
      });
    },
  });

  const deleteDocumentFolder = useDataMutation<string[], boolean>({
    mutationFn: async (dto: string[]) =>
      documentService.deleteDocumentFolders(dto),
    optionalQueryKeysToInvalidate: [[...DocumentQueryKeys.DOCUMENT_FOLDERS]],
    onSuccessCallback: () => {
      documentStateDispatch({
        type: "CLEAR_SELECTED_DOCUMENT_FOLDERS",
      });
    },
  });

  const updateDocumentFolder = useDataMutation<
    UpdateDocumentFolderDto,
    boolean
  >({
    mutationFn: async (dto: UpdateDocumentFolderDto) =>
      documentService.updateDocumentFolder(dto),
    optionalQueryKeysToInvalidate: [[...DocumentQueryKeys.DOCUMENT_FOLDERS]],
  });

  const deleteDocumentFile = useDataMutation<string[], boolean>({
    mutationFn: async (dto: string[]) =>
      documentService.deleteDocumentFile(dto),
    optionalQueryKeysToInvalidate: [
      [...DocumentQueryKeys.DOCUMENT_FILE, documentFolderName || "notfound"],
    ],
  });

  function downloadDocumentFile(file: DocumentFileEntity[]) {
    documentService.downloadDocumentFile(file);
  }

  return {
    uploadDocument,
    createDocumentFolder,
    deleteDocumentFolder,
    updateDocumentFolder,
    deleteDocumentFile,
    downloadDocumentFile,
  };
}
