import { UseQueryResult } from "@tanstack/react-query";
import { DocumentEntity } from "src/domain/document/document.entity";

export type DocumentState = {
  documents: DocumentEntity[];
  query: UseQueryResult<DocumentEntity[], unknown>;
};

export type DocumentAction =
  | {
      type: "INIT_DOCUMENTS";
      payload: {
        documents: DocumentEntity[];
        query: UseQueryResult<DocumentEntity[], unknown>;
      };
    }
  | {
      type: "ADD_DOCUMENT";
      payload: DocumentEntity;
    }
  | {
      type: "UPDATE_DOCUMENT";
      payload: DocumentEntity;
    }
  | {
      type: "DELETE_DOCUMENT";
      payload: string;
    };
