import { DBClient } from "src/db/client";
import { ContentEntityKeys } from "./content.entity";

export const contentDb = new DBClient("axon", ContentEntityKeys.CONTENT);
export const contentTypeDb = new DBClient(
  "axon",
  ContentEntityKeys.CONTENT_TYPE_DEFAULTs
);

export const contentTypeDataDb = new DBClient(
  "axon",
  ContentEntityKeys.CONTENT_TYPE_DATA
);
