import { useParams } from "react-router-dom";
import { ContentRouteParams } from "../index.types";

export function useContentRoute(): {
  contentName: string | undefined;
} {
  const { contentName } = useParams<ContentRouteParams>();

  return { contentName };
}
