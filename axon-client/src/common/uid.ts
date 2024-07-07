import { ulid } from "ulidx";

export function uid() {
  return ulid().toLocaleLowerCase();
}
