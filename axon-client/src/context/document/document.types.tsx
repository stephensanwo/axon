import { UseQueryResult } from "@tanstack/react-query";
import { DocumentEntity } from "src/domain/document/document.entity";
import { IAppPanelDirections, IAppPanels } from "src/types/app";

export type DocumentState = {
  documents: DocumentEntity[];
  query: UseQueryResult<DocumentEntity[], unknown>;
  documentPage: DocumentPageProps;
};

interface DocumentPageProps {
  panel: IAppPanels;
}

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
    }
  | {
      type: "OPEN_DOCUMENT_PAGE_PANEL";
      payload: IAppPanelDirections;
    }
  | {
      type: "CLOSE_DOCUMENT_PAGE_PANEL";
      payload: IAppPanelDirections;
    };
