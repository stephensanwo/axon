import { PiMagnifyingGlassBold } from "react-icons/pi";
import { Input } from "../Common/Input";
import { useEffect, useRef, useState } from "react";
import { formOptions, useForm } from "@tanstack/react-form";
import searchService from "src/domain/search/search.service";
import { SearchResults } from "src/domain/search/search.entity";
import { InlineSpinner } from "../Common/Spinner";

function SearchInput({
  setSearchResults,
  isLoading,
}: {
  isLoading: boolean;
  searchResults: SearchResults | null;
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResults | null>>;
}) {
  const formOpts = formOptions<{ search: string }>({
    defaultValues: {
      search: "",
    },
  });

  const Form = useForm({
    ...formOpts,
  });

  const [lastSearchTerm, setLastSearchTerm] = useState("");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const unsubscribe = Form.store.subscribe(() => {
      const searchTerm = Form.store.state.values.search;

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(async () => {
        if (searchTerm !== lastSearchTerm) {
          setLastSearchTerm(searchTerm);
          const result = await searchService.search(searchTerm);
          setSearchResults(result);
          console.log("Search Results:", result);
        }
      }, 500); // Debounce delay
    });

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      unsubscribe();
    };
  }, [Form.store, lastSearchTerm, setSearchResults]);

  return (
    <Form.Field
      name="search"
      validators={{
        onChangeAsyncDebounceMs: 500,
      }}
    >
      {({ state, handleChange, handleBlur }) => {
        return (
          <Input.Text
            label=""
            error=""
            placeholder={
              isLoading
                ? "Loading Axon Search..."
                : "Type to search (i.e. example.zip)"
            }
            value={state.value || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            leadingVisual={
              isLoading ? <InlineSpinner /> : <PiMagnifyingGlassBold />
            }
            type="text"
            htmlFor="search"
            inputSize="large"
            disabled={isLoading}
          />
        );
      }}
    </Form.Field>
  );
}

export default SearchInput;
