import { Box } from "@primer/react";
import SearchMain from "src/components/Search/SearchMain";
import { SearchIndexTypes } from "src/domain/search/search.entity";

function ContentSearch() {
  return (
    <Box className="h-full w-full pt-2 pl-3 pr-3">
      <SearchMain
        input={{
          placeholder: "Start typing to find content...",
          loadingText: "Loading Axon Content Search...",
        }}
        searchIndex={[SearchIndexTypes.CONTENT]}
        searchResultContainerClassName="max-h-[100%]"
      />
    </Box>
  );
}

export default ContentSearch;
