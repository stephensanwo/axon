import React, { Reducer, createContext, useEffect, useReducer } from "react";
import { DocumentAction, DocumentState } from "./document.types";
import { documentReducer } from "./document.reducer";
import { useDataQuery } from "src/hooks/api/useDataQuery";
import {
  DocumentFolderEntity,
  DocumentQueryKeys,
} from "src/domain/document/document.entity";
import { useDocumentFileRoute } from "./hooks/useDocumentRoute";
import documentService from "src/domain/document/document.service";
import { GetDocumentFilesResponseDto } from "src/domain/document/document.dto";

interface DocumentProviderProps {
  children: React.ReactNode;
}

interface DocumentContextProps {
  documentState: DocumentState;
  documentStateDispatch: React.Dispatch<DocumentAction>;
}

const DocumentContext = createContext({} as DocumentContextProps);

const DocumentProvider = ({ children }: DocumentProviderProps) => {
  const { documentFolderName } = useDocumentFileRoute();

  const documentFoldersQuery = useDataQuery<DocumentFolderEntity[]>({
    queryKey: [...DocumentQueryKeys.DOCUMENT_FOLDERS],
    queryFn: async () => documentService.getDocumentFolders(),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const documentFilesQuery = useDataQuery<GetDocumentFilesResponseDto | null>({
    queryKey: [
      ...DocumentQueryKeys.DOCUMENT_FOLDERS,
      documentFolderName || "notfound",
    ],
    queryFn: async () =>
      documentService.getDocumentFiles(documentFolderName || ""),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const [documentState, documentStateDispatch] = useReducer<
    Reducer<DocumentState, DocumentAction>
  >(documentReducer, {
    documentFolders: {
      data: [],
      query: documentFoldersQuery,
      selectedDocumentFolders: [],
      createDocumentFolderForm: null,
    },
    documentPage: {
      panel: { left: false, right: false },
    },
    documentFolderFiles: {
      data: null,
      query: documentFilesQuery,
      folder: null,
      fileStatus: null,
      selectedDocumentFiles: [],
      selectedDocumentFilePreview: null,
    },
  });

  useEffect(() => {
    if (documentFoldersQuery.data && documentFoldersQuery.isFetched) {
      documentStateDispatch({
        type: "INIT_DOCUMENT_FOLDERS",
        payload: {
          documentFolders: documentFoldersQuery.data,
          query: documentFoldersQuery,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentFoldersQuery.data]);

  useEffect(() => {
    if (documentFilesQuery.data && documentFilesQuery.isFetched) {
      documentStateDispatch({
        type: "INIT_DOCUMENT_FOLDER_FILES",
        payload: {
          data: documentFilesQuery.data.files || [],
          query: documentFilesQuery,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentFilesQuery.data]);

  useEffect(() => {
    console.log("docs", documentFolderName, documentFilesQuery.data);
    const folder = documentFoldersQuery.data?.find(
      (folder) => folder.id === documentFilesQuery.data?.folderId
    );

    console.log("folder", folder);

    documentStateDispatch({
      type: "INIT_DOCUMENT_FOLDER_FILES_PARENT_FOLDER",
      payload: folder || null,
    });
  }, [documentFilesQuery.data]);

  return (
    <DocumentContext.Provider
      value={{
        documentState,
        documentStateDispatch,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export { DocumentProvider, DocumentContext };
