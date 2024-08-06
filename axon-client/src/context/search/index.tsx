import React, { createContext, useEffect } from "react";
import searchService from "src/domain/search/search.service";

interface SearchProviderProps {
  children: React.ReactNode;
}

interface SearchContextProps {}

const SearchContext = createContext({} as SearchContextProps);

const SearchProvider = ({ children }: SearchProviderProps) => {
  useEffect(() => {
    const initSearchService = async () => {
      searchService.initializeSearchRecords();
    };
    initSearchService();
  }, []);

  return <SearchContext.Provider value={{}}>{children}</SearchContext.Provider>;
};

export { SearchProvider, SearchContext };
