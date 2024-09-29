import { Table } from "@tanstack/react-table";
import { TableMeta } from "../index.types";

export function updateData(
  table: Table<Record<string, string>>,
  rowIndex: number,
  columnId: string,
  value: unknown
) {
  return (table.options.meta as TableMeta).setData((old) =>
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
}

export const addRow = (table: Table<any>, rowIndex: number) => {
  const columns = table.getAllColumns();
  const newRow = columns.reduce(
    (acc, column) => {
      acc[column.id] = "";
      return acc;
    },
    {} as Record<string, string>
  );

  const setData = (table.options.meta as any).setData;
  setData((old: any[]) => [
    ...old.slice(0, rowIndex),
    newRow,
    ...old.slice(rowIndex),
  ]);
};

export const copyRow = (table: Table<any>, rowIndex: number) => {
  const newRow = { ...table.getRowModel().rows[rowIndex].original };
  const setData = (table.options.meta as any).setData;
  setData((old: any[]) => [
    ...old.slice(0, rowIndex + 1),
    newRow,
    ...old.slice(rowIndex + 1),
  ]);
};

export const deleteRow = (table: Table<any>, rowIndex: number) => {
  const setData = (table.options.meta as any).setData;
  setData((old: any[]) => old.filter((_, index) => index !== rowIndex));
};
