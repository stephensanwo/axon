import { Box, Overlay } from "@primer/react";
import LeftPanel from "src/components/Page/LeftPanel";
import RightPanel from "src/components/Page/RightPanel";
import PageContext from "./PageContext";
import PageMain from "./PageMain";
import { IPage } from "./index.types";

function Page({
  leftPanel,
  rightPanel,
  main,
  openPanel,
  closePanel,
  panel,
  panelButtonRef,
  panelConfirmButtonRef,
  panelAnchroRef,
  theme,
}: IPage) {
  return (
    <PageContext.Provider
      value={{
        panel,
        openPanel,
        closePanel,
        theme,
      }}
    >
      <Box ref={panelAnchroRef}>
        {panel.left && (
          <Overlay
            initialFocusRef={panelConfirmButtonRef}
            returnFocusRef={panelButtonRef}
            ignoreClickRefs={[panelButtonRef]}
            onEscape={() => closePanel("left")}
            onClickOutside={() => closePanel("left")}
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
            initialFocusRef={panelConfirmButtonRef}
            returnFocusRef={panelButtonRef}
            ignoreClickRefs={[panelButtonRef]}
            onEscape={() => closePanel("right")}
            // onClickOutside={() => closePanel("right")}
            onClickOutside={() => {}}
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
    </PageContext.Provider>
  );
}

Page.Left = LeftPanel;
Page.Right = RightPanel;
Page.Main = PageMain;

export default Page;
