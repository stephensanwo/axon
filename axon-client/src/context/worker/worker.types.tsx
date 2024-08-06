export type WorkerState = "IDLE" | "RUNNING" | null;

type WorkerClientId = "document";

type WorkerClientData = React.MutableRefObject<Worker | null>;

export type WorkerClient = Record<WorkerClientId, WorkerClientData>;

export interface WorkerEvent<Type, Data> {
  eventType: Type;
  eventData: Data;
}
