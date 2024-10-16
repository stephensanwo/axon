import { Box } from "@primer/react";

export function ContentMain({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
}
