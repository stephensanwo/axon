import DocumentEmpty from "./DocumentEmpty";
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
