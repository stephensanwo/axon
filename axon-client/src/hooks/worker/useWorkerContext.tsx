import { useContext } from "react";
import { WorkerContext } from "src/context/worker";

export function useWorkerContext() {
  const context = useContext(WorkerContext);
  if (!context) {
    throw new Error("useWorkerContext must be used within a WorkerProvider");
  }
  return context;
}
