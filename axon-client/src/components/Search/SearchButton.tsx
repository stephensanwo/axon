import { ActionList, Box, Button, IconButton, Tooltip } from "@primer/react";
import { Suspense, useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";
import { lazy } from "react";
import { SearchDialogFallback } from "./SearchFallback";
import ErrorBoundary from "../Common/ErrorBoundary";
import { Text } from "../Common/Text";
import Blank from "../Blank";
import Skeleton from "../Skeleton";

const SearchDialog = lazy(() => import("./SearchDialog"));

function SearchButton({ type }: { type: "icon" | "button" | "action-list" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {type === "button" ? (
        <Button
          variant="invisible"
          leadingVisual={() => <PiMagnifyingGlass size={18} />}
          disabled={false}
          aria-label="Global Search"
          sx={{
            flexShrink: 0,
          }}
          onClick={() => setMenuOpen(true)}
        >
          <Text.Heading5Secondary>Search</Text.Heading5Secondary>
        </Button>
      ) : type === "action-list" ? (
        <ActionList.Item
          sx={{
            margin: 0,
            width: "100%",
            display: "flex",
          }}
          onClick={() => setMenuOpen(true)}
        >
          <ActionList.LeadingVisual>
            <PiMagnifyingGlass size={16} />
          </ActionList.LeadingVisual>
          <Text.Heading6Secondary>Search</Text.Heading6Secondary>
        </ActionList.Item>
      ) : (
        <Tooltip aria-label={"Search"} direction="s" type="label">
          <IconButton
            variant="invisible"
            size="medium"
            icon={() => <PiMagnifyingGlass size={18} />}
            disabled={false}
            aria-label="Global Search"
            sx={{
              flexShrink: 0,
            }}
            onClick={() => setMenuOpen(true)}
          />
        </Tooltip>
      )}
      <ErrorBoundary
        fallback={
          <SearchDialogFallback
            openModal={menuOpen}
            closeModalFn={() => setMenuOpen(false)}
          >
            <Blank
              heading="Error Loading Search"
              description="Unable to load search. Please try again later."
              type="error"
            />
          </SearchDialogFallback>
        }
      >
        <Suspense
          fallback={
            <SearchDialogFallback
              openModal={menuOpen}
              closeModalFn={() => setMenuOpen(false)}
            >
              <Skeleton count={1} height={40} />
            </SearchDialogFallback>
          }
        >
          <SearchDialog
            openModal={menuOpen}
            closeModalFn={() => setMenuOpen(false)}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default SearchButton;
