import { CodeData } from "src/domain/content/content.entity";

export type BaseCodeProps = {
  updated: string;
  code: CodeData;
  updateCode: (value: CodeData) => void;
  refetchCode: () => void;
  showHeader?: boolean;
  loadingComponent?: React.ReactNode;
};

export type EditStateProps = {
  typing: boolean;
  lastTyped: string;
};
