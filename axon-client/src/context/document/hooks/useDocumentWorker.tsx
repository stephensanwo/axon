import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDocumentFileRoute } from "src/context/document/hooks/useDocumentRoute";
import { DocumentQueryKeys } from "src/domain/document/document.entity";
import { useDocumentStore } from "../document.store";
import { useWorkerContext } from "src/context/worker";

export function useDocumentWorker<T>(): {
  postMessage: (message: T) => void;
} {
  const queryClient = useQueryClient();
  const { documentFolderName } = useDocumentFileRoute();
  const { updateFileStatus } = useDocumentStore();
  const { documentWorkerClient } = useWorkerContext();

  useEffect(() => {
    if (documentWorkerClient.current) {
      documentWorkerClient.current.onmessage = (event) => {
        console.log("Worker message received", event.data);
        updateFileStatus(event.data.eventId, event.data.status);
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
