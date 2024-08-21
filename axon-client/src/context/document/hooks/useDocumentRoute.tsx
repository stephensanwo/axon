import { useParams } from "react-router-dom";
import { DocumentFolderRouteParams } from "../document.types";

export function useDocumentFileRoute(): {
  documentFolderName: string | undefined;
} {
  const { documentFolderName } = useParams<DocumentFolderRouteParams>();

  return { documentFolderName };
}
