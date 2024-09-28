import { Box, useTheme } from "@primer/react";
import { useState } from "react";

function RightPanel({ children }: { children?: React.ReactNode }) {
  const { theme } = useTheme();
  const [panelWidth, setPanelWidth] = useState(700); // Default width of 700px

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = panelWidth;

    const doDrag = (dragEvent: MouseEvent) => {
      const newWidth = startWidth - (dragEvent.clientX - startX);
      if (newWidth >= 300 && newWidth <= 800) {
        // Set minimum and maximum width
        setPanelWidth(newWidth);
      }
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);
    };

    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);
  };
  return (
    <Box
      sx={{
        height: "100vh",
        width: `${panelWidth}px`, // Dynamically controlled width
        position: "relative",
        borderLeft: `4px solid ${theme?.colors.border.default}`, // Visible left border to drag
      }}
    >
      {/* Draggable Resizer Handle */}
      <Box
        sx={{
          position: "absolute",
          left: "-2px",
          top: 0,
          bottom: 0,
          width: "5px",
          cursor: "ew-resize", // Change cursor when hovering over resizer
          zIndex: 1,
        }}
        onMouseDown={handleMouseDown}
      />
      {children}
    </Box>
  );
}

export default RightPanel;
