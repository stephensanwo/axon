import { IMAGE_ERROR_URL } from "src/types/image";

export const setImageErrorSrc = () => {
  const imageElement = document.getElementById(
    "markdown-image-content"
  ) as HTMLImageElement;
  imageElement.src = IMAGE_ERROR_URL;
};
