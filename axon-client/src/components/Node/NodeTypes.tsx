import { NodeTypes } from "src/types/node";
import TextNode from "./TextNode";
import IconNode from "./IconNode";
import CustomText from "./CustomText";
import BoundingBox from "./BoundingBox";
import LinkNode from "./LinkNode";
import ImageNode from "./ImageNode";
import BlockNode from "./BlockNode";

export const nodeTypes: Record<NodeTypes, React.FC<any>> = {
  text: TextNode,
  link: LinkNode,
  icon: IconNode,
  block: BlockNode,
  paragraph: CustomText,
  bounding_box: BoundingBox,
  image: ImageNode,
  code: TextNode,
  json: TextNode,
  markdown: TextNode,
};
