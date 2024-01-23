import React, { createContext } from "react";

interface EdgeProviderProps {
  children: React.ReactNode;
}

interface EdgeContextProps {}

const EdgeContext = createContext({} as EdgeContextProps);

export const EdgeProvider = ({ children }: EdgeProviderProps) => {
  return <EdgeContext.Provider value={{}}>{children}</EdgeContext.Provider>;
};

export default EdgeContext;
