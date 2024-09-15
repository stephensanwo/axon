import { DBClient } from "src/db/client";

export const contentDb = new DBClient("axon", "content");
export const contentTypeDb = new DBClient("axon", "content-types");
