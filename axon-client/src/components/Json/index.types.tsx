import { JsonData } from "src/domain/content/content.entity";

export type BaseJsonProps = {
  updated: string;
  json: JsonData;
  updateJson: (value: JsonData) => void;
  refetchJson: () => void;
  showHeader?: boolean;
  loadingComponent?: React.ReactNode;
};

export type EditStateProps = {
  typing: boolean;
  lastTyped: string;
};
