import { DBClient } from "src/db/client";

export const nodeDefaultsDb = new DBClient("axon", "node_defaults");
export const nodeDb = new DBClient("axon", "nodes");