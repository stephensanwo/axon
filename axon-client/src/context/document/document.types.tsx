import { UseQueryResult } from "@tanstack/react-query";
import {
  CreateDocumentFolderDto,
  GetDocumentFilesResponseDto,
} from "src/domain/document/document.dto";
import {
  DocumentEventStatus,
  DocumentFileEntity,
  DocumentFolderEntity,
} from "src/domain/document/document.entity";
import { IAppPanelDirections, IAppPanels } from "src/types/app";

export type DocumentState = {
  documentPage: DocumentPageProps;
  documentFolders: {
    data: DocumentFolderEntity[];
    query: UseQueryResult<DocumentFolderEntity[], unknown>;
    selectedDocumentFolders: DocumentFolderEntity[];
    createDocumentFolderForm: CreateDocumentFolderDto | null;
  };
  documentFolderFiles: {
    data: DocumentFileEntity[] | null;
    query: UseQueryResult<GetDocumentFilesResponseDto | null, unknown>;
    folder: DocumentFolderEntity | null;
    fileStatus: Record<string, DocumentFileStatus> | null;
    selectedDocumentFiles: DocumentFileEntity[];
    selectedDocumentFilePreview: DocumentFileEntity | null;
  };
};


export enum DocumentFolderRouteParams {
  DOCUMENT_FOLDER_NAME = "documentFolderName",
}

export type DocumentFileStatus = {
  type: "document:upload";
  name: string;
  content_type: string;
  status: DocumentEventStatus;
};

interface DocumentPageProps {
  panel: IAppPanels;
}

export type DocumentLevels = "folder" | "file";

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
      type: "REMOVE_SELECTED_DOCUMENT_FOLDER";
      payload: string;
    }
  | {
      type: "CLEAR_SELECTED_DOCUMENT_FOLDERS";
    }
  | {
      type: "SET_CREATE_DOCUMENT_FOLDER_FORM";
      payload: CreateDocumentFolderDto;
    }
  | {
      type: "CLEAR_CREATE_DOCUMENT_FOLDER_FORM";
    }
  | {
      type: "INIT_DOCUMENT_FOLDER_FILES";
      payload: {
        documentFiles: DocumentFileEntity[] | null;
        query: UseQueryResult<GetDocumentFilesResponseDto | null, unknown>;
      };
    }
  | {
      type: "INIT_DOCUMENT_FOLDER_FILES_PARENT_FOLDER";
      payload: DocumentFolderEntity | null;
    }
  | {
      type: "SET_DOCUMENT_FOLDER_FILE_STATUS";
      payload: Record<string, DocumentFileStatus>;
    }
  | {
      type: "UPDATE_DOCUMENT_FOLDER_FILE_STATUS";
      payload: {
        eventId: string;
        status: DocumentEventStatus;
      };
    }
  | {
      type: "SET_DOCUMENT_FOLDER_PAGE";
      payload: number;
    }
  | {
      type: "SELECT_DOCUMENT_FILE";
      payload: DocumentFileEntity;
    }
  | {
      type: "REMOVE_SELECTED_DOCUMENT_FILE";
      payload: string;
    }
  | {
      type: "CLEAR_SELECTED_DOCUMENT_FILES";
    }
  | {
      type: "SET_SELECTED_DOCUMENT_FILE_PREVIEW";
      payload: DocumentFileEntity;
    }
  | {
      type: "CLEAR_SELECTED_DOCUMENT_FILE_PREVIEW";
    };
    
