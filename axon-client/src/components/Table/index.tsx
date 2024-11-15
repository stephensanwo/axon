import { Box, useTheme } from "@primer/react";
import { Table as PrimerTable } from "@primer/react/drafts";
import {
  DataTable as PrimerDataTable,
  DataTableProps,
} from "@primer/react/experimental";
import { UniqueRow } from "@primer/react/lib/DataTable/row";
import React from "react";
import "./style.css";
import { TableSortDirection } from "./index.types";

function Table<T extends UniqueRow>({
  id,
  data,
  cellPadding,
  columns,
  title,
  subtitle,
  emptyStateMessage = "No data available",
  initialSortColumn,
  initialSortDirection = "DESC",
}: DataTableProps<T> & {
  id: string;
  title?: string;
  subtitle?: string;
  emptyStateMessage?: React.ReactNode;
  initialSortColumn?: string;
  initialSortDirection?: TableSortDirection;
}) {
  const { theme } = useTheme();
  return (
    <>
      <PrimerTable.Container>
        {title && (
          <PrimerTable.Title as="h2" id={`${id}-title`}>
            {title}
          </PrimerTable.Title>
        )}
        {subtitle && (
          <PrimerTable.Subtitle as="p" id={`${id}-subtitle`}>
            {subtitle}
          </PrimerTable.Subtitle>
        )}
        {
          <PrimerDataTable
            aria-labelledby={title}
            aria-describedby={subtitle || title}
            data={data}
            columns={columns}
            initialSortColumn={initialSortColumn}
            initialSortDirection={initialSortDirection}
            cellPadding={cellPadding}
          />
        }
      </PrimerTable.Container>
      {data.length === 0 && (
        <Box className="h-1/2 w-full flex items-center justify-center">
          {emptyStateMessage}
        </Box>
      )}
    </>
  );
}

export default Table;
