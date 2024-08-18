import { Box } from "@primer/react";

export function ProjectMain({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        pl: 3,
        pr: 3,
      }}
    >
      {children}
    </Box>
  );
}
