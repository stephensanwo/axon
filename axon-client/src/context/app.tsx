import React, { createContext, useState } from "react";
import { Message } from "src/api/events/socket";
import useEventSocket from "src/hooks/events/useEventSocket";
import { ColorPalette, ThemeColors } from "src/shared/themes";
import { IAppSettings } from "src/types/app";
import { NodeStyleProps } from "src/types/notes";

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
  appSettings: IAppSettings;
  setAppSettings: React.Dispatch<React.SetStateAction<IAppSettings>>;
  defaultNodeTheme: NodeStyleProps;
  setDefaultNodeTheme: React.Dispatch<React.SetStateAction<NodeStyleProps>>;
  isAutoSave: boolean;
  sendMessage: (message: Message) => void;
}

const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isSideNavExpanded, onClickSideNavExpand] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [appSettings, setAppSettings] = useState<IAppSettings>({
    grid: false,
  });

  const { isAutoSave, sendMessage } = useEventSocket();

  const [defaultNodeTheme, setDefaultNodeTheme] = useState<NodeStyleProps>({
    node_background_color: ColorPalette.ORANGE1.hex,
    node_border_color: "",
    font_color: ThemeColors.textBlack,
  });

  return (
    <AppContext.Provider
      value={{
        isSideNavExpanded,
        onClickSideNavExpand,
        showMobileWarning,
        setShowMobileWarning,
        isOnline,
        setIsOnline,
        appSettings,
        setAppSettings,
        defaultNodeTheme,
        setDefaultNodeTheme,
        isAutoSave,
        sendMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
