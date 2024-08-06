import { Results } from "@orama/orama";
import React from "react";
import { PiFile, PiFolder } from "react-icons/pi";

export interface BaseSearchSchema {
  identifier: string;
  type: string;
  name: string;
  description: string;
  content: string;
  path: string;
}

export enum SearchIndexTypes {
  DOCUMENT_FOLDER = "folder",
  DOCUMENT_FILE = "file",
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
};
