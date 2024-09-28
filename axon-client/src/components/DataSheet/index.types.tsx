import { ColumnDef, Table } from "@tanstack/react-table";
import { TableData } from "src/domain/content/content.entity";

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
        type: "text";
      }
    >,
    body: Record<string, string>[]
  ) => void;
  showHeader?: boolean;
  table: TableData;
  refetchTable: () => void;
};

export type EditStateProps = {
  lastTyped: string;
};

export type TableMeta = {
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  updateHeader: (columnId: string, value: string) => void;
  setHeaders: React.Dispatch<
    React.SetStateAction<
      Record<
        string,
        {
          key: string;
          value: string;
          type: "text";
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
};
