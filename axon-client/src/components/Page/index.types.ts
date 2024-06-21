import { IAppPanelDirections, IAppPanels } from "src/types/app";
import { Theme } from "src/types/theme";

export interface IPage {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  main: React.ReactNode;
  panel: IAppPanels;
  openPanel: (direction: IAppPanelDirections) => void;
  closePanel: (direction: IAppPanelDirections) => void;
  togglePanel: (direction: IAppPanelDirections) => void;
  panelButtonRef: React.RefObject<HTMLButtonElement>;
  panelConfirmButtonRef: React.RefObject<HTMLButtonElement>;
  panelAnchroRef: React.RefObject<HTMLDivElement>;
  theme: Theme | undefined;
}

export type PageContextProps = {
  panel: IAppPanels;
  openPanel: (direction: IAppPanelDirections) => void;
  closePanel: (direction: IAppPanelDirections) => void;
  theme: Theme | undefined;
};
