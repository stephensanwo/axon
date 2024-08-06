import { useTheme } from "@primer/react";
import { createElement } from "react";
import { PiFile } from "react-icons/pi";
import { getContentType } from "src/common/file";
import { DocumentTypes } from "src/domain/document/document.entity";

export function DocumentIcon({
  content_type,
  color,
  size = 18,
}: {
  content_type: string;
  color?: string;
  size?: number;
}): React.ReactNode {
  const { theme } = useTheme();
  return createElement(
    DocumentTypes[getContentType(content_type)].icon || PiFile,
    {
      size,
      fill: color || theme?.colors.text.gray,
    }
  );
}
