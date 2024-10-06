import { create } from "zustand";
import {
  DocumentFolderEntity,
  DocumentFileEntity,
  DocumentEventStatus,
} from "src/domain/document/document.entity";
import { CreateDocumentFolderDto } from "src/domain/document/document.dto";
import { DocumentFileStatus } from "src/context/document/document.types";

export type DocumentStore = {
  selectedDocumentFolders: DocumentFolderEntity[];
  setSelectedDocumentFolders: (
    selectedDocumentFolders: DocumentFolderEntity[]
  ) => void;
  selectedDocumentFiles: DocumentFileEntity[];
  setSelectedDocumentFiles: (
    selectedDocumentFiles: DocumentFileEntity[]
  ) => void;
  createDocumentFolderForm: CreateDocumentFolderDto | null;
  setCreateDocumentFolderForm: (
    createDocumentFolderForm: CreateDocumentFolderDto | null
  ) => void;
  fileStatus: Record<string, DocumentFileStatus> | null;
  updateFileStatus: (eventId: string, status: DocumentEventStatus) => void;
  setFileStatus: (fileStatus: Record<string, DocumentFileStatus>) => void;
  selectedDocumentFilePreview: DocumentFileEntity | null;
  setSelectedDocumentFilePreview: (
    selectedDocumentFilePreview: DocumentFileEntity
  ) => void;
};

export const useDocumentStore = create<DocumentStore>((set) => ({
  selectedDocumentFilePreview: null as DocumentFileEntity | null,
  setSelectedDocumentFilePreview: (
    selectedDocumentFilePreview: DocumentFileEntity
  ) => set({ selectedDocumentFilePreview }),
  selectedDocumentFolders: [] as DocumentFolderEntity[],
  setSelectedDocumentFolders: (
    selectedDocumentFolders: DocumentFolderEntity[]
  ) => set({ selectedDocumentFolders }),
  selectedDocumentFiles: [] as DocumentFileEntity[],
  setSelectedDocumentFiles: (selectedDocumentFiles: DocumentFileEntity[]) =>
    set({ selectedDocumentFiles }),
  createDocumentFolderForm: null as CreateDocumentFolderDto | null,
  setCreateDocumentFolderForm: (
    createDocumentFolderForm: CreateDocumentFolderDto | null
  ) => set({ createDocumentFolderForm }),
  fileStatus: null as Record<string, DocumentFileStatus> | null,
  updateFileStatus: (eventId: string, status: DocumentEventStatus) =>
    set((state) => {
      if (!state.fileStatus) {
        return state;
      }
      const currentFileStatus = state.fileStatus[eventId];

      if (!currentFileStatus) {
        return state;
      }

      console.log("currentFileStatus", currentFileStatus);

      return {
        ...state,
        fileStatus: {
          ...state.fileStatus,
          [eventId]: {
            ...currentFileStatus,
            status,
          },
        },
      };
    }),
  setFileStatus: (fileStatus: Record<string, DocumentFileStatus>) =>
    set((state) => ({
      ...state,
      fileStatus: {
        ...state.fileStatus,
        ...fileStatus,
      },
    })),
}));
