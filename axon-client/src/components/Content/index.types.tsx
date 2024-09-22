import { ContentAction, ContentState } from "src/context/content/index.types";

export type BaseContentProps = {
  contentState: ContentState;
  contentStateDispatch: React.Dispatch<ContentAction>;
};
