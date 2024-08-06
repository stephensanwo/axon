import React, { createContext, useEffect, useRef, useState } from "react";
import documentWorker from "../../worker/document.worker?worker";
import { WorkerClient } from "./worker.types";

interface WorkerProviderProps {
  children: React.ReactNode;
}

interface WorkerContextProps {
  client: WorkerClient;
}

const WorkerContext = createContext({} as WorkerContextProps);

const WorkerProvider = ({ children }: WorkerProviderProps) => {
  const document = useRef<Worker | null>(null);

  useEffect(() => {
    document.current = new documentWorker();
    return () => {
      document.current?.terminate();
    };
  }, []);

  return (
    <WorkerContext.Provider value={{ client: { document } }}>
      {children}
    </WorkerContext.Provider>
  );
};

export { WorkerProvider, WorkerContext };
