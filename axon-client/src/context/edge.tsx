import React, { createContext, useState } from "react";
import { EdgeMenuEvents, IEdge } from "src/types/edge";

interface EdgeProviderProps {
  children: React.ReactNode;
}

interface EdgeContextProps {
  edgeMenu: EdgeMenuEvents | null;
  setEdgeMenu: React.Dispatch<React.SetStateAction<EdgeMenuEvents | null>>;
  selectedEdge: IEdge | null;
  setSelectedEdge: React.Dispatch<React.SetStateAction<IEdge | null>>;
}

const EdgeContext = createContext({} as EdgeContextProps);

export const EdgeProvider = ({ children }: EdgeProviderProps) => {
  const [edgeMenu, setEdgeMenu] = useState<EdgeMenuEvents | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<IEdge | null>(null);
  return (
    <EdgeContext.Provider
      value={{
        edgeMenu,
        setEdgeMenu,
        selectedEdge,
        setSelectedEdge,
      }}
    >
      {children}
    </EdgeContext.Provider>
  );
};

export default EdgeContext;
