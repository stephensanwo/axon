import documentService from "src/domain/document/document.service";
import {
  CreateDocumentFolderDto,
  GetDocumentFilesResponseDto,
  GetDocumentFoldersResponseDto,
  UpdateDocumentFolderDto,
} from "src/domain/document/document.dto";
import { useDataMutation } from "../../../hooks/api/useDataMutation";
import {
  DocumentEventPayload,
  DocumentFileEntity,
  DocumentFolderEntity,
  DocumentUploadEventPayload,
} from "src/domain/document/document.entity";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { uid } from "src/common/uid";
import { useDocumentFileRoute } from "./useDocumentRoute";
import { useDocumentWorker } from "./useDocumentWorker";
import { useDataQuery } from "src/hooks/api/useDataQuery";
import { useDocumentStore } from "../document.store";
import {
  DocumentFolderQueryKey,
  DocumentFolderRouteParams,
  DocumentFoldersQueryKey,
} from "../document.types";

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
  documentFolders: UseQueryResult<
    GetDocumentFoldersResponseDto | null,
    unknown
  >;
  documentFiles: UseQueryResult<GetDocumentFilesResponseDto | null, unknown>;
  documentFile: UseQueryResult<DocumentFileEntity | null, unknown>;
} {
  const {
    setFileStatus,
    setCreateDocumentFolderForm,
    setSelectedDocumentFolders,
    setSelectedDocumentFiles,
  } = useDocumentStore();
  const { postMessage } = useDocumentWorker();
  const {
    documentFolderName,
    documentPreviewFileId,
    clearDocumentFileRouteSearchParams,
  } = useDocumentFileRoute();

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
    setFileStatus({
      [documentEvent["document:upload"].eventId]: {
        type: "document:upload",
        name: documentFile.name,
        content_type: documentFile.type,
        status: "pending",
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
    optionalQueryKeysToInvalidate: [[...DocumentFoldersQueryKey]],
    onSuccessCallback: () => {
      setCreateDocumentFolderForm(null);
    },
  });

  const deleteDocumentFolder = useDataMutation<string[], boolean>({
    mutationFn: async (dto: string[]) =>
      documentService.deleteDocumentFolders(dto),
    optionalQueryKeysToInvalidate: [[...DocumentFoldersQueryKey]],
    onSuccessCallback: () => {
      setSelectedDocumentFolders([]);
    },
  });

  const updateDocumentFolder = useDataMutation<
    UpdateDocumentFolderDto,
    boolean
  >({
    mutationFn: async (dto: UpdateDocumentFolderDto) =>
      documentService.updateDocumentFolder(dto),
    optionalQueryKeysToInvalidate: [[...DocumentFoldersQueryKey]],
  });

  const deleteDocumentFile = useDataMutation<string[], boolean>({
    mutationFn: async (dto: string[]) =>
      documentService.deleteDocumentFile(dto),
    optionalQueryKeysToInvalidate: [
      [...DocumentFolderQueryKey, documentFolderName],
    ],
    onSuccessCallback: () => {
      setSelectedDocumentFiles([]);
      clearDocumentFileRouteSearchParams(
        DocumentFolderRouteParams.DOCUMENT_FILE_PREVIEW
      );
    },
  });

  function downloadDocumentFile(file: DocumentFileEntity[]) {
    documentService.downloadDocumentFile(file);
  }

  const documentFolders = useDataQuery<GetDocumentFoldersResponseDto | null>({
    queryKey: [...DocumentFoldersQueryKey],
    queryFn: async () => documentService.getDocumentFolders(),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const documentFiles = useDataQuery<GetDocumentFilesResponseDto | null>({
    queryKey: [...DocumentFolderQueryKey, documentFolderName],
    queryFn: async () => documentService.getDocumentFiles(documentFolderName),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const documentFile = useDataQuery<DocumentFileEntity | null>({
    queryKey: [
      ...DocumentFolderQueryKey,
      documentFolderName,
      documentPreviewFileId,
    ],
    queryFn: async () => documentService.getDocumentFile(documentPreviewFileId),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  return {
    uploadDocument,
    createDocumentFolder,
    deleteDocumentFolder,
    updateDocumentFolder,
    deleteDocumentFile,
    downloadDocumentFile,
    documentFolders,
    documentFiles,
    documentFile,
  };
}
