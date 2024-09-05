import { ActionList, Button, IconButton, Tooltip } from "@primer/react";
import { Suspense, useState } from "react";
import { PiUserCircle } from "react-icons/pi";
import { lazy } from "react";
import ErrorBoundary from "../Common/ErrorBoundary";
import { Text } from "../Common/Text";
import Skeleton from "../Skeleton";
import Blank from "../Blank";
import { UserDialogFallback } from "./UserFallback";

const UserDialog = lazy(() => import("./UserDialog"));

function UserButton({ type }: { type: "icon" | "button" | "action-list" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {type === "button" ? (
        <Button
          variant="invisible"
          leadingVisual={() => <PiUserCircle size={18} />}
          disabled={false}
          aria-label="User"
          sx={{
            flexShrink: 0,
          }}
          onClick={() => setMenuOpen(true)}
        >
          <Text.Heading5Secondary>My Account</Text.Heading5Secondary>
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
            <PiUserCircle size={16} />
          </ActionList.LeadingVisual>
          <Text.Heading6Secondary>My Account</Text.Heading6Secondary>
        </ActionList.Item>
      ) : (
        <Tooltip aria-label={"My Account"} direction="s" type="label">
          <IconButton
            variant="invisible"
            size="medium"
            icon={() => <PiUserCircle size={18} />}
            disabled={false}
            aria-label="My Account"
            sx={{
              flexShrink: 0,
            }}
            onClick={() => setMenuOpen(true)}
          />
        </Tooltip>
      )}
      <ErrorBoundary
        fallback={
          <UserDialogFallback
            openModal={menuOpen}
            closeModalFn={() => setMenuOpen(false)}
          >
            <Blank
              heading="Error Loading Account Settings"
              description="Unable to load your account settings. Please try again later."
              type="error"
            />
          </UserDialogFallback>
        }
      >
        <Suspense
          fallback={
            <UserDialogFallback
              openModal={menuOpen}
              closeModalFn={() => setMenuOpen(false)}
            >
              <Skeleton count={2} height={24} />
            </UserDialogFallback>
          }
        >
          <UserDialog
            openModal={menuOpen}
            closeModalFn={() => setMenuOpen(false)}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default UserButton;
