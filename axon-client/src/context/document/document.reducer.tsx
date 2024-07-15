import { DocumentFolderEntity } from "src/domain/document/document.entity";
import { DocumentAction, DocumentState } from "./document.types";

export function documentReducer(
  state: DocumentState,
  action: DocumentAction
): DocumentState {
  switch (action.type) {
    case "INIT_DOCUMENT_FOLDERS": {
      return {
        ...state,
        documentFolders: {
          ...state.documentFolders,
          data: action.payload.documentFolders,
          query: action.payload.query,
        },
      };
    }
    case "ADD_DOCUMENT_FOLDER": {
      return {
        ...state,
        documentFolders: {
          ...state.documentFolders,
          data: [action.payload, ...state.documentFolders.data],
        },
      };
    }
    case "UPDATE_DOCUMENT_FOLDER": {
      return {
        ...state,
        documentFolders: {
          ...state.documentFolders,
          data: state.documentFolders.data.map((folder) =>
            folder.id === action.payload.id ? action.payload : folder
          ),
        },
      };
    }
    case "DELETE_DOCUMENT_FOLDER": {
      return {
        ...state,
        documentFolders: {
          ...state.documentFolders,
          data: state.documentFolders.data.filter(
            (folder) => folder.id !== action.payload
          ),
        },
      };
    }
    case "OPEN_DOCUMENT_PAGE_PANEL": {
      return {
        ...state,
        documentPage: {
          ...state.documentPage,
          panel: {
            ...state.documentPage.panel,
            [action.payload]: true,
          },
        },
      };
    }
    case "CLOSE_DOCUMENT_PAGE_PANEL": {
      return {
        ...state,
        documentPage: {
          ...state.documentPage,
          panel: {
            ...state.documentPage.panel,
            [action.payload]: false,
          },
        },
      };
    }
    case "SELECT_DOCUMENT_FOLDER": {
      return {
        ...state,
        documentFolders: {
          ...state.documentFolders,
          selectedDocumentFolders: [
            action.payload,
            ...state.documentFolders.selectedDocumentFolders,
          ],
        },
      };
    }
    case "SELECT_DOCUMENT_FOLDERS": {
      return {
        ...state,
        documentFolders: {
          ...state.documentFolders,
          selectedDocumentFolders: action.payload,
        },
      };
    }
    case "REMOVE_SELECTED_DOCUMENT_FOLDER": {
      return {
        ...state,
        documentFolders: {
          ...state.documentFolders,
          selectedDocumentFolders:
            state.documentFolders.selectedDocumentFolders.filter(
              (folder) => folder.id !== action.payload
            ),
        },
      };
    }
    case "CLEAR_SELECTED_DOCUMENT_FOLDERS": {
      return {
        ...state,
        documentFolders: {
          ...state.documentFolders,
          selectedDocumentFolders: [],
        },
      };
    }
    case "SET_CREATE_DOCUMENT_FOLDER_FORM": {
      return {
        ...state,
        documentFolders: {
          ...state.documentFolders,
          createDocumentFolderForm: action.payload,
        },
      };
    }
    case "CLEAR_CREATE_DOCUMENT_FOLDER_FORM": {
      return {
        ...state,
        documentFolders: {
          ...state.documentFolders,
          createDocumentFolderForm: null,
        },
      };
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}

export function layerReducer() {}
