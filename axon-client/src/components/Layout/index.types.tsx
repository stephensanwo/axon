import { ReactNode } from "react";

export type PanelProps = {
  defaultSize: number;
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  onCollapse?: () => void;
  onExpand?: () => void;
  component?: ReactNode;
  enabled: boolean;
};

export type LayoutProps = {
  leftPanel?: PanelProps;
  middleTopPanel?: ReactNode;
  middleBottomPanel?: ReactNode;
  rightPanel?: PanelProps;
  pageHeader?: {
    breadcrumb: ReactNode;
    menus: ReactNode[];
  };
};
