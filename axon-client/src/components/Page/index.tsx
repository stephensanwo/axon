import { Box, Overlay, useTheme } from "@primer/react";
import LeftPanel from "src/components/Page/components/LeftPanel";
import PageMain from "./components/PageMain";
import PageFooter from "./components/PageFooter";
import RightPanel from "./components/RightPanel";
import AppIcon from "../AppIcon";
import HeaderBreadcrumbs from "../Header/HeaderBreadcrumbs";
import Header from "./components/Header";
import { PageProps } from "./index.types";

function Page({
  leftPanel,
  rightPanel,
  main,
  footer,
  header: { breadcrumb, menus },
  panel,
  togglePanel,
  initialFocusRef,
  returnFocusRef,
  ignoreClickRefs,
  closeOnClickOutside = false,
}: PageProps) {
  const { theme } = useTheme();
  return (
    <>
      <Header
        togglePanel={togglePanel}
        panelButtonRef={returnFocusRef}
        headerIcon={<AppIcon />}
        breadcrumbs={<HeaderBreadcrumbs>{breadcrumb}</HeaderBreadcrumbs>}
        menus={menus}
      ></Header>
      <Box>
        {panel.left && (
          <Overlay
            initialFocusRef={initialFocusRef}
            returnFocusRef={returnFocusRef}
            ignoreClickRefs={ignoreClickRefs}
            onEscape={() => togglePanel("left", "close")}
            onClickOutside={() => togglePanel("left", "close")}
            width="auto"
            anchorSide="inside-right"
            sx={{
              borderRadius: "0px",
              backgroundColor: theme?.colors.bg.default,
              borderRight: `1px solid ${theme?.colors.border.default}`,
              maxHeight: "100vh",
            }}
          >
            <LeftPanel>
              <LeftPanel.Body>{leftPanel}</LeftPanel.Body>
            </LeftPanel>
          </Overlay>
        )}
        {panel.right && (
          <Overlay
            initialFocusRef={initialFocusRef}
            returnFocusRef={returnFocusRef}
            ignoreClickRefs={ignoreClickRefs}
            onEscape={() => togglePanel("right", "close")}
            onClickOutside={() =>
              closeOnClickOutside && togglePanel("right", "close")
            }
            width="auto"
            anchorSide={"inside-left"}
            right={0}
            position="fixed"
            sx={{
              borderRadius: "0px",
              backgroundColor: theme?.colors.bg.default,
              borderLeft: `1px solid ${theme?.colors.border.default}`,
              paddingTop: "48px",
            }}
          >
            <RightPanel>{rightPanel}</RightPanel>
          </Overlay>
        )}
      </Box>
      <PageMain>{main}</PageMain>
      {footer && <PageFooter>{footer}</PageFooter>}
    </>
  );
}

Page.Left = LeftPanel;
Page.Right = RightPanel;
Page.Main = PageMain;
Page.Footer = PageFooter;

export default Page;
