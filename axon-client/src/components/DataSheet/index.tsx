import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTheme, Box } from "@primer/react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  CellContext,
  HeaderContext,
  Table,
} from "@tanstack/react-table";
import { Input } from "src/components/Common/Input";
import Select, { SelectMenuItem } from "../Common/Select";
import { BaseDataSheetProps, TableMeta } from "./index.types";
import { flushSync } from "react-dom";
import DataSheetHeader from "./components/DataSheetHeader";
import usePageVisibility from "src/hooks/usePageVisibility";
import { mockTable } from "./index.mock";
import { addColumn, duplicateColumn, deleteColumn } from "./actions/columns";
// Define the meta type

export const TableCellTypes = {
  text: EditableCell,
};
// EditableCell component
function EditableCell({
  getValue,
  row,
  column,
  table,
}: CellContext<Record<string, string>, unknown>) {
  const initialValue = getValue() as string;
  const [value, setValue] = useState(initialValue);
  const { theme } = useTheme();

  const debouncedOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      flushSync(() => {
        setValue(e.target.value);
        (table.options.meta as TableMeta).updateData(
          row.index,
          column.id,
          e.target.value
        );
      });
    },
    [row.index, column.id, table.options.meta]
  );

  const onBlur = () => {
    flushSync(() => {
      (table.options.meta as TableMeta).updateData(row.index, column.id, value);
    });
  };

  return (
    <Input.Box
      value={value}
      onChange={(e) => debouncedOnChange(e)}
      onBlur={onBlur}
    />
  );
}

// EditableHeader component
function EditableHeader({
  column,
  table,
  header,
}: HeaderContext<Record<string, string>, unknown>) {
  const initialValue = column.columnDef.header as string;
  const [value, setValue] = useState(initialValue);
  const { theme } = useTheme();

  const debouncedOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      flushSync(() => {
        setValue(e.target.value);
        (table.options.meta as TableMeta).updateHeader(column.id, value);
      });
    },
    [column.id, table.options.meta]
  );

  const onBlur = () => {
    flushSync(() => {
      (table.options.meta as TableMeta).updateHeader(column.id, value);
    });
  };

  const options: SelectMenuItem[] = [
    {
      id: "duplicateColumn",
      name: "Duplicate Column",
      onClick: () => {
        (table.options.meta as TableMeta).duplicateColumn(table, column.id);
      },
    },
    {
      id: "deleteColumn",
      name: "Delete Column",
      onClick: () => {
        (table.options.meta as TableMeta).deleteColumn(table, column.id);
      },
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Input.Box
        value={value}
        onChange={(e) => debouncedOnChange(e)}
        onBlur={onBlur}
      />
      <Select<any>
        title={`Actions`}
        menuItems={options}
        data={[]}
        anchor="icon"
        iconProps={{
          style: {
            borderRadius: 0,
          },
        }}
      />
      <div
        style={{
          width: "4px",
          backgroundColor: header.column.getIsResizing()
            ? "red"
            : "transparent",
          cursor: "col-resize",
        }}
        onMouseDown={header.getResizeHandler()}
        onTouchStart={header.getResizeHandler()}
      ></div>
    </Box>
  );
}

function RowActionCell() {
  const options: SelectMenuItem[] = [
    {
      id: "newRowAbove",
      name: "Add Row Above",
      onClick: () => {},
    },
    {
      id: "newRowBelow",
      name: "Add Row Below",
      onClick: () => {},
    },
    {
      id: "copyRow",
      name: "Copy Row",
      onClick: () => {},
    },
    {
      id: "deleteRow",
      name: "Delete Row",
      onClick: () => {},
    },
  ];
  return (
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
  );
}

// Table component
function DataSheet({
  view,
  updated,
  showHeader,
  updateTableCallback,
  table: tableData,
  refetchTable,
}: BaseDataSheetProps) {
  const [data, setData] = useState(mockTable.data.body);
  const [headers, setHeaders] = useState(mockTable.data.header);

  const columns: ColumnDef<any>[] = Object.values(headers).map((header) => ({
    accessorKey: header.key,
    header: header.value,
    cell: TableCellTypes[header.type],
    minSize: 250,
  }));

  useEffect(() => {
    console.log("data", data);
    console.log("headers", headers);
    // updateTableCallback(headers, data);
  }, [data, headers]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      columnOrder: Object.keys(headers),
    },
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...row,
                [columnId]: value as string,
              };
            }
            return row;
          })
        );
      },
      updateHeader: (columnId: string, value: string) => {
        setHeaders((headers) => ({
          ...headers,
          [columnId]: {
            ...headers[columnId],
            value,
          },
        }));
      },
      setHeaders,
      setData,
      addColumn: addColumn,
      duplicateColumn: duplicateColumn,
      deleteColumn: deleteColumn,
    } as TableMeta,
    columnResizeMode: "onChange",
  });

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
        <DataSheetHeader
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
                    <EditableHeader
                      header={header}
                      column={header.column}
                      table={table}
                    />
                  </th>
                ))}
                <th
                  className="TableHeader"
                  style={{
                    padding: 0,
                    width: "32px",
                    border: `1px solid ${theme?.colors.border.default}`,
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
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                {table.getAllColumns().length > 0 && (
                  <td
                    style={{
                      padding: 0,
                      border: `1px solid ${theme?.colors.border.default}`,
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
                    key={column.id}
                    style={{
                      padding: 0,
                      border: `1px solid ${theme?.colors.border.default}`,
                    }}
                    className="TableCell"
                  >
                    <Box
                      sx={{
                        height: "32px",
                      }}
                    ></Box>
                  </td>
                ))}
            </tr>
          </tbody>
        </table>
      </Box>
    </Box>
  );
}

export default DataSheet;
