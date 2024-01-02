import { useSet } from "@uidotdev/usehooks";
import React, { createContext, useState } from "react";
import { ColorPalette, ThemeColors } from "src/shared/themes";
import { IAppSettings } from "src/types/app";
import {
  ExtendedNodeTypes,
  NodeStyleProps,
  NodeThemes,
  NodeTypes,
} from "src/types/node";

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
  defaultNodeStyles: NodeStyleProps;
  setDefaultNodeStyles: React.Dispatch<React.SetStateAction<NodeStyleProps>>;
  defaultNodeTheme: NodeThemes;
  setDefaultNodeTheme: React.Dispatch<React.SetStateAction<NodeThemes>>;
  extensions: Set<NodeTypes>;
}

const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isSideNavExpanded, onClickSideNavExpand] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [appSettings, setAppSettings] = useState<IAppSettings>({
    grid: false,
    default_node_settings: {
      node_type: "text",
    },
  });

  const [defaultNodeStyles, setDefaultNodeStyles] = useState<NodeStyleProps>({
    background_color: ColorPalette.YELLOW3.hex,
    border_color: "",
    font_color: ThemeColors.textBlack,
    font_weight: 400,
    font_alignment: "left",
    font_size: 16,
    border_style: "solid",
    border_radius: 8,
  });

  const [defaultNodeTheme, setDefaultNodeTheme] = useState<NodeThemes>({
    style: "background-fill",
    color: ColorPalette.YELLOW3.hex,
  });

  // TODO: Get Installed Node Types from Settings
  const extensions = useSet<NodeTypes>([]);

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
        defaultNodeStyles,
        setDefaultNodeStyles,
        defaultNodeTheme,
        setDefaultNodeTheme,
        extensions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
