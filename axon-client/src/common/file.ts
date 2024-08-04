import mime from "mime-types";
import { filesize } from "filesize";

export function convertFileSize({ size = 1 }: { size: number }): string {
  return filesize(size, { standard: "jedec" });
}

export function getContentType(fullContentTypeString: string): string {
  const extension = mime.extension(fullContentTypeString);
  return extension ? extension.toLocaleUpperCase() : "FILE";
}
