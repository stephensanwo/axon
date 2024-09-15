import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDocumentFileRoute } from "src/context/document/hooks/useDocumentRoute";
import { DocumentQueryKeys } from "src/domain/document/document.entity";
import { useDocumentContext } from "./useDocumentContext";

export function useDocumentWorker<T>(): {
  postMessage: (message: T) => void;
} {
  const queryClient = useQueryClient();
  const { documentFolderName } = useDocumentFileRoute();
  const { documentStateDispatch, documentWorkerClient } = useDocumentContext();

  useEffect(() => {
    if (documentWorkerClient.current) {
      documentWorkerClient.current.onmessage = (event) => {
        console.log("Worker message received", event.data);
        documentStateDispatch({
          type: "UPDATE_DOCUMENT_FOLDER_FILE_STATUS",
          payload: {
            eventId: event.data.eventId,
            status: event.data.status,
          },
        });
        queryClient.invalidateQueries({
          queryKey: [...DocumentQueryKeys.DOCUMENT_FOLDERS, documentFolderName],
        });
      };
    }
  }, [documentWorkerClient.current]);

  const postMessage = useCallback((message: any) => {
    documentWorkerClient.current?.postMessage(message);
  }, []);

  return { postMessage };
}
