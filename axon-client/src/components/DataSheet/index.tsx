import { useEffect, useState } from "react";
import { useTheme, Box } from "@primer/react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import Select, { SelectMenuItem } from "../Common/Select";
import { BaseDataSheetProps, TableCellTypes, TableMeta } from "./index.types";
import usePageVisibility from "src/hooks/usePageVisibility";
import {
  addColumn,
  duplicateColumn,
  deleteColumn,
  updateHeader,
  moveColumn,
} from "./actions/columns";
import "./index.css";
import { addRow, updateData } from "./actions/rows";
import { EditableHeader, TextHeader } from "./components/Header";
import { RowActionCell } from "./components/Row";
import { SheetHeader } from "./components/Sheet";

function DataSheet({
  view,
  updated,
  showHeader,
  updateTableCallback,
  table: tableData,
  refetchTable,
  columns: columnsData,
  editableHeaders,
}: BaseDataSheetProps) {
  const [data, setData] = useState(tableData.data.data);
  const [headers, setHeaders] = useState(tableData.data.header);
  const [columnOrder, setColumnOrder] = useState(
    tableData.data.columnOrder ?? Object.keys(headers)
  );
  const [focusedCell, setFocusedCell] = useState<{
    rowIndex: number;
    columnId: string;
  } | null>(null);

  console.log("focusedCell", focusedCell);

  const columns: ColumnDef<any>[] =
    columnsData ??
    Object.values(headers).map((header) => ({
      accessorKey: header.key,
      header: header.value,
      cell: TableCellTypes[header.type],
      minSize: 250,
    }));

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      columnOrder,
    },
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    meta: {
      focusedCell,
      setFocusedCell,
      headers: headers,
      updateData: updateData,
      updateHeader: updateHeader,
      setHeaders,
      setData,
      moveColumn: moveColumn,
      addColumn: addColumn,
      duplicateColumn: duplicateColumn,
      deleteColumn: deleteColumn,
      addRow: addRow,
    } as TableMeta,
    columnResizeMode: "onChange",
  });

  useEffect(() => {
    console.log("data", data);
    console.log("headers", headers);
    updateTableCallback(headers, data, columnOrder);
  }, [headers, data, columnOrder]);

  const { theme } = useTheme();

  const options: SelectMenuItem[] = [
    {
      id: "newColumn",
      name: "Add Column",
      onClick: () => {
        (table.options.meta as TableMeta).addColumn(table);
      },
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "100%",
        height: "100%",
      }}
    >
      {showHeader && (
        <SheetHeader
          table={tableData}
          editState={{
            lastTyped: updated,
          }}
        />
      )}
      <Box
        sx={{
          overflowX: "scroll",
          scrollbarWidth: "none",
        }}
      >
        <table
          style={{
            minWidth: "max-content",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
          className="Table"
        >
          <thead className="TableHead">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="TableRow">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="TableHeader"
                    style={{
                      padding: 0,
                      width: header.getSize(),
                      border: `1px solid ${theme?.colors.border.default}`,
                    }}
                  >
                    {editableHeaders ? (
                      <EditableHeader
                        header={header}
                        column={header.column}
                        table={table}
                      />
                    ) : (
                      <TextHeader
                        header={header}
                        column={header.column}
                        table={table}
                      />
                    )}
                  </th>
                ))}
                <th
                  className="TableHeader"
                  style={{
                    width: "32px",
                    // border: `1px solid ${theme?.colors.border.default}`,
                  }}
                >
                  <Box
                    sx={{
                      width: "32px",
                    }}
                  >
                    <Select<any>
                      title={`Actions`}
                      menuItems={options}
                      data={[]}
                      anchor="icon"
                      iconProps={{
                        style: {
                          borderRadius: 0,
                          width: "32px",
                        },
                      }}
                    />
                  </Box>
                </th>
              </tr>
            ))}
          </thead>
          <tbody className="TableBody">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="TableRow">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      padding: 0,
                      border: `1px solid ${theme?.colors.border.default}`,
                    }}
                    className="TableCell"
                    onClick={() => {
                      (table.options.meta as TableMeta).setFocusedCell({
                        rowIndex: cell.row.index,
                        columnId: cell.column.id,
                      });
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                {table.getAllColumns().length > 0 && (
                  <td
                    style={{
                      padding: 0,
                      // border: `1px solid ${theme?.colors.border.default}`,
                    }}
                    className="TableCell"
                  >
                    <RowActionCell />
                  </td>
                )}
              </tr>
            ))}
            <tr className="TableRow">
              {table.getAllColumns().length > 0 &&
                table.getAllColumns().map((column) => (
                  <td
                    style={{
                      padding: 0,
                      height: "32px",
                    }}
                    className="NewCell"
                    onClick={() => {
                      (table.options.meta as TableMeta).addRow(
                        table,
                        table.getRowModel().rows.length
                      );
                      (table.options.meta as TableMeta).setFocusedCell({
                        rowIndex: table.getRowModel().rows.length,
                        columnId: column.id,
                      });
                    }}
                  ></td>
                ))}
            </tr>
          </tbody>
        </table>
      </Box>
    </Box>
  );
}

export default DataSheet;
