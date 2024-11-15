import { lazy, Suspense, useState } from "react";
import { SearchResults } from "src/domain/search/search.entity";
import ErrorBoundary from "../Common/ErrorBoundary";
import Blank from "../Blank";
import { Skeleton } from "../Common/Skeleton";
import { SearchMainProps } from "./index.types";
const SearchInput = lazy(() => import("./Core/SearchInput"));
const SearchResult = lazy(() => import("./Core/SearchResult"));

function SearchMain({
  input,
  searchIndex,
  searchResultContainerClassName,
}: SearchMainProps) {
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );

  return (
    <ErrorBoundary
      fallback={
        <Blank
          heading="Error Loading Search"
          description="Unable to load search. Please try again later."
          type="error"
        />
      }
    >
      <Suspense fallback={<Skeleton count={1} className="h-[40px]" />}>
        <SearchInput
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          input={input}
          searchIndex={searchIndex || null}
        />
        <SearchResult
          searchResults={searchResults}
          searchResultContainerClassName={searchResultContainerClassName}
        />
      </Suspense>
    </ErrorBoundary>
  );
}

export default SearchMain;
