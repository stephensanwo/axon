import {
  DocumentAction,
  DocumentState,
} from "src/context/document/document.types";

export type BaseDocumentProps = {
  documentState: DocumentState;
  documentStateDispatch: React.Dispatch<DocumentAction>;
};
