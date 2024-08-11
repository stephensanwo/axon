import { ulid } from "ulidx";
import dockerNames from "docker-names";

export function uid(prefix?: string) {
  return prefix
    ? `${prefix}_${ulid().toLocaleLowerCase()}`
    : ulid().toLocaleLowerCase();
}

export function nameUid(): string {
  return dockerNames.getRandomName();
}