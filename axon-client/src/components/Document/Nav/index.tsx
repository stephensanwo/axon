import { DocumentLevels } from "src/context/document/document.types";
import { Text } from "../../Common/Text";
import DocumentFileNav from "./DocumentFileNav";
import DocumentFolderNav from "./DocumentFolderNav";
import { BaseDocumentProps } from "../index.types";

function DocumentNav({
  level,
  documentFiles,
  documentFolders,
}: {
  level: DocumentLevels;
} & BaseDocumentProps) {
  const fileNavTitle = `${documentFiles.isLoading ? "..." : documentFiles.data ? documentFiles.data.folder?.name : ""}`;

  return (
    <>
      <DocumentFolderNav
        navTitle={"Documents"}
        documentFiles={documentFiles}
        documentFolders={documentFolders}
      />
      <Text.ParagraphSecondary>/</Text.ParagraphSecondary>
      {level === "file" && fileNavTitle && (
        <DocumentFileNav
          navTitle={fileNavTitle}
          documentFiles={documentFiles}
          documentFolders={documentFolders}
        />
      )}
    </>
  );
}

export default DocumentNav;
