import { createContext, useState } from "react";

interface AppProviderProps {
  children: React.ReactNode;
}

interface AppContextProps {
  isSideNavExpanded: boolean;
  onClickSideNavExpand: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isSideNavExpanded, onClickSideNavExpand] = useState(false);

  return (
    <AppContext.Provider value={{ isSideNavExpanded, onClickSideNavExpand }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
