import { IMAGE_ERROR_URL } from "src/types/image";

export const setImageErrorSrc = () => {
  const imageElement = document.getElementById(
    "markdown-image-content"
  ) as HTMLImageElement;
  imageElement.src = IMAGE_ERROR_URL;
};


export function getTemplateColumns(node: any): string {
  const column_count = node.children[0].children[0].children.length ?? 3;
  return `repeat(${column_count}, 1fr)`;
}
