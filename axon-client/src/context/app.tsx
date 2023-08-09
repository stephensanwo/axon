import { createContext, useState } from "react";

interface AppProviderProps {
  children: React.ReactNode;
}

interface AppContextProps {
  isSideNavExpanded: boolean;
  onClickSideNavExpand: React.Dispatch<React.SetStateAction<boolean>>;
  showMobileWarning: boolean;
  setShowMobileWarning: React.Dispatch<React.SetStateAction<boolean>>;
  isOnline: boolean;
  setIsOnline: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isSideNavExpanded, onClickSideNavExpand] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isSideNavExpanded,
        onClickSideNavExpand,
        showMobileWarning,
        setShowMobileWarning,
        isOnline,
        setIsOnline,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
