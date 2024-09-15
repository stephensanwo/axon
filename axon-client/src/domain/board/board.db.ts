import { DBClient } from "src/db/client";

export const boardsDb = new DBClient("axon", "board");
export const boardDefaultsDb = new DBClient("axon", "board-defaults");
