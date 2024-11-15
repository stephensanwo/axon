import {
  SearchIndexProps,
  SearchIndexTypes,
  SearchResults,
} from "src/domain/search/search.entity";
import { ActionList, Box, IssueLabelToken } from "@primer/react";
import { Text } from "../../Common/Text";
import { formatReadablePath, formatUrlPath } from "src/common/file";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@primer/react";
import { createElement } from "react";
import capitalize from "lodash/capitalize";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { cn } from "src/lib/utils";
import Blank from "src/components/Blank";

function SearchResult({
  searchResults,
  searchResultContainerClassName,
}: {
  searchResults: SearchResults | null;
  searchResultContainerClassName?: string;
}) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  if (!searchResults) {
    return (
      <Blank
        heading="Axon Search"
        description="Your search results will appear here"
        type="info"
      />
    );
  }

  return (
    <>
      <Box className="mt-1 mb-3">
        {searchResults?.hits.length > 0 ? (
          <Text.Small className="text-primary-foreground">
            {`Showing ${searchResults?.hits.length} search result(s)`}
          </Text.Small>
        ) : (
          <Text.Small className="text-primary-foreground">
            No results found
          </Text.Small>
        )}
      </Box>
      <Box
        className={cn(
          "max-h-[40vh] overflow-y-scroll scrollbar-w-none",
          searchResultContainerClassName
        )}
      >
        {searchResults?.hits.map((result, index) => {
          const props =
            SearchIndexProps[result.document.type as SearchIndexTypes];
          return (
            <ActionList.Item
              key={index}
              sx={{
                marginBottom: 2,
              }}
              onClick={() => {
                navigate(`/${formatUrlPath(result.document.path as string[])}`);
              }}
              className="hover:rounded-none"
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
                  <>{formatReadablePath(result.document.path as string[])}</>
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
                  <ExternalLinkIcon className="w-4 h-4" />
                )}
              </ActionList.TrailingVisual>
            </ActionList.Item>
          );
        })}
      </Box>
    </>
  );
}

export default SearchResult;
