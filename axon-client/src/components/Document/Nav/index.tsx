import { DocumentLevels } from "src/context/document/document.types";
import { Text } from "../../Common/Text";
import DocumentFileNav from "./DocumentFileNav";
import DocumentFolderNav from "./DocumentFolderNav";
import { BaseDocumentProps } from "../index.types";

function DocumentNav({
  level,
  isLoading,
  documentState,
  documentStateDispatch,
}: {
  level: DocumentLevels;
  isLoading: boolean;
} & BaseDocumentProps) {
  const fileNavTitle = `${isLoading ? "..." : documentState.documentFolderFiles.folder?.name}`;

  return (
    <>
      <DocumentFolderNav
        navTitle={"Documents"}
        documentState={documentState}
        documentStateDispatch={documentStateDispatch}
      />
      <Text.ParagraphSecondary>/</Text.ParagraphSecondary>
      {level === "file" && (
        <DocumentFileNav
          navTitle={fileNavTitle}
          documentState={documentState}
          documentStateDispatch={documentStateDispatch}
        />
      )}
    </>
  );
}

export default DocumentNav;
