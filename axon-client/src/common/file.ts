import mime from "mime-types";
import { filesize } from "filesize";
import capitalize from "lodash/capitalize";

export function convertFileSize({ size = 1 }: { size: number }): string {
  return filesize(size, { standard: "jedec" });
}

export function getContentType(fullContentTypeString: string): string {
  const extension = mime.extension(fullContentTypeString);
  return extension ? extension.toLocaleUpperCase() : "FILE";
}

/**
 * Converts an array of strings to a readable path.
 * Example: ["documents", "test 10", "file.pdf"] => "Documents > Test 10 > File.pdf"
 */
export function formatReadablePath(path: string[]): string {
  if (!Array.isArray(path)) {
    return "";
  }

  try {
    return path.map((part) => capitalize(part)).join(" > ");
  } catch (error) {
    return "";
  }
}

/**
 * Converts an array of strings to a URL path.
 * Example: ["documents", "test 10", "file.pdf"] => "documents/test 10/file.pdf"
 */
export function formatUrlPath(path: string[]): string {
  if (!Array.isArray(path)) {
    return "";
  }

  try {
    return path.join("/");
  } catch (error) {
    return "";
  }
}