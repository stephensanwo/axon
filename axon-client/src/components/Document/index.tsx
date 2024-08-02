import DocumentEmpty from "./DocumentEmpty";
import DocumentFooter from "./DocumentFooter";
import DocumentHeader from "./Header/DocumentFileHeader";
import DocumentList from "./List/DocumentFileList";
import { DocumentMain } from "./DocumentMain";
import DocumentNav from "./Nav";
import DocumentPreview from "./DocumentPreview";
import DocumentFolderList from "./List/DocumentFolderList";
import DocumentFolderHeader from "./Header/DocumentFolderHeader";
import DocumentFileHeader from "./Header/DocumentFileHeader";
import DocumentFileList from "./List/DocumentFileList";

export const Document = {
  Main: DocumentMain,
  Nav: DocumentNav,
  Footer: DocumentFooter,
  Preview: DocumentPreview,
  Empty: DocumentEmpty,
};

export const DocumentFolder = {
  Header: DocumentFolderHeader,
  List: DocumentFolderList,
};

export const DocumentFile = {
  Header: DocumentFileHeader,
  List: DocumentFileList,
};
