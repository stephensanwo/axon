import { Results } from "@orama/orama";
import React from "react";
import Icon from "src/components/Common/Icon";

export interface BaseSearchSchema {
  identifier: string;
  type: string;
  name: string;
  description: string;
  content: string;
  path: string | string[];
}
export const MAX_SEARCH_RESULTS = 20;

export enum SearchIndexTypes {
  DOCUMENT_FOLDER = "folder",
  DOCUMENT_FILE = "file",
  PROJECT = "project",
  BOARD = "board",
}

export type SearchResults = Results<BaseSearchSchema>;

export const SearchIndexProps: Record<
  SearchIndexTypes,
  {
    color: string;
    icon: React.ElementType;
  }
> = {
  [SearchIndexTypes.DOCUMENT_FOLDER]: {
    color: "blue",
    icon: Icon.DocumentFolder,
  },
  [SearchIndexTypes.DOCUMENT_FILE]: {
    color: "green",
    icon: Icon.DocumentFile,
  },
  [SearchIndexTypes.PROJECT]: {
    color: "red",
    icon: Icon.Project,
  },
  [SearchIndexTypes.BOARD]: {
    color: "red",
    icon: Icon.BoardAlt,
  },
};
