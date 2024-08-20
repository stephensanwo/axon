import { Results } from "@orama/orama";
import React from "react";
import { PiAppWindowFill, PiFile, PiFolder } from "react-icons/pi";

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
    icon: PiFolder,
  },
  [SearchIndexTypes.DOCUMENT_FILE]: {
    color: "green",
    icon: PiFile,
  },
  [SearchIndexTypes.PROJECT]: {
    color: "red",
    icon: PiAppWindowFill,
  },
};
