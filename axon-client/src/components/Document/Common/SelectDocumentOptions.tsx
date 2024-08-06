import { Box } from "@primer/react";
import {
  DocumentAction,
  DocumentLevels,
  DocumentState,
} from "src/context/document/document.types";
import DeleteDocumentFolder from "../Delete/DeleteDocumentFolder";
import UpdateDocumentFolder from "../Form/UpdateDocumentFolder";
import DeleteDocumentFile from "../Delete/DeleteDocumentFile";
import { useEffect } from "react";
import DownloadDocumentFile from "../Sync/DownloadDocumentFile";

function SelectDocumentOptions({
  level,
  documentState,
  documentStateDispatch,
}: {
  level: DocumentLevels;
  documentState: DocumentState;
  documentStateDispatch: React.Dispatch<DocumentAction>;
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
