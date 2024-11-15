import { BaseEntity } from "src/db/db.types";
import { NodeEntity, NodeStyle } from "./node.entity";

export type UpdateNodeStyleDto = BaseEntity & NodeStyle;;