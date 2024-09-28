import { Table } from "@tanstack/react-table";
import { TableMeta } from "../index.types";

export function addColumn(table: Table<Record<string, string>>) {
  const columns = table.getAllColumns();
  const newColumnId = columns.length + 1;
  const newColumnHeader = `Column ${columns.length + 1}`;
  (table.options.meta as TableMeta).setHeaders((old) => ({
    ...old,
    [newColumnId]: {
      key: newColumnId.toString(),
      value: newColumnHeader,
      type: "text",
    },
  }));

  (table.options.meta as TableMeta).setData((old) =>
    old.map((row) => ({
      ...row,
      [newColumnId]: "",
    }))
  );
}

export function deleteColumn(
  table: Table<Record<string, string>>,
  columnId: string
) {
  (table.options.meta as TableMeta).setHeaders((old) => {
    const newHeaders = { ...old };
    delete newHeaders[columnId];
    return newHeaders;
  });

  (table.options.meta as TableMeta).setData((old) =>
    old.map((row) => {
      const newRow = { ...row };
      delete newRow[columnId];
      return newRow;
    })
  );
}

export function duplicateColumn(
  table: Table<Record<string, string>>,
  columnId: string
) {
  const headers = table.options.meta as TableMeta;
  const columns = table.getAllColumns();
  const newColumnId = columns.length + 1;
  const newColumnHeader = `Column ${columns.length + 1}`;
  headers.setHeaders((old) => ({
    ...old,
    [newColumnId]: {
      key: newColumnId.toString(),
      value: newColumnHeader,
      type: "text",
    },
  }));

  headers.setData((old) =>
    old.map((row) => ({
      ...row,
      [newColumnId]: row[columnId],
    }))
  );
}
