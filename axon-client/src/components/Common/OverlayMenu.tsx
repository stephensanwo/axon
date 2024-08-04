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
  minHeight: number;
  maxHeight?: number;
  alignmentOffset: AnchoredOverlayProps["alignmentOffset"];
  anchorOffset: AnchoredOverlayProps["anchorOffset"];
  align: AnchoredOverlayProps["align"];
  side: AnchoredOverlayProps["side"];
  children: React.ReactNode;
  heading?: React.ReactNode;
  onOpenCallback?: () => void;
  onCloseCallback?: () => void;
};

function OverlayMenu({
  anchorComponent,
  width,
  minHeight,
  maxHeight,
  alignmentOffset,
  align,
  anchorOffset,
  side,
  children,
  heading,
  onOpenCallback,
  onCloseCallback,
}: OverlayMenuProps) {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  return (
    <AnchoredOverlay
      open={open}
      onOpen={() => {
        setOpen(true);
        if (onOpenCallback) onOpenCallback();
      }}
      onClose={() => {
        setOpen(false);
        if (onCloseCallback) onCloseCallback();
      }}
      renderAnchor={(props) => <Box {...props}>{anchorComponent}</Box>}
      alignmentOffset={alignmentOffset}
      side={side}
      align={align}
      anchorOffset={anchorOffset}
      overlayProps={{
        sx: {
          border: `1px solid ${theme?.colors.border.default}`,
          backgroundColor: theme?.colors.bg.overlay,
          borderRadius: 6,
          width: `${width}px`,
          minHeight: `${minHeight}px`,
          maxHeight: maxHeight ? `${maxHeight}px` : "auto",
        },
      }}
    >
      {heading && (
        <Box
          sx={{
            minHeight: "24px",
            display: "flex",
            alignItems: "center",
            p: 2,
            pl: 3,
            pr: 3,
            borderBottom: `1px solid ${theme?.colors.border.default}`,
          }}
        >
          {heading}
        </Box>
      )}
      <Box>{children}</Box>
    </AnchoredOverlay>
  );
}

export default OverlayMenu;
