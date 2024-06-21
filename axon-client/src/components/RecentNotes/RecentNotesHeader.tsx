import { Box, Heading, useTheme } from "@primer/react";

function RecentNotesHeader() {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 10px",
      }}
    >
      <Heading
        as="h3"
        id="recent-notes"
        sx={{ fontSize: 0, color: theme?.colors.text.gray }}
      >
        Recent Notes
      </Heading>
    </Box>
  );
}

export default RecentNotesHeader;
