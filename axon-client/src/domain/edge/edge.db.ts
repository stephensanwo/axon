import { DBClient } from "src/db/client";
import { EdgeEntityKeys } from "./edge.entity";

export const edgeDefaultsDb = new DBClient(
  "axon",
  EdgeEntityKeys.EDGE_DEFAULTS
);
export const edgeDb = new DBClient("axon", EdgeEntityKeys.EDGES);
