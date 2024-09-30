import { DBClient } from "src/db/client";

export const foldersDb = new DBClient("axon", "folder");
export const filesDb = new DBClient("axon", "file");
