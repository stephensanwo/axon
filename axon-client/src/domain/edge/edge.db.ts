import { DBClient } from "src/db/client";

export const edgeDefaultsDb = new DBClient("axon", "edge-defaults");
export const edgeDb = new DBClient("axon", "edges");
