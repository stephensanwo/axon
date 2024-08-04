import { Header as PrimerHeader } from "@primer/react";
import HeaderBreadcrumbs from "./HeaderBreadcrumbs";
import HeaderMenus from "./HeaderMenus";
import { PagePanelDirections } from "../../index.types";

export interface IHeaderContextProps
  extends Pick<IHeader, "headerIcon" | "togglePanel" | "panelButtonRef"> {}

export interface IHeader {
  headerIcon: React.ReactNode;
  togglePanel: (direction: PagePanelDirections) => void;
  panelButtonRef: React.RefObject<HTMLButtonElement>;
  breadcrumbs: React.ReactNode;
  menus: React.ReactNode;
}

function Header({
  headerIcon,
  togglePanel,
  panelButtonRef,
  breadcrumbs,
  menus,
}: IHeader) {
  return (
    <PrimerHeader
      ref={panelButtonRef}
      sx={{
        height: "48px",
        position: "absolute",
        width: "100vw",
        backgroundColor: "transparent",
        p: 0,
        pl: 3,
        pr: 3,
      }}
    >
      <PrimerHeader.Item onClick={() => togglePanel("left")}>
        {headerIcon}
      </PrimerHeader.Item>
      <PrimerHeader.Item
        full
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          ml: "250px",
          mr: 0,
        }}
      >
        <HeaderBreadcrumbs>{breadcrumbs}</HeaderBreadcrumbs>
        <HeaderMenus>{menus}</HeaderMenus>
      </PrimerHeader.Item>
    </PrimerHeader>
  );
}

Header.Breadcrumb = HeaderBreadcrumbs;
Header.Menus = HeaderMenus;
export default Header;
