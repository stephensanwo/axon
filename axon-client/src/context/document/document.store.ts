import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  DocumentFolderEntity,
  DocumentEventStatus,
} from "src/domain/document/document.entity";
import { CreateDocumentFolderDto } from "src/domain/document/document.dto";
import { DocumentFileStatus } from "src/context/document/document.types";

export type DocumentStore = {
  selectedDocumentFolders: DocumentFolderEntity[];
  setSelectedDocumentFolders: (
    selectedDocumentFolders: DocumentFolderEntity[]
  ) => void;
  selectedDocumentFiles: string[];
  setSelectedDocumentFiles: (selectedDocumentFiles: string[]) => void;
  createDocumentFolderForm: CreateDocumentFolderDto | null;
  setCreateDocumentFolderForm: (
    createDocumentFolderForm: CreateDocumentFolderDto | null
  ) => void;
  fileStatus: Record<string, DocumentFileStatus> | null;
  updateFileStatus: (eventId: string, status: DocumentEventStatus) => void;
  setFileStatus: (fileStatus: Record<string, DocumentFileStatus>) => void;
  clearFileStatus: () => void;
};

export const useDocumentStore = create(
  persist<DocumentStore>(
    (set) => ({
      selectedDocumentFolders: [] as DocumentFolderEntity[],
      setSelectedDocumentFolders: (
        selectedDocumentFolders: DocumentFolderEntity[]
      ) => set({ selectedDocumentFolders }),
      selectedDocumentFiles: [] as string[],
      setSelectedDocumentFiles: (selectedDocumentFiles: string[]) =>
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
      clearFileStatus: () => set({ fileStatus: null }),
    }),
    {
      name: "document",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
