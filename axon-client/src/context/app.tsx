import { useSet } from "@uidotdev/usehooks";
import React, { createContext, useRef, useState } from "react";
import { IAppPanelDirections, IAppPanels } from "src/types/app";
import { NodeTypes } from "src/types/node";

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
  extensions: Set<NodeTypes>;
  panel: IAppPanels;
  openPanel: (direction: IAppPanelDirections) => void;
  closePanel: (direction: IAppPanelDirections) => void;
  togglePanel: (direction: IAppPanelDirections) => void;
  panelButtonRef: React.RefObject<HTMLButtonElement>;
  panelConfirmButtonRef: React.RefObject<HTMLButtonElement>;
  panelAnchroRef: React.RefObject<HTMLDivElement>;
}

const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [panel, setPanel] = useState<IAppPanels>({
    left: false,
    right: false,
  });
  const panelButtonRef = useRef<HTMLButtonElement>(null);
  const panelConfirmButtonRef = useRef<HTMLButtonElement>(null);
  const panelAnchroRef = useRef<HTMLDivElement>(null);

  // const openPanel = (direction: IAppPanelDirections) => {
  //   switch (direction) {
  //     case "left":
  //       setPanel({ ...panel, left: true });
  //       break;
  //     case "right":
  //       setPanel({ ...panel, right: true });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const closePanel = (direction: IAppPanelDirections) => {
  //   switch (direction) {
  //     case "left":
  //       setPanel({ ...panel, left: false });
  //       break;
  //     case "right":
  //       setPanel({ ...panel, right: false });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const openPanel = (direction: IAppPanelDirections) => {
    setPanel((prevPanel) => {
      switch (direction) {
        case "left":
          return { ...prevPanel, left: true };
        case "right":
          return { ...prevPanel, right: true };
        default:
          return prevPanel;
      }
    });
  };
  const closePanel = (direction: IAppPanelDirections) => {
    setPanel((prevPanel) => {
      switch (direction) {
        case "left":
          return { ...prevPanel, left: false };
        case "right":
          return { ...prevPanel, right: false };
        default:
          return prevPanel;
      }
    });
  };
  const togglePanel = (direction: IAppPanelDirections) => {
    setPanel((prevPanel) => ({
      ...prevPanel,
      [direction]: !prevPanel[direction],
    }));
  };

  const [isSideNavExpanded, onClickSideNavExpand] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  // TODO: Get Installed Node Types from Settings
  const extensions = useSet<NodeTypes>([]);

  return (
    <AppContext.Provider
      value={{
        panel,
        openPanel,
        closePanel,
        togglePanel,
        panelButtonRef,
        panelConfirmButtonRef,
        panelAnchroRef,
        isSideNavExpanded,
        onClickSideNavExpand,
        showMobileWarning,
        setShowMobileWarning,
        isOnline,
        setIsOnline,
        extensions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
