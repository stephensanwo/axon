import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./Resizable";
import { Box, useTheme } from "@primer/react";
import Header from "./Header";
import { LayoutProps } from "./index.types";

export default function ResizableLayout({
  leftPanel,
  middleTopPanel,
  middleBottomPanel,
  rightPanel,
  pageHeader,
}: LayoutProps) {
  const { theme } = useTheme();
  return (
    <Box className="h-screen w-screen bg-background flex">
      <Box className="flex-1 flex flex-col">
        <Header {...pageHeader} />
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
                  className={`h-full overflow-auto p-4 ${leftPanel.className}`}
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
          {middleTopPanel && middleTopPanel.enabled && (
            <ResizablePanel
              defaultSize={middleTopPanel.defaultSize}
              minSize={middleTopPanel.minSize}
              maxSize={middleTopPanel.maxSize}
            >
              <ResizablePanelGroup direction="vertical">
                {middleTopPanel && middleTopPanel.enabled && (
                  <ResizablePanel
                    defaultSize={middleTopPanel.defaultSize}
                    minSize={middleTopPanel.minSize}
                    maxSize={middleTopPanel.maxSize}
                  >
                    <Box
                      className={`h-full overflow-auto flex flex-col pl-4 pr-4 ${
                        middleTopPanel.className
                      }`}
                    >
                      {middleTopPanel.component}
                    </Box>
                  </ResizablePanel>
                )}
                {middleTopPanel && middleBottomPanel && <ResizableHandle />}
                {middleBottomPanel && middleBottomPanel.enabled && (
                  <ResizablePanel
                    defaultSize={middleBottomPanel.defaultSize}
                    minSize={middleBottomPanel.minSize}
                    maxSize={middleBottomPanel.maxSize}
                  >
                    <Box
                      className={`h-full overflow-auto p-4 ${
                        middleBottomPanel.className
                      }`}
                    >
                      {middleBottomPanel.component}
                    </Box>
                  </ResizablePanel>
                )}
              </ResizablePanelGroup>
            </ResizablePanel>
          )}
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
                  className={`h-full overflow-auto flex flex-col p-4 ${
                    rightPanel.className
                  }`}
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
