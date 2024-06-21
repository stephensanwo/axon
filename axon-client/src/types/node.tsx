import { JSONContent } from "@tiptap/react";
import { EditorState } from "lexical";
import { Node, Position, XYPosition } from "reactflow";

export type INode = Node<NodeDataProps, NodeTypes | undefined>;

export type CustomNodeProps<T = any> = {
  id: string;
  data: T;
  dragHandle?: boolean;
  type?: NodeTypes;
  selected?: boolean;
  isConnectable?: boolean;
  zIndex?: number;
  xPos: number;
  yPos: number;
  dragging: boolean;
  targetPosition?: Position;
  sourcePosition?: Position;
};
export interface INodeLinkContent {
  isLoadable?: boolean;
  url: string;
  title: string;
  description: string;
  image: string;
}

export interface INodeInlineImage {
  url: string;
}

export interface INodeMarkdownContent {
  data: string;
}

export interface INodeCodeContent {
  code: string;
  language: string;
}

export interface INodeJsonEditorContent {
  code: string;
}

export interface INodeBlockEditorContent extends EditorState {}

export const BLOCK_EDITOR_INITIAL_STATE =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

export interface NodeDataProps {
  user_id: string;
  folder_id: string;
  note_id: string;
  position: XYPosition;
  last_edited: string;

  node_id: string;
  title: string;
  description: string;
  contentType: NodeContentTypes | null;
  block?: string;
  code?: INodeCodeContent;
  json?: INodeJsonEditorContent;
  link?: INodeLinkContent;
  inlineImage?: INodeInlineImage;
  markdown?: INodeMarkdownContent;
  block_note?: JSONContent;
  icon?: INodeIcon;
  node_theme: NodeThemes;
  node_styles: NodeStyleProps;
  width: number;
  height: number;
}

export interface INodeIcon {
  name: string;
  size: NodeIconSizes;
}

export type NodeIconSizes = 16 | 24 | 32 | 40 | 48 | 56 | 64;
// Default Node Types
export type NodeTypes = DefaultNodeTypes | ExtendedNodeTypes;

export type DefaultNodeTypes =
  | "text"
  | "icon"
  | "paragraph"
  | "bounding_box"
  | "block";

export type ExtendedNodeTypes = "link" | "image" | "code" | "json" | "markdown";

export type NodeContentTypes = "markdown" | "json_editor" | "code" | "block_editor";

export interface NodeOptions {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  nodeType: NodeTypes;
  nodeContentType: NodeContentTypes | null;
  icon: React.ReactNode;
  disabled?: boolean;
  configOptions?: {};
}

export interface NodeStyleProps {
  font_weight: FontWeights;
  font_alignment: FontAlignments;
  font_color: string;
  background_color: string;
  border_color: string;
  font_size: number;
  border_radius: number;
  border_style: BorderStyles;
}

export type BorderStyles = "dashed" | "solid" | "dotted";
export type FontWeights = 400 | 800;
export type FontAlignments = "center" | "left";

export interface NodeThemes {
  style: "background-fill" | "border-outline" | "none";
  color: string;
}

export enum nodeEvents {
  ADD_NODE = "ADD_NODE",
  UPDATE_NODE = "UPDATE_NODE",
  REMOVE_NODE = "REMOVE_NODE",
}

export type NodeEvents = "add-node" | "update-node" | "remove-node";

export type NodeMenuEvents =
  | "delete-node"
  | "node-theme"
  | "node-formatting"
  | "text-formatting"
  | "set-default"
  | "select-icon"
  | "duplicate-node"
  | "node-content";

export interface NodeMenuButtonProps {
  id: NodeMenuEvents;
  name: string;
  icon: React.ReactNode;
}

export type NodeHandlePositions =
  | "top_handle"
  | "right_handle"
  | "bottom_handle"
  | "left_handle";
