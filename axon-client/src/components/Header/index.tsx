import { Header as PrimerHeader } from "@primer/react";
import HeaderContext from "./HeaderContext";
import HeaderIcon from "./HeaderIcon";
import { IHeader } from "./index.types";
import HeaderBreadcrumbs from "./HeaderBreadcrumbs";
import HeaderMenus from "./HeaderMenus";

function Header({
  headerIcon,
  togglePanel,
  panelButtonRef,
  breadcrumbs,
  menus,
}: IHeader) {
  return (
    <HeaderContext.Provider
      value={{
        togglePanel,
        panelButtonRef,
        headerIcon,
      }}
    >
      <PrimerHeader
        ref={panelButtonRef}
        sx={{
          height: "48px",
          position: "absolute",
          width: "100vw",
          backgroundColor: "transparent",
        }}
      >
        <HeaderIcon></HeaderIcon>
        <PrimerHeader.Item
          full
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "300px",
          }}
        >
          <HeaderBreadcrumbs>{breadcrumbs}</HeaderBreadcrumbs>
          <HeaderMenus>{menus}</HeaderMenus>
        </PrimerHeader.Item>
      </PrimerHeader>
    </HeaderContext.Provider>
  );
}

Header.Breadcrumb = HeaderBreadcrumbs;
Header.Menus = HeaderMenus;
export default Header;
