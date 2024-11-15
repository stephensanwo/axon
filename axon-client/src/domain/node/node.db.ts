import { DBClient } from "src/db/client";
import { NodeEntityKeys } from "./node.entity";

export const nodeStylesDb = new DBClient("axon", NodeEntityKeys.NODE_STYLES);
export const nodeDb = new DBClient("axon", NodeEntityKeys.NODES);
