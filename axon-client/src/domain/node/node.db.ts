import { DBClient } from "src/db/client";

export const nodeStylesDb = new DBClient("axon", "node-styles");
export const nodeDb = new DBClient("axon", "nodes");