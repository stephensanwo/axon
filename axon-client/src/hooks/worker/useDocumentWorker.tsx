import { useCallback, useEffect } from "react";
import { useWorkerContext } from "./useWorkerContext";
import { useDocumentContext } from "../../context/document/hooks/useDocumentContext";
import { useQueryClient } from "@tanstack/react-query";
import { useDocumentFileRoute } from "src/context/document/hooks/useDocumentRoute";
import { DocumentQueryKeys } from "src/domain/document/document.entity";

export function useDocumentWorker<T>(): {
  postMessage: (message: T) => void;
} {
  const {
    client: { document },
  } = useWorkerContext();
  const queryClient = useQueryClient();
  const { documentFolderName } = useDocumentFileRoute();
  const { documentState, documentStateDispatch } = useDocumentContext();

  useEffect(() => {
    if (document.current) {
      document.current.onmessage = (event) => {
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
  }, [document.current]);

  const postMessage = useCallback((message: any) => {
    document.current?.postMessage(message);
  }, []);

  return { postMessage };
}
