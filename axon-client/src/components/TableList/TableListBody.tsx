import { Box, useTheme } from "@primer/react";
import { TableListBodyProps } from "./index.types";

function TableListBody({ children }: TableListBodyProps) {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1px",
        margin: 0,
        backgroundColor: theme?.colors.border.default,
        maxHeight: "429px",
        overflowY: "auto",
        paddingLeft: "1px",
        paddingRight: "1px",
        paddingBottom: "1px",
        scrollbarWidth: "none",
      }}
    >
      {children}
    </Box>
  );
}

export default TableListBody;
