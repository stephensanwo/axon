import { UseQueryResult } from "@tanstack/react-query";
import { DocumentFolderDto } from "src/domain/document/document.dto";
import { DocumentFolderEntity } from "src/domain/document/document.entity";
import { IAppPanelDirections, IAppPanels } from "src/types/app";

export type DocumentState = {
  documentPage: DocumentPageProps;
  documentFolders: {
    data: DocumentFolderEntity[];
    query: UseQueryResult<DocumentFolderEntity[], unknown>;
    selectedDocumentFolders: DocumentFolderEntity[];
    createDocumentFolderForm: DocumentFolderDto | null;
  };
};

interface DocumentPageProps {
  panel: IAppPanels;
}

export type DocumentAction =
  | {
      type: "INIT_DOCUMENT_FOLDERS";
      payload: {
        documentFolders: DocumentFolderEntity[];
        query: UseQueryResult<DocumentFolderEntity[], unknown>;
      };
    }
  | {
      type: "ADD_DOCUMENT_FOLDER";
      payload: DocumentFolderEntity;
    }
  | {
      type: "UPDATE_DOCUMENT_FOLDER";
      payload: DocumentFolderEntity;
    }
  | {
      type: "DELETE_DOCUMENT_FOLDER";
      payload: string;
    }
  | {
      type: "OPEN_DOCUMENT_PAGE_PANEL";
      payload: IAppPanelDirections;
    }
  | {
      type: "CLOSE_DOCUMENT_PAGE_PANEL";
      payload: IAppPanelDirections;
    }
  | {
      type: "SELECT_DOCUMENT_FOLDER";
      payload: DocumentFolderEntity;
    }
  | {
      type: "SELECT_DOCUMENT_FOLDERS";
      payload: DocumentFolderEntity[];
    }
  | {
      type: "REMOVE_SELECTED_DOCUMENT_FOLDER";
      payload: string;
    }
  | {
      type: "CLEAR_SELECTED_DOCUMENT_FOLDERS";
    }
  | {
      type: "SET_CREATE_DOCUMENT_FOLDER_FORM";
      payload: DocumentFolderDto;
    }
  | {
      type: "CLEAR_CREATE_DOCUMENT_FOLDER_FORM";
    };
