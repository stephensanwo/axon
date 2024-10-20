import { MarkdownData } from "src/domain/content/content.entity";

export type BaseMarkdownProps = {
  title: string;
  updated: string;
  markdown: MarkdownData;
  updateMarkdown: (value: MarkdownData) => void;
  refetchMarkdown: () => void;
  showHeader?: boolean;
  loadingComponent?: React.ReactNode;
};

export type EditStateProps = {
  typing: boolean;
  lastTyped: string;
};
