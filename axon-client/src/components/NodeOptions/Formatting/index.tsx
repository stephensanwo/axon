import { Box } from "@primer/react";
import React from "react";

function Formatting() {
  return (
    <Box
      sx={{
        backgroundColor: "red",
        height: "100%",
      }}
    >
      Formatting
      <Box>Text Formatting</Box>
      <Box>Color</Box>
      <Box>Alignment</Box>
      <Box>Border</Box>
    </Box>
  );
}

export default Formatting;
