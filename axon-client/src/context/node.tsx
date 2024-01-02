import React, { createContext, useState } from "react";
import { NodeMenuEvents } from "src/types/node";

interface NodeProviderProps {
  children: React.ReactNode;
}

interface NodeContextProps {
  globalNodeMutex: boolean;
  toggleGlobalNodeMutex: React.Dispatch<React.SetStateAction<boolean>>;
  nodeMenu: NodeMenuEvents | null;
  setNodeMenu: React.Dispatch<React.SetStateAction<NodeMenuEvents | null>>;
}

const NodeContext = createContext({} as NodeContextProps);

export const NodeProvider = ({ children }: NodeProviderProps) => {
  const [globalNodeMutex, toggleGlobalNodeMutex] = useState(false);
  const [nodeMenu, setNodeMenu] = useState<NodeMenuEvents | null>(null);
  return (
    <NodeContext.Provider
      value={{
        globalNodeMutex,
        toggleGlobalNodeMutex,
        nodeMenu,
        setNodeMenu,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};

export default NodeContext;
