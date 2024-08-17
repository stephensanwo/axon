import { ActionList, Box, Button, IconButton, Tooltip } from "@primer/react";
import { Suspense, useState } from "react";
import { PiGear } from "react-icons/pi";
import { lazy } from "react";
import ErrorBoundary from "../Common/ErrorBoundary";
import { Text } from "../Common/Text";
import Skeleton from "../Skeleton";
import Blank from "../Blank";
import { SettingsDialogFallback } from "./SettingsFallback";

const SettingsDialog = lazy(() => import("./SettingsDialog"));

function SettingsButton({ type }: { type: "icon" | "button" | "action-list" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return type === "button" ? (
    <Button
      variant="invisible"
      leadingVisual={() => <PiGear size={18} />}
      disabled={false}
      aria-label="Settings"
      sx={{
        flexShrink: 0,
      }}
      onClick={() => setMenuOpen(true)}
    >
      <Text.Heading5Secondary>Settings</Text.Heading5Secondary>
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
        <PiGear size={18} />
      </ActionList.LeadingVisual>
      <Text.Heading5Secondary>Settings</Text.Heading5Secondary>
    </ActionList.Item>
  ) : (
    <Box>
      <Tooltip aria-label={"Settings"} direction="s" type="label">
        <IconButton
          variant="invisible"
          size="medium"
          icon={() => <PiGear size={18} />}
          disabled={false}
          aria-label="App Settings"
          sx={{
            flexShrink: 0,
          }}
          onClick={() => setMenuOpen(true)}
        />
      </Tooltip>
      <ErrorBoundary
        fallback={
          <SettingsDialogFallback
            openModal={menuOpen}
            closeModalFn={setMenuOpen}
          >
            <Blank
              heading="Error Loading Settings"
              description="Unable to load settings. Please try again later."
              type="error"
            />
          </SettingsDialogFallback>
        }
      >
        <Suspense
          fallback={
            <SettingsDialogFallback
              openModal={menuOpen}
              closeModalFn={setMenuOpen}
            >
              <Skeleton count={2} height={24} />
            </SettingsDialogFallback>
          }
        >
          <SettingsDialog openModal={menuOpen} closeModalFn={setMenuOpen} />
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
}

export default SettingsButton;
