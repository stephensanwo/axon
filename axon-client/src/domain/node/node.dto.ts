import { BaseEntity } from "src/db/db.types";
import { NodeStyle } from "./node.entity";

export type UpdateNodeStyleDto = BaseEntity & NodeStyle;
