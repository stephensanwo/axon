import { Box, Button, IconButton, Tooltip } from "@primer/react";
import { Suspense, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { lazy } from "react";
import {
  SearchDialogErrorFallback,
  SearchDialogLoadingFallback,
} from "./SearchDialog";
import ErrorBoundary from "../Common/ErrorBoundary";
import { Text } from "../Common/Text";

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
          icon={PiMagnifyingGlassBold}
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
          <SearchDialogErrorFallback
            openModal={menuOpen}
            closeModalFn={setMenuOpen}
          />
        }
      >
        <Suspense
          fallback={
            <SearchDialogLoadingFallback
              openModal={menuOpen}
              closeModalFn={setMenuOpen}
            />
          }
        >
          <SearchDialog openModal={menuOpen} closeModalFn={setMenuOpen} />
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
}

export default SearchButton;
