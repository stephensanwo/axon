import { createContext, useEffect, useState } from "react";
import { User } from "../types/user";

interface AppProviderProps {
  children: React.ReactNode;
}

interface AppContextProps {
  isSideNavExpanded: boolean;
  onClickSideNavExpand: React.Dispatch<React.SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  showMobileWarning: boolean;
  setShowMobileWarning: React.Dispatch<React.SetStateAction<boolean>>;
  isOnline: boolean;
  setIsOnline: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isSideNavExpanded, onClickSideNavExpand] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [user, setUser] = useState<User>();

  return (
    <AppContext.Provider
      value={{
        isSideNavExpanded,
        onClickSideNavExpand,
        isSignedIn,
        setIsSignedIn,
        showMobileWarning,
        setShowMobileWarning,
        isOnline,
        setIsOnline,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
