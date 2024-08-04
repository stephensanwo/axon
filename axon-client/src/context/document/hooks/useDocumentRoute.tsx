import isNaN from "lodash/isNaN";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { DocumentFileRouteParams } from "../document.types";

export function useDocumentFileRoute(): {
  documentFolderName: string | undefined;
} {
  const { documentFolderName } = useParams<DocumentFileRouteParams>();

  return { documentFolderName };
}
