import { DBClient } from "src/db/client";

export const edgeDefaultsDb = new DBClient("axon", "edge_defaults");
export const edgeDb = new DBClient("axon", "edges");
