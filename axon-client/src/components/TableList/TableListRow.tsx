import React from "react";
import { TableListRowProps } from "./index.types";
import { Box } from "@primer/react";

function TableListRow({ gridTemplateColumns, data }: TableListRowProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: gridTemplateColumns,
        width: "100%",
        gap: "1px",
      }}
    >
      {data.map((item, index) => (
        <Box key={index}>{item.renderCell}</Box>
      ))}
    </Box>
  );
}

export default TableListRow;
