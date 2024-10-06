import { Box } from "@primer/react";
import { DocumentLevels } from "src/context/document/document.types";
import DeleteDocumentFolder from "./DeleteDocumentFolder";
import UpdateDocumentFolder from "./UpdateDocumentFolder";
import DeleteDocumentFile from "./DeleteDocumentFile";
import { useEffect } from "react";
import DownloadDocumentFile from "../Sync/DownloadDocumentFile";
import { useDocumentStore } from "src/context/document/document.store";

function SelectDocumentOptions({ level }: { level: DocumentLevels }) {
  const {
    selectedDocumentFolders,
    selectedDocumentFiles,
    setSelectedDocumentFolders,
    setSelectedDocumentFiles,
  } = useDocumentStore();

  const data =
    level === "folder" ? selectedDocumentFolders : selectedDocumentFiles;

  useEffect(() => {
    setSelectedDocumentFiles([]);
    setSelectedDocumentFolders([]);
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
      {level === "folder" && data?.length === 1 && <UpdateDocumentFolder />}
      {level === "folder" && data?.length!! > 0 && <DeleteDocumentFolder />}
      {level === "file" && data?.length!! > 0 && <DownloadDocumentFile />}
      {level === "file" && data?.length!! > 0 && <DeleteDocumentFile />}
    </Box>
  );
}

export default SelectDocumentOptions;
