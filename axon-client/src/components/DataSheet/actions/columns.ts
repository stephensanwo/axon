import { Table } from "@tanstack/react-table";
import { TableMeta } from "../index.types";

export function updateHeader(
  table: Table<Record<string, string>>,
  columnId: string,
  value: string
) {
  return (table.options.meta as TableMeta).setHeaders((headers) => ({
    ...headers,
    [columnId]: {
      ...headers[columnId],
      value,
    },
  }));
}

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

  table.setColumnOrder((old) => [...old, newColumnId.toString()]);
}

export function moveColumn(
  table: Table<Record<string, string>>,
  movingColumnId: string,
  direction: "left" | "right"
) {
  console.log("direction", direction);
  console.log("Old Column Order", table.getState().columnOrder);
  const newColumnOrder = [...table.getState().columnOrder];
  // const targetColumnId =
  //   direction === "left"
  //     ? Number(movingColumnId) - 1
  //     : Number(movingColumnId) + 1;

  console.log("movingColumnId", movingColumnId);
  // console.log("targetColumnId", targetColumnId);

  // if (targetColumnId < 1 || targetColumnId > newColumnOrder.length) {
  //   return;
  // }

  const movingColumnIndex = newColumnOrder.indexOf(movingColumnId.toString());
  const targetColumnIndex =
    direction === "left" ? movingColumnIndex - 1 : movingColumnIndex + 1;

  console.log("movingColumnIndex", movingColumnIndex);
  console.log("targetColumnIndex", targetColumnIndex);

  if (movingColumnIndex === -1 || targetColumnIndex === -1) {
    return;
  }

  newColumnOrder.splice(
    movingColumnIndex,
    0,
    newColumnOrder.splice(targetColumnIndex, 1)[0]
  );

  console.log("newColumnOrder", newColumnOrder);

  table.setColumnOrder(newColumnOrder);
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
