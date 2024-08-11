import { Box, Button, IconButton, Tooltip } from "@primer/react";
import { Suspense, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { lazy } from "react";
import { SearchDialogFallback } from "./SearchFallback";
import ErrorBoundary from "../Common/ErrorBoundary";
import { Text } from "../Common/Text";
import Blank from "../Blank";
import Skeleton from "../Skeleton";

const SearchDialog = lazy(() => import("./SearchDialog"));

function SearchButton({ type }: { type: "icon" | "button" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return type === "button" ? (
    <Button
      variant="invisible"
      leadingVisual={PiMagnifyingGlassBold}
      disabled={false}
      aria-label="Global Search"
      sx={{
        flexShrink: 0,
      }}
      onClick={() => setMenuOpen(true)}
    >
      <Text.Heading5Secondary>Search</Text.Heading5Secondary>
    </Button>
  ) : (
    <Box>
      <Tooltip aria-label={"Search"} direction="s" type="label">
        <IconButton
          variant="invisible"
          size="medium"
          icon={() => <PiMagnifyingGlassBold size={16} />}
          disabled={false}
          aria-label="Global Search"
          sx={{
            flexShrink: 0,
          }}
          onClick={() => setMenuOpen(true)}
        />
      </Tooltip>
      <ErrorBoundary
        fallback={
          <SearchDialogFallback openModal={menuOpen} closeModalFn={setMenuOpen}>
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
              closeModalFn={setMenuOpen}
            >
              <Skeleton count={1} height={40} />
            </SearchDialogFallback>
          }
        >
          <SearchDialog openModal={menuOpen} closeModalFn={setMenuOpen} />
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
}

export default SearchButton;
