import { BaseEntity } from "src/db/db.types";

export type BoardData = {
  name: string;
  description: string;
  pinned: boolean;
  projectId: string;
};
export type BoardEntity = BaseEntity & BoardData;

export const BoardQueryKeys = {
  BOARD: ["board"],
} satisfies Record<string, string[]>;
