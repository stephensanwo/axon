import { ColumnDef, Table } from "@tanstack/react-table";
import { TableData } from "src/domain/content/content.entity";
import { EditableCell, TextCell } from "./components/Cell";
import { EditableHeader, TextHeader } from "./components/Header";

export type BaseDataSheetProps = {
  view: "edit" | "preview";
  title: string;
  updated: string;
  updateTableCallback: (
    header: Record<
      string,
      {
        key: string;
        value: string;
        type: keyof typeof TableCellTypes;
      }
    >,
    data: Record<string, string>[],
    columnOrder: string[]
  ) => void;
  showHeader?: boolean;
  table: TableData;
  refetchTable: () => void;
  columns?: ColumnDef<any>[];
  editableHeaders?: boolean;
};

export type EditStateProps = {
  lastTyped: string;
};

export type TableMeta = {
  focusedCell: {
    rowIndex: number;
    columnId: string;
  } | null;
  setFocusedCell: React.Dispatch<
    React.SetStateAction<{
      rowIndex: number;
      columnId: string;
    } | null>
  >;
  updateData: (
    table: Table<Record<string, string>>,
    rowIndex: number,
    columnId: string,
    value: unknown
  ) => void;
  headers: Record<
    string,
    {
      key: string;
      value: string;
      type: keyof typeof TableCellTypes;
    }
  >;
  updateHeader: (
    table: Table<Record<string, string>>,
    columnId: string,
    value: string
  ) => void;
  setHeaders: React.Dispatch<
    React.SetStateAction<
      Record<
        string,
        {
          key: string;
          value: string;
          type: keyof typeof TableCellTypes;
        }
      >
    >
  >;
  setData: React.Dispatch<React.SetStateAction<Record<string, string>[]>>;
  addColumn: (table: Table<Record<string, string>>) => void;
  duplicateColumn: (
    table: Table<Record<string, string>>,
    columnId: string
  ) => void;
  deleteColumn: (
    table: Table<Record<string, string>>,
    columnId: string
  ) => void;
  moveColumn: (
    table: Table<Record<string, string>>,
    movingColumnId: string,
    direction: "left" | "right"
  ) => void;
  // Add these new row-related functions
  addRow: (table: Table<Record<string, string>>, rowIndex: number) => void;
  copyRow: (table: Table<Record<string, string>>, rowIndex: number) => void;
  deleteRow: (table: Table<Record<string, string>>, rowIndex: number) => void;
};

export const TableCellTypes = {
  cell: EditableCell,
  text: TextCell,
};
