import { ActionList, Button, IconButton, Tooltip } from "@primer/react";
import { flushSync } from "react-dom";
import { PiSidebarSimple } from "react-icons/pi";
import Close from "src/components/Common/Close";
import { Text } from "src/components/Common/Text";
import { PagePanelDirections } from "src/components/Page/index.types";

function ContentPreviewButton({
  type,
  togglePanel,
  disableTooltip,
  onClick,
}: {
  type: "icon" | "button" | "action-list" | "close-icon";
  togglePanel: (
    direction: PagePanelDirections,
    action?: "open" | "close"
  ) => void;
  disableTooltip?: boolean;
  onClick?: () => void;
}) {
  return (
    <>
      {type === "button" ? (
        <Button
          variant="invisible"
          leadingVisual={() => <PiSidebarSimple size={18} />}
          disabled={false}
          aria-label="Preview"
          sx={{
            flexShrink: 0,
          }}
          onClick={() => {
            flushSync(() => {
              onClick && onClick();
            });
            togglePanel("right");
          }}
        >
          <Text.Heading5Secondary>Preview</Text.Heading5Secondary>
        </Button>
      ) : type === "close-icon" ? (
        <Close
          onClick={() => {
            flushSync(() => {
              onClick && onClick();
            });
            togglePanel("right", "close");
          }}
        />
      ) : type === "action-list" ? (
        <ActionList.Item
          sx={{
            margin: 0,
            width: "100%",
            display: "flex",
          }}
          onClick={() => {
            flushSync(() => {
              onClick && onClick();
            });
            togglePanel("right");
          }}
        >
          <ActionList.LeadingVisual>
            <PiSidebarSimple size={16} />
          </ActionList.LeadingVisual>
          <Text.Heading6Secondary>Preview</Text.Heading6Secondary>
        </ActionList.Item>
      ) : disableTooltip ? (
        <ContentPreviewButtonIcon
          onClick={() => {
            flushSync(() => {
              onClick && onClick();
            });
            togglePanel("right");
          }}
        />
      ) : (
        <Tooltip aria-label={"Preview"} direction="s" type="label">
          <ContentPreviewButtonIcon
            onClick={() => {
              flushSync(() => {
                onClick && onClick();
              });
              togglePanel("right");
            }}
          />
        </Tooltip>
      )}
    </>
  );
}

function ContentPreviewButtonIcon({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton
      variant="invisible"
      size="medium"
      icon={() => <PiSidebarSimple size={18} />}
      disabled={false}
      aria-label="Preview"
      sx={{
        flexShrink: 0,
      }}
      onClick={onClick}
    />
  );
}
export default ContentPreviewButton;
