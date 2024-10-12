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
  pageNavContent?: ReactNode; // New prop for PageNav children
  pageHeader?: {
    breadcrumb: ReactNode;
    menus: ReactNode[];
  };
};
