import { DBClient } from "src/db/client";
import { BoardEntityKeys } from "./board.entity";

export const boardsDb = new DBClient("axon", BoardEntityKeys.BOARD);
export const boardDefaultsDb = new DBClient(
  "axon",
  BoardEntityKeys.BOARD_DEFAULTS
);
