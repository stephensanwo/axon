import { IAppPanelDirections } from "src/types/app";
import { Theme } from "src/types/theme";

export interface IHeaderContextProps
  extends Pick<IHeader, "headerIcon" | "togglePanel" | "panelButtonRef"> {}

export interface IHeader {
  headerIcon: React.ReactNode;
  togglePanel: (direction: IAppPanelDirections) => void;
  panelButtonRef: React.RefObject<HTMLButtonElement>;
  breadcrumbs: React.ReactNode;
  menus: React.ReactNode;
  theme: Theme | undefined;
}
