import {
  AnchoredOverlay,
  AnchoredOverlayProps,
  Box,
  useTheme,
} from "@primer/react";
import React, { Fragment, useState } from "react";
import { Text } from "./Text";

type OverlayMenuProps = {
  anchorComponent: React.ReactNode;
  width: number;
  height: number;
  alignmentOffset: AnchoredOverlayProps["alignmentOffset"];
  anchorOffset: AnchoredOverlayProps["anchorOffset"];
  side: AnchoredOverlayProps["side"];
  children: React.ReactNode;
  heading: React.ReactNode;
};

function OverlayMenu({
  anchorComponent,
  width,
  height,
  alignmentOffset,
  anchorOffset,
  side,
  children,
  heading,
}: OverlayMenuProps) {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  return (
    <AnchoredOverlay
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderAnchor={(props) => <Box {...props}>{anchorComponent}</Box>}
      alignmentOffset={alignmentOffset}
      side={side}
      anchorOffset={anchorOffset}
      overlayProps={{
        sx: {
          border: `1px solid ${theme?.colors.border.default}`,
          backgroundColor: theme?.colors.bg.overlay,
          borderRadius: 6,
          width: `${width}px`,
          height: `${height}px`,
        },
      }}
    >
      <Box
        sx={{
          height: "48px",
          display: "flex",
          alignItems: "center",
          padding: 2,
          borderBottom: `1px solid ${theme?.colors.border.default}`,
        }}
      >
        {heading}
      </Box>
      <Box>{children}</Box>
    </AnchoredOverlay>
  );
}

export default OverlayMenu;
