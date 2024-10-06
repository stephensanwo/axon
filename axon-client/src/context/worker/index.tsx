import React, { createContext, useContext, useEffect, useRef } from "react";
import documentWorker from "src/worker/document.worker?worker";

interface WorkerProviderProps {
  children: React.ReactNode;
}

interface WorkerContextProps {
  documentWorkerClient: React.MutableRefObject<Worker | null>;
}

const WorkerContext = createContext({} as WorkerContextProps);

const WorkerProvider = ({ children }: WorkerProviderProps) => {
  // Document Worker
  const documentWorkerClient = useRef<Worker | null>(null);

  useEffect(() => {
    documentWorkerClient.current = new documentWorker();
    return () => {
      documentWorkerClient.current?.terminate();
    };
  }, []);

  return (
    <WorkerContext.Provider
      value={{
        documentWorkerClient: documentWorkerClient,
      }}
    >
      {children}
    </WorkerContext.Provider>
  );
};

function useWorkerContext() {
  const context = useContext(WorkerContext);
  if (!context) {
    throw new Error("useWorkerContext must be used within a WorkerProvider");
  }
  return context;
}

export { WorkerProvider, useWorkerContext };
