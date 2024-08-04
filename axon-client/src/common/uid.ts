import { ulid } from "ulidx";

export function uid(prefix?: string) {
  return prefix
    ? `${prefix}_${ulid().toLocaleLowerCase()}`
    : ulid().toLocaleLowerCase();
}
