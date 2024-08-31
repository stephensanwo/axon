import { BaseEntity } from "src/db/db.types";
import { EdgeStyle } from "./edge.entity";

export type UpdateEdgeStyleDto = BaseEntity & EdgeStyle;
