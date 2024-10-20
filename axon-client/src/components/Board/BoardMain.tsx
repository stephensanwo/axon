import { Box } from "@primer/react";

export function BoardMain({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
      }}
    >
      {children}
    </Box>
  );
}
