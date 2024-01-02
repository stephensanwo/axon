export interface IBlockProps<V> {
  id: string;
  variant?: V | undefined;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export type HEADING_LEVELS = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type IBlockTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

export interface IBlock {
  block_id: string;
  block_type: IBlockTypes;
  data: any;
}
