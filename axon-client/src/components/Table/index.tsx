import { Box, useTheme } from "@primer/react";
import { Table as PrimerTable } from "@primer/react/drafts";
import {
  DataTable as PrimerDataTable,
  DataTableProps,
} from "@primer/react/experimental";
import { UniqueRow } from "@primer/react/lib/DataTable/row";
import React from "react";
import "./style.css";
import { TableSortDirection, TableState } from "./index.types";

function Table<T extends UniqueRow>({
  id,
  state,
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
  state: TableState;
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
        {state === "loading" && (
          <PrimerTable.Skeleton
            aria-labelledby={title}
            aria-describedby={subtitle || title}
            columns={columns}
            rows={10}
            cellPadding={cellPadding}
          />
        )}
        {state === "empty" && (
          <PrimerDataTable
            aria-labelledby={title}
            aria-describedby={subtitle || title}
            data={[]}
            columns={columns}
            initialSortColumn={initialSortColumn}
            initialSortDirection={initialSortDirection}
            cellPadding={cellPadding}
          />
        )}
        {state === "data" && data.length > 0 && (
          <PrimerDataTable
            aria-labelledby={title}
            aria-describedby={subtitle || title}
            data={data}
            columns={columns}
            initialSortColumn={initialSortColumn}
            initialSortDirection={initialSortDirection}
            cellPadding={cellPadding}
          />
        )}
      </PrimerTable.Container>
      {state === "empty" && (
        <Box
          sx={{
            minHeight: `calc(41px * 10)`,
            borderLeft: `1px solid ${theme?.colors.border.default}`,
            borderRight: `1px solid ${theme?.colors.border.default}`,
            borderBottom: `1px solid ${theme?.colors.border.default}`,
            borderRadius: "0 0 6px 6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {emptyStateMessage}
        </Box>
      )}
    </>
  );
}

export default Table;
