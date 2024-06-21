import { Box, Heading, useTheme } from "@primer/react";

function SharedNotesHeader() {
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
        id="shared-notes"
        sx={{ fontSize: 0, color: theme?.colors.text.gray }}
      >
        Shared Notes
      </Heading>
    </Box>
  );
}

export default SharedNotesHeader;
