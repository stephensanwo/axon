export interface PageProps {
  leftPanel: React.ReactNode;
  rightPanel?: React.ReactNode;
  main: React.ReactNode;
  footer?: React.ReactNode;
  header: {
    breadcrumb: React.ReactNode;
    menus: React.ReactNode[];
  };
  panel: PagePanels;
  togglePanel: (
    direction: PagePanelDirections,
    action?: PagePanelActions
  ) => void;
  initialFocusRef: React.RefObject<HTMLButtonElement> | undefined;
  returnFocusRef: React.RefObject<HTMLButtonElement>;
  ignoreClickRefs: React.RefObject<HTMLDivElement>[];
  closeOnClickOutside?: boolean;
}

export type PagePanelDirections = "left" | "right";
export type PagePanelActions = "open" | "close";
export type PagePanels = Record<PagePanelDirections, boolean>;
