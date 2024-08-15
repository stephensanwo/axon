import { TooltipProps } from "@primer/react";

export type TableListContainerProps = {
  children: React.ReactNode;
};

export type TableListHeaderData = {
  id: string;
  name: string;
  tooltip?: TooltipProps;
}[];

export type TableListHeaderProps = {
  data: TableListHeaderData;
  actions?: React.ReactNode[];
  gridTemplateColumns: string;
};

export type TableListBodyProps = {
  children: React.ReactNode;
};

export type TableListRowDataProps = {
  id: string;
  name: string;
  renderCell: React.ReactNode;
}[];

export type TableListRowProps = {
  gridTemplateColumns: string;
  data: TableListRowDataProps;
};
