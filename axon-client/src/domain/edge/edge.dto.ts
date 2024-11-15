import { BaseEntity } from "src/db/db.types";
import { EdgeEntity, EdgeStyle } from "./edge.entity";

export type UpdateEdgeStyleDto = BaseEntity & EdgeStyle;

