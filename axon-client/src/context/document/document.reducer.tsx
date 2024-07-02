import { DocumentAction, DocumentState } from "./document.types";

export function documentReducer(
  state: DocumentState,
  action: DocumentAction
): DocumentState {
  switch (action.type) {
    case "INIT_DOCUMENTS": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "ADD_DOCUMENT": {
      return {
        ...state,
        documents: [...state.documents, action.payload],
      };
    }
    case "UPDATE_DOCUMENT": {
      return {
        ...state,
        documents: state.documents.map((doc) =>
          doc.id === action.payload.id ? action.payload : doc
        ),
      };
    }
    case "DELETE_DOCUMENT": {
      return {
        ...state,
        documents: state.documents.filter((doc) => doc.id !== action.payload),
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
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}

export function layerReducer() {}
