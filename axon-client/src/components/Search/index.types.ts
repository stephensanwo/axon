import { SearchIndexTypes } from "src/domain/search/search.entity";

export type SearchInputProps = {
  placeholder: string;
  loadingText: string;
};

export type SearchMainProps = {
  input?: SearchInputProps;
  searchIndex?: SearchIndexTypes[];
  searchResultContainerClassName?: string;
};
