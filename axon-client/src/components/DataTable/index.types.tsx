import { TableData } from "src/domain/content/content.entity";

export type BaseDataTableProps = {
  title: string;
  updated: string;
  data: TableData;
  updateTable: (value: TableData) => void;
  refetchTable: () => void;
  showHeader?: boolean;
};

export type EditStateProps = {
  typing: boolean;
  lastTyped: string;
};
