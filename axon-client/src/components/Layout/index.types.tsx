import { ReactNode } from "react";

export type PanelProps = {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  onCollapse?: () => void;
  onExpand?: () => void;
  component?: ReactNode;
  enabled?: boolean;
  className?: string;
  maxHeight?: number;
};

export type LayoutProps = {
  leftPanel?: PanelProps;
  middleTopPanel?: PanelProps;
  middleBottomPanel?: PanelProps;
  rightPanel?: PanelProps;
  pageHeader?: PageHeaderProps;
};

export type PageHeaderProps = {
  breadcrumb?: ReactNode;
  menus?: ReactNode[];
};
