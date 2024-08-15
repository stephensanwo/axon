import { Box, Text, Tooltip, useTheme } from "@primer/react";
import React from "react";
import { TableListHeaderProps } from "./index.types";

function TableListHeaderContainer({ children }: React.PropsWithChildren<{}>) {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1px",
        margin: 0,
        backgroundColor: theme?.colors.border.default,
        paddingTop: "1px",
        paddingLeft: "1px",
        paddingRight: "1px",
        paddingBottom: "1px",
      }}
    >
      {children}
    </Box>
  );
}

function TableListHeader({
  data,
  gridTemplateColumns,
  actions,
}: TableListHeaderProps) {
  const { theme } = useTheme();
  return (
    <TableListHeaderContainer>
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
        {data.map((item, index) =>
          item.tooltip ? (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: theme?.colors.bg.default,
              }}
            >
              <Tooltip {...item.tooltip}>
                <Text
                  sx={{
                    color: theme?.colors.text.gray,
                    fontSize: "12px",
                    fontFamily: theme?.fonts.mono,
                    fontWeight: "bold",
                    padding: "0 8px",
                    cursor: "default",
                  }}
                >
                  {item.name}
                </Text>
              </Tooltip>
            </Box>
          ) : (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: theme?.colors.bg.default,
              }}
            >
              <Text
                sx={{
                  color: theme?.colors.text.gray,
                  fontSize: "12px",
                  fontFamily: theme?.fonts.mono,
                  fontWeight: "bold",
                  padding: "0 8px",
                }}
              >
                {item.name}
              </Text>
            </Box>
          )
        )}
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
            >
              {action}
            </Box>
          ))}
      </Box>
    </TableListHeaderContainer>
  );
}

export default TableListHeader;
