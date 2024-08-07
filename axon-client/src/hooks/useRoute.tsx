import isNaN from "lodash/isNaN";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export function useRoute(): {
  page: number;
  setPage: (page: number) => void;
} {
  let [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");

  let page = parseInt(pageParam as string, 10);

  if (isNaN(page) || page < 1) {
    page = 1;
    setSearchParams({ page: "1" });
  }

  useEffect(() => {
    if (isNaN(parseInt(pageParam as string, 10)) || pageParam === null) {
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
    }
  }, [page, pageParam, searchParams, setSearchParams]);

  function setPage(newPage: number) {
    page = newPage;
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  }

  return { page, setPage };
}
