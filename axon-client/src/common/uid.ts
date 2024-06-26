import { ulid } from "ulid";

export function uid() {
  return ulid().toLocaleLowerCase();
}
