import { ulid } from "ulidx";

export function uid(prefix: string) {
  return `${prefix}_${ulid().toLocaleLowerCase()}`;
}
