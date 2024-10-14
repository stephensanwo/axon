import { useParams, useSearchParams } from "react-router-dom";
import { ContentRouteParams } from "../index.types";

export function useContentRoute(): {
  contentName: string;
  contentPreviewId: string;
  updateContentRouteSearchParams: (key: string, value: string) => void;
  clearContentRouteSearchParams: (key: string) => void;
} {
  const { contentName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const contentPreviewId =
    searchParams.get(ContentRouteParams.CONTENT_PREVIEW) ?? "";

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
    contentName: contentName ?? "",
    contentPreviewId,
    updateContentRouteSearchParams,
    clearContentRouteSearchParams,
  };
}
