import React, { Reducer, createContext, useEffect, useReducer } from "react";
import { DocumentAction, DocumentState } from "./document.types";
import { documentRepository } from "src/domain/document/document.repository";
import { documentReducer } from "./document.reducer";
import { useDataQuery } from "src/hooks/api/useDataQuery";
import {
  DocumentFolderEntity,
  DocumentQueryKeys,
} from "src/domain/document/document.entity";

interface DocumentProviderProps {
  children: React.ReactNode;
}

interface DocumentContextProps {
  documentState: DocumentState;
  documentStateDispatch: React.Dispatch<DocumentAction>;
}

const DocumentContext = createContext({} as DocumentContextProps);

const DocumentProvider = ({ children }: DocumentProviderProps) => {
  const query = useDataQuery<DocumentFolderEntity[]>({
    queryKey: [...DocumentQueryKeys.DOCUMENT_FOLDERS],
    queryFn: async () => documentRepository.getDocumentFolders(),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });

  const [documentState, documentStateDispatch] = useReducer<
    Reducer<DocumentState, DocumentAction>
  >(documentReducer, {
    documentFolders: {
      data: [],
      query: query,
      selectedDocumentFolders: [],
      createDocumentFolderForm: null,
    },
    documentPage: {
      panel: { left: false, right: false },
    },
  });

  console.log("documentState", documentState);

  useEffect(() => {
    if (query.data && query.isFetched) {
      documentStateDispatch({
        type: "INIT_DOCUMENT_FOLDERS",
        payload: {
          documentFolders: query.data,
          query: query,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data]);

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
