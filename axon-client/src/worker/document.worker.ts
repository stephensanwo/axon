// document.worker.ts

import { DocumentEventPayload } from "src/domain/document/document.entity";
import documentService from "src/domain/document/document.service";

const DOCUMENT_QUEUE: DocumentEventPayload[] = [];
let WORKER_STATE: "IDLE" | "RUNNING" = "IDLE";

self.addEventListener("message", async (event) => {
  console.log("Document message received from main thread:", event.data);
  DOCUMENT_QUEUE.push(event.data as DocumentEventPayload);

  if (WORKER_STATE !== "RUNNING") {
    WORKER_STATE = "RUNNING";
    await processDocumentQueue();
  }
});

async function processDocumentQueue() {
  while (DOCUMENT_QUEUE.length > 0) {
    const currentMessages = [...DOCUMENT_QUEUE];
    DOCUMENT_QUEUE.length = 0; // Clear the queue

    // Process all messages in parallel
    await Promise.all(
      currentMessages.map(async (message) => {
        await processDocumentMessage(message);
      })
    );
  }
  WORKER_STATE = "IDLE";
  self.postMessage("IDLE");
}

async function processDocumentMessage(message: DocumentEventPayload) {
  // Simulate asynchronous message processing
  console.log("Processing document event in worker", message);
  const eventResponse = await documentService.processDocumentEvent(message);
  // Send a DONE message after processing the current batch
  self.postMessage(eventResponse);
  // return new Promise<void>((resolve) => {
  //   setTimeout(async () => {
  //     await documentService.processDocumentEvent(message);
  //     resolve();
  //   }, 1000); // Simulate a delay for processing
  // });
}

export default {};
