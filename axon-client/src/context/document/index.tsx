import React, {
  Reducer,
  createContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { DocumentAction, DocumentState } from "./document.types";
import { documentReducer } from "./document.reducer";
import { useDataQuery } from "src/hooks/api/useDataQuery";
import { DocumentQueryKeys } from "src/domain/document/document.entity";
import { useDocumentFileRoute } from "./hooks/useDocumentRoute";
import documentService from "src/domain/document/document.service";
import {
  GetDocumentFilesResponseDto,
  GetDocumentFoldersResponseDto,
} from "src/domain/document/document.dto";
import documentWorker from "../../worker/document.worker?worker";

interface DocumentProviderProps {
  children: React.ReactNode;
}

interface DocumentContextProps {
  documentState: DocumentState;
  documentStateDispatch: React.Dispatch<DocumentAction>;
  documentWorkerClient: React.MutableRefObject<Worker | null>;
}

const DocumentContext = createContext({} as DocumentContextProps);

const DocumentProvider = ({ children }: DocumentProviderProps) => {
  const { documentFolderName } = useDocumentFileRoute();

  const documentFoldersQuery = useDataQuery<GetDocumentFoldersResponseDto>({
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
      folders: [],
      query: documentFoldersQuery,
      selectedDocumentFolders: [],
      createDocumentFolderForm: null,
      folderTree: {},
    },
    documentPage: {
      panel: { left: false, right: false },
    },
    documentFolderFiles: {
      files: null,
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
          data: documentFoldersQuery.data,
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
          documentFiles: documentFilesQuery.data.files || [],
          query: documentFilesQuery,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentFilesQuery.data]);

  useEffect(() => {
    const folder = documentFoldersQuery.data?.folders.find(
      (folder) => folder.id === documentFilesQuery.data?.folderId
    );

    documentStateDispatch({
      type: "INIT_DOCUMENT_FOLDER_FILES_PARENT_FOLDER",
      payload: folder || null,
    });
  }, [documentFilesQuery.data]);

  // Document Worker
  const documentWorkerClient = useRef<Worker | null>(null);

  useEffect(() => {
    documentWorkerClient.current = new documentWorker();
    return () => {
      documentWorkerClient.current?.terminate();
    };
  }, []);

  return (
    <DocumentContext.Provider
      value={{
        documentState,
        documentStateDispatch,
        documentWorkerClient: documentWorkerClient,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export { DocumentProvider, DocumentContext };
