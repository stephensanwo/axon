import { DBClient } from "src/db/client";
import { DocumentEntityKeys } from "./document.entity";

export const foldersDb = new DBClient("axon", DocumentEntityKeys.FOLDER);
export const filesDb = new DBClient("axon", DocumentEntityKeys.FILE);
