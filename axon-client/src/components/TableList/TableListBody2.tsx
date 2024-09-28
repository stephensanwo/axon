import { Box, Text, Tooltip, useTheme } from "@primer/react";
import React from "react";
import { TableListHeaderProps } from "./index.types";

function TableListBodyContainer({ children }: React.PropsWithChildren<{}>) {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1px",
        margin: 0,
        backgroundColor: theme?.colors.border.default,
        // paddingTop: "1px",
        paddingLeft: "1px",
        paddingRight: "1px",
        paddingBottom: "1px",
      }}
    >
      {children}
    </Box>
  );
}

function TableListBody2({
  data,
  gridTemplateColumns,
  actions,
  children,
}: TableListHeaderProps) {
  const { theme } = useTheme();
  return (
    <TableListBodyContainer>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: gridTemplateColumns,
          width: "100%",
          gap: "1px",
          minHeight: "32px",
          position: "sticky",
          top: "0",
        }}
      >
        {children}
        {actions &&
          actions.map((action, index) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme?.colors.bg.default,
                width: "32px",
              }}
              key={index}
            >
              {action}
            </Box>
          ))}
      </Box>
    </TableListBodyContainer>
  );
}

export default TableListBody2;
