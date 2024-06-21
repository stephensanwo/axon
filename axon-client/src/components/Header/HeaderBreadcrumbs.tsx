import { Box } from "@primer/react";

function HeaderBreadcrumbs({ children }: { children?: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {children}
    </Box>
  );
}

export default HeaderBreadcrumbs;
