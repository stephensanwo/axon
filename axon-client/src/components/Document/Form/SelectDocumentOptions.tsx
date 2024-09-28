import { Box } from "@primer/react";
import { DocumentLevels } from "src/context/document/document.types";
import DeleteDocumentFolder from "./DeleteDocumentFolder";
import UpdateDocumentFolder from "./UpdateDocumentFolder";
import DeleteDocumentFile from "./DeleteDocumentFile";
import { useEffect } from "react";
import DownloadDocumentFile from "../Sync/DownloadDocumentFile";
import { BaseDocumentProps } from "../index.types";

function SelectDocumentOptions({
  level,
  documentState,
  documentStateDispatch,
}: BaseDocumentProps & {
  level: DocumentLevels;
}) {
  const {
    documentFolders: { selectedDocumentFolders },
    documentFolderFiles: { selectedDocumentFiles },
  } = documentState;

  const data =
    level === "folder" ? selectedDocumentFolders : selectedDocumentFiles;

  useEffect(() => {
    documentStateDispatch({
      type: "CLEAR_SELECTED_DOCUMENT_FILES",
    });
    documentStateDispatch({
      type: "CLEAR_SELECTED_DOCUMENT_FOLDERS",
    });
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      {level === "folder" && data.length === 1 && (
        <UpdateDocumentFolder
          documentState={documentState}
          documentStateDispatch={documentStateDispatch}
        />
      )}
      {level === "folder" && data.length > 0 && (
        <DeleteDocumentFolder
          documentState={documentState}
          documentStateDispatch={documentStateDispatch}
        />
      )}
      {level === "file" && data.length > 0 && (
        <DownloadDocumentFile
          documentState={documentState}
          documentStateDispatch={documentStateDispatch}
        />
      )}
      {level === "file" && data.length > 0 && (
        <DeleteDocumentFile
          documentState={documentState}
          documentStateDispatch={documentStateDispatch}
        />
      )}
    </Box>
  );
}

export default SelectDocumentOptions;
