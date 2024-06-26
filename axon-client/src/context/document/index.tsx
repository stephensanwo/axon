import React, { Reducer, createContext, useEffect, useReducer } from "react";
import { DocumentAction, DocumentState } from "./document.types";
import { DocumentEntity } from "src/domain/document/document.entity";
import { documentRepository } from "src/domain/document/document.repository";
import { documentReducer } from "./document.reducer";
import { useDataQuery } from "src/hooks/api/useDataQuery";

interface DocumentProviderProps {
  children: React.ReactNode;
}

interface DocumentContextProps {
  documentState: DocumentState;
  documentStateDispatch: React.Dispatch<DocumentAction>;
}

const DocumentContext = createContext({} as DocumentContextProps);

const DocumentProvider = ({ children }: DocumentProviderProps) => {
  const query = useDataQuery<DocumentEntity[]>(["documents"], async () =>
    documentRepository.getDocuments()
  );

  const [documentState, documentStateDispatch] = useReducer<
    Reducer<DocumentState, DocumentAction>
  >(documentReducer, {
    documents: [],
    query: query,
  });

  useEffect(() => {
    if (query.data && query.isFetched) {
      documentStateDispatch({
        type: "INIT_DOCUMENTS",
        payload: { documents: query.data, query: query },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.isFetched]);

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
