import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./Resizable";
import { Box, IconButton, useTheme } from "@primer/react";
import AppIcon from "../AppIcon";
import Drawer from "../Drawer";
import Nav from "../Nav";
import { LayoutProps } from "./index.types";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function ResizableLayout({
  leftPanel,
  middleTopPanel,
  middleBottomPanel,
  rightPanel,
  pageNavContent,
  pageHeader,
}: LayoutProps) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  return (
    <Box className="h-screen w-screen bg-background flex">
      <Box className="flex-1 flex flex-col">
        <header
          className="flex items-center justify-between px-4 h-12 bg-background shrink-0"
          style={{
            borderBottom: `1px solid ${theme?.colors.border.default}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "10%",
            }}
          >
            <Drawer trigger={<AppIcon />} content={<Nav />} />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <IconButton
                  icon={() => <PiArrowLeft size={16} />}
                  onClick={() => navigate(-1)}
                  aria-label="Back"
                  variant="invisible"
                  sx={{
                    flexShrink: 0,
                  }}
                />
                <IconButton
                  icon={() => <PiArrowRight size={16} />}
                  onClick={() => navigate(1)}
                  aria-label="Forward"
                  variant="invisible"
                  sx={{
                    flexShrink: 0,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {pageHeader?.breadcrumb}
              </Box>
            </Box>
            <Box>{pageHeader?.menus}</Box>
          </Box>
        </header>
        <ResizablePanelGroup direction="horizontal" className="flex-grow">
          {leftPanel && leftPanel.enabled && (
            <>
              <ResizablePanel
                defaultSize={leftPanel.defaultSize}
                minSize={leftPanel.minSize}
                maxSize={leftPanel.maxSize}
                collapsible={leftPanel.collapsible}
                onCollapse={leftPanel.onCollapse}
                onExpand={leftPanel.onExpand}
              >
                <Box
                  className="h-full overflow-auto p-4"
                  style={{
                    borderRight: `1px solid ${theme?.colors.border.default}`,
                  }}
                >
                  {leftPanel.component}
                </Box>
              </ResizablePanel>
              <ResizableHandle />
            </>
          )}
          <ResizablePanel defaultSize={50} minSize={30}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50} minSize={20}>
                <Box className="h-full overflow-auto flex flex-col">
                  <Box className="pl-4 pr-4">{middleTopPanel}</Box>
                </Box>
              </ResizablePanel>
              {middleTopPanel && middleBottomPanel && <ResizableHandle />}
              {middleBottomPanel && (
                <ResizablePanel defaultSize={50} minSize={20}>
                  <Box className="h-full overflow-auto p-4">
                    {middleBottomPanel}
                  </Box>
                </ResizablePanel>
              )}
            </ResizablePanelGroup>
          </ResizablePanel>
          {rightPanel && rightPanel.enabled && (
            <>
              <ResizableHandle />
              <ResizablePanel
                defaultSize={rightPanel.defaultSize}
                minSize={rightPanel.minSize}
                maxSize={rightPanel.maxSize}
                collapsible={rightPanel.collapsible}
                onCollapse={rightPanel.onCollapse}
                onExpand={rightPanel.onExpand}
              >
                <Box
                  className="h-full overflow-auto p-4"
                  style={{
                    borderLeft: `1px solid ${theme?.colors.border.default}`,
                  }}
                >
                  {rightPanel?.component}
                </Box>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </Box>
    </Box>
  );
}
