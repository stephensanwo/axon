import { Node, Position, XYPosition } from "@xyflow/react";
import { BaseEntity } from "src/db/db.types";
import { ColorData, SettingsComponentTypes } from "../settings/settings.entity";

export type NodeEntity = Node<NodeDataProps, NodeTypes>;
export interface NodeDataProps extends Record<string, unknown> {
  node_id: string;
  board_id: string;
  node_styles: NodeStyleEntity;
  content_type: NodeContentTypes | null;
  content_type_id: string;
  content_data: NodeTextEntity;
}

// Default Node Types
export type NodeTypes = "box" | "text" | "block" | "icon" | "custom";

export type NodeContentTypes =
  | "markdown"
  | "json_editor"
  | "code"
  | "block_editor";

export interface NodeTextEntity {
  text: string;
}

export interface NodeCodeEntity {
  code: string;
  language: string;
}

export interface NodeJsonEditorEntity {
  code: string;
}

export interface NodeLinkEntity {
  isLoadable?: boolean;
  url: string;
  title: string;
  description: string;
  image: string;
}

export interface NodeInlineImageEntity {
  url: string;
}

export interface NodeMarkdownEntity {
  data: string;
}

export declare type JSONContentEntity = {
  type?: string;
  attrs?: Record<string, any>;
  content?: JSONContentEntity[];
  marks?: {
    type: string;
    attrs?: Record<string, any>;
    [key: string]: any;
  }[];
  text?: string;
  [key: string]: any;
};

export interface NodeIconEntity {
  name: string;
  size: NodeIconSizes;
}

export type NodeIconSizes = 16 | 24 | 32 | 40 | 48 | 56 | 64;

export interface NodeTypeOptions {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  nodeType: NodeTypes;
  nodeContentType: NodeContentTypes | null;
  icon: React.ElementType;
  disabled?: boolean;
  configOptions?: {};
}

export interface NodeThemeEntity {
  style: "background-fill" | "border-outline" | "none";
  color: string;
}

export type NodeStyleData = {
  font_weight: NodeFontWeights;
  font_alignment: NodeFontAlignments;
  font_color: ColorData;
  background_color: ColorData;
  border_color: ColorData;
  font_size: number;
  border_radius: number;
  border_style: NodeBorderStyles;
};

export type NodeBorderStyles = "dashed" | "solid" | "dotted";
export type NodeFontWeights = 400 | 800;
export type NodeFontAlignments = "center" | "left";

export type NodeStyleComponentTypes = SettingsComponentTypes;

export type NodeStyle = {
  [K in keyof NodeStyleData]: {
    value: NodeStyleData[K];
    label: string;
    component: NodeStyleComponentTypes;
  };
};

export type NodeStyleEntity = BaseEntity & NodeStyle;

export enum NodeEntityKeys {
  NODE_STYLES = "node-styles",
  NODES = "nodes",
}
