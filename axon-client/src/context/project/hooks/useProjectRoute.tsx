import { useParams, useSearchParams } from "react-router-dom";

export function useProjectRoute(): {
  projectName: string;
  updateProjectRouteSearchParams: (key: string, value: string) => void;
  clearProjectRouteSearchParams: (key: string) => void;
} {
  const { projectName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  function updateProjectRouteSearchParams(key: string, value: string) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, value);
    setSearchParams(updatedParams);
  }

  function clearProjectRouteSearchParams(key: string) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete(key);
    setSearchParams(updatedParams);
  }

  return {
    projectName: projectName ?? "",
    updateProjectRouteSearchParams,
    clearProjectRouteSearchParams,
  };
}
