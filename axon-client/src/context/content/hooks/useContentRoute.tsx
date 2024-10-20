import { useParams, useSearchParams } from "react-router-dom";
import { ContentRouteParams } from "../index.types";

export function useContentRoute(): {
  contentId: string;
  updateContentRouteSearchParams: (key: string, value: string) => void;
  clearContentRouteSearchParams: (key: string) => void;
} {
  const { contentIdFromPath } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const contentIdFromSearchParams =
    searchParams.get(ContentRouteParams.CONTENT_PREVIEW) ?? "";

  const contentId = contentIdFromPath ?? contentIdFromSearchParams;

  function updateContentRouteSearchParams(key: string, value: string) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, value);
    setSearchParams(updatedParams);
  }

  function clearContentRouteSearchParams(key: string) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete(key);
    setSearchParams(updatedParams);
  }

  return {
    contentId: contentId ?? "",
    updateContentRouteSearchParams,
    clearContentRouteSearchParams,
  };
}
