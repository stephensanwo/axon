import { DBClient } from "src/db/client";

export const foldersDb = new DBClient("folders", "folder");
export const filesDb = new DBClient("files", "file");
