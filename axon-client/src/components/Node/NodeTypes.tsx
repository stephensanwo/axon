// import { NodeTypes } from "src/types/node";
import { NodeTypes } from "src/domain/node/node.entity";
import TextNode from "./components/TextNode";
// import TextNode from "src/components/Node/TextNode";
// import IconNode from "src/components/Node/IconNode";
// import CustomText from "src/components/Node/CustomText";
// import BoundingBox from "src/components/Node/BoundingBox";
// import LinkNode from "src/components/Node/LinkNode";
// import BlockNode from "src/components/Node/BlockNode";
// import ImageNode from "src/components/Node/ImageNode";

// export const nodeTypes: Record<NodeTypes, React.FC<any>> = {
//   text: TextNode,
//   link: LinkNode,
//   icon: IconNode,
//   block: BlockNode,
//   paragraph: CustomText,
//   bounding_box: BoundingBox,
//   image: ImageNode,
//   code: TextNode,
//   json: TextNode,
//   markdown: TextNode,
// };

export const nodeTypes: Record<NodeTypes, React.FC<any>> = {
  text: TextNode,
  box: TextNode,
  block: TextNode,
  icon: TextNode,
  custom: TextNode,
};
