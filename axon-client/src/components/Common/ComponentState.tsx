export type ComponentStateType = "empty" | "loading" | "error" | "success";

export type ComponentState = Record<ComponentStateType, React.ReactNode>;
