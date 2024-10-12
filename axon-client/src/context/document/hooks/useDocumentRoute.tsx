import { useParams, useSearchParams } from "react-router-dom";
import { DocumentFolderRouteParams } from "../document.types";

export function useDocumentFileRoute(): {
  documentFolderName: string;
  documentPreviewFileId: string;
  updateDocumentFileRouteSearchParams: (key: string, value: string) => void;
  clearDocumentFileRouteSearchParams: (key: string) => void;
} {
  const { documentFolderName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const documentPreviewFileId =
    searchParams.get(DocumentFolderRouteParams.DOCUMENT_FILE_PREVIEW) ?? "";

  function updateDocumentFileRouteSearchParams(key: string, value: string) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, value);
    setSearchParams(updatedParams);
  }

  function clearDocumentFileRouteSearchParams(key: string) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete(key);
    setSearchParams(updatedParams);
  }

  return {
    documentFolderName: documentFolderName ?? "",
    documentPreviewFileId,
    updateDocumentFileRouteSearchParams,
    clearDocumentFileRouteSearchParams,
  };
}
