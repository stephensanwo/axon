import { BaseEntity } from "src/db/db.types";
import { DefaultNodeTypes, NodeContentTypes } from "src/types/node";

export type BoardData = {
  name: string;
  description: string;
  pinned: boolean;
  projectId: string;
};

export type BoardEntity = BaseEntity & BoardData;

export type BoardSettings = {
  grid: boolean;
  default_node_type: DefaultNodeTypes;
  default_content_type: NodeContentTypes;
};

export type BoardSettingsEntity = BaseEntity & BoardSettings;

export const BoardQueryKeys = {
  BOARD: ["board"],
} satisfies Record<string, string[]>;
