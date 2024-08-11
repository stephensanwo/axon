import { createElement, forwardRef, useEffect, useState } from "react";
import {
  DialogBody,
  DialogContainer,
  DialogHeader,
} from "src/components/Dialog";
import { BaseDialogProps } from "../Dialog/index.types";
import SearchInput from "./SearchInput";
import {
  SearchIndexProps,
  SearchIndexTypes,
  SearchResults,
} from "src/domain/search/search.entity";
import { ActionList, Box, IssueLabelToken, useTheme } from "@primer/react";
import { Text } from "../Common/Text";
import capitalize from "lodash/capitalize";
import { PiArrowSquareUpRight } from "react-icons/pi";
import { formatReadablePath, formatUrlPath } from "src/common/file";
import { useNavigate } from "react-router-dom";
import searchService from "src/domain/search/search.service";

const SearchDialog = forwardRef(
  ({ openModal, closeModalFn }: BaseDialogProps, ref) => {
    const [searchResults, setSearchResults] = useState<SearchResults | null>(
      null
    );
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
      const initSearchService = async () => {
        await searchService.initializeSearchRecords();
      };

      initSearchService().then(() => setLoading(false));
      return () => {};
    }, []);

    return (
      <DialogContainer
        buttonRef={ref}
        isOpen={openModal}
        onDismiss={closeModalFn}
        aria-labelledby="Global Search Dialog"
        wide
        sx={{
          width: "60%",
          minHeight: "10vh",
          maxHeight: "50vh",
          overflowY: "hidden",
        }}
      >
        <DialogHeader
          id={"global-search-dialog-header"}
          header={"Axon Search"}
          subheading={`Find a document, folder, note, component, etc...`}
        />
        <DialogBody>
          <SearchInput
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            isLoading={loading}
          />
          {searchResults && searchResults?.hits.length > 0 && (
            <Box
              sx={{
                mt: 3,
                mb: 3,
              }}
            >
              <Text.Small>
                {`Showing ${searchResults?.hits.length} search result(s)`}
              </Text.Small>
            </Box>
          )}

          <Box
            sx={{
              maxHeight: "41vh",
              overflowY: "scroll",
              scrollbarWidth: "none",
            }}
          >
            {searchResults &&
              searchResults?.hits.map((result, index) => {
                const props =
                  SearchIndexProps[result.document.type as SearchIndexTypes];
                return (
                  <ActionList.Item
                    key={index}
                    sx={{
                      marginBottom: 2,
                    }}
                    onClick={() =>
                      navigate(
                        `/${formatUrlPath(result.document.path as string[])}`
                      )
                    }
                  >
                    <ActionList.LeadingVisual>
                      {createElement(props.icon, {
                        size: 24,
                        fill: theme?.colors.text.gray,
                      })}
                    </ActionList.LeadingVisual>
                    <Text.Heading5>{result.document.name}</Text.Heading5>
                    <ActionList.Description variant="block">
                      {result.document.description && (
                        <>
                          {result.document.description}
                          <br />
                        </>
                      )}
                      {result.document.content && (
                        <>
                          {result.document.content}
                          <br />
                        </>
                      )}
                      {result.document.path && (
                        <>
                          {formatReadablePath(result.document.path as string[])}
                        </>
                      )}
                    </ActionList.Description>
                    <ActionList.TrailingVisual
                      sx={{
                        display: "flex",
                        gap: 2,
                      }}
                    >
                      <IssueLabelToken
                        fillColor={props.color}
                        text={capitalize(result.document.type)}
                        size="medium"
                      />
                      {result.document.path && (
                        <PiArrowSquareUpRight size="medium" />
                      )}
                    </ActionList.TrailingVisual>
                  </ActionList.Item>
                );
              })}
          </Box>
        </DialogBody>
      </DialogContainer>
    );
  }
);



export default SearchDialog;
