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
    case "INIT_DOCUMENT_FOLDER_FILES": {
      return {
        ...state,
        documentFolderFiles: {
          ...state.documentFolderFiles,
          data: action.payload.data,
          query: action.payload.query,
        },
      };
    }
    case "INIT_DOCUMENT_FOLDER_FILES_PARENT_FOLDER": {
      return {
        ...state,
        documentFolderFiles: {
          ...state.documentFolderFiles,
          folder: action.payload,
        },
      };
    }
    case "SET_DOCUMENT_FOLDER_FILE_STATUS": {
      return {
        ...state,
        documentFolderFiles: {
          ...state.documentFolderFiles,
          fileStatus: {
            ...state.documentFolderFiles.fileStatus,
            ...action.payload,
          },
        },
      };
    }
    case "UPDATE_DOCUMENT_FOLDER_FILE_STATUS": {
      if (!state.documentFolderFiles?.fileStatus) {
        return state;
      }

      const { eventId, status } = action.payload;
      const currentFileStatus = state.documentFolderFiles.fileStatus[eventId];

      if (!currentFileStatus) {
        return state;
      }

      return {
        ...state,
        documentFolderFiles: {
          ...state.documentFolderFiles,
          fileStatus: {
            ...state.documentFolderFiles.fileStatus,
            [eventId]: {
              ...currentFileStatus,
              status,
            },
          },
        },
      };
    }
    case "SELECT_DOCUMENT_FILE": {
      return {
        ...state,
        documentFolderFiles: {
          ...state.documentFolderFiles,
          selectedDocumentFiles: [
            action.payload,
            ...state.documentFolderFiles.selectedDocumentFiles,
          ],
        },
      };
    }
    case "REMOVE_SELECTED_DOCUMENT_FILE": {
      return {
        ...state,
        documentFolderFiles: {
          ...state.documentFolderFiles,
          selectedDocumentFiles:
            state.documentFolderFiles.selectedDocumentFiles.filter(
              (file) => file.id !== action.payload
            ),
        },
      };
    }
    case "CLEAR_SELECTED_DOCUMENT_FILES": {
      return {
        ...state,
        documentFolderFiles: {
          ...state.documentFolderFiles,
          selectedDocumentFiles: [],
        },
      };
    }
    case "SET_SELECTED_DOCUMENT_FILE_PREVIEW": {
      return {
        ...state,
        documentFolderFiles: {
          ...state.documentFolderFiles,
          selectedDocumentFilePreview: action.payload,
        },
      };
    }
    case "CLEAR_SELECTED_DOCUMENT_FILE_PREVIEW": {
      return {
        ...state,
        documentFolderFiles: {
          ...state.documentFolderFiles,
          selectedDocumentFilePreview: null,
        },
      };
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}

export function layerReducer() {}
