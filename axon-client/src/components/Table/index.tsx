import { Box, Text, useTheme } from "@primer/react";
import { Table as PrimerTable } from "@primer/react/drafts";
import {
  DataTable as PrimerDataTable,
  DataTableProps,
} from "@primer/react/experimental";
import { UniqueRow } from "@primer/react/lib/DataTable/row";
import React from "react";

function Table<T extends UniqueRow>({
  id,
  data,
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
  emptyStateMessage?: string;
  initialSortColumn?: string;
  initialSortDirection?: "ASC" | "DESC";
}) {
  const pageSize = 10;
  const [pageIndex, setPageIndex] = React.useState(0);
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const rows = Array.from(data.slice(start, end));

  // const rows = Array.from(data.slice(start, end)).sort((a, b) => {
  //   return a.id.localeCompare(b.id);
  // });
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
        <PrimerDataTable
          aria-labelledby={title}
          aria-describedby={subtitle || title}
          data={rows}
          columns={columns}
          initialSortColumn={initialSortColumn}
          initialSortDirection={initialSortDirection}
        />
        {data.length > 0 && (
          <PrimerTable.Pagination
            aria-label="Table Pagination"
            defaultPageIndex={0}
            pageSize={pageSize}
            totalCount={data.length}
            onChange={({ pageIndex }) => {
              setPageIndex(pageIndex);
            }}
          />
        )}
      </PrimerTable.Container>
      {data.length === 0 && (
        <Box
          sx={{
            minHeight: "150px",
            borderLeft: `1px solid ${theme?.colors.border.default}`,
            borderRight: `1px solid ${theme?.colors.border.default}`,
            borderBottom: `1px solid ${theme?.colors.border.default}`,
            borderRadius: "0 0 6px 6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            sx={{
              color: theme?.colors.text.gray,
              fontSize: 0,
            }}
          >
            {emptyStateMessage}
          </Text>
        </Box>
      )}
    </>
  );
}

export default Table;
