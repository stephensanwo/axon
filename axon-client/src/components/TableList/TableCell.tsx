import { Box, useTheme } from "@primer/react";

function TableCell({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: theme?.colors.bg.default,
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
}

export default TableCell;
