import { ActionList, Button, IconButton, Tooltip } from "@primer/react";
import { VariantType } from "@primer/react/lib/Button/types";
import { flushSync } from "react-dom";
import { PiSidebarSimple } from "react-icons/pi";
import Close from "src/components/Common/Close";
import { Text } from "src/components/Common/Text";

function ContentPreviewButton({
  type,
  disableTooltip,
  onClick,
  variant = "invisible",
}: {
  type: "icon" | "button" | "action-list" | "close-icon";
  variant?: VariantType;
  disableTooltip?: boolean;
  onClick?: () => void;
}) {
  return (
    <>
      {type === "button" ? (
        <Button
          variant={variant}
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
          }}
        />
      ) : (
        <Tooltip aria-label={"Preview"} direction="s" type="label">
          <ContentPreviewButtonIcon
            onClick={() => {
              flushSync(() => {
                onClick && onClick();
              });
            }}
          />
        </Tooltip>
      )}
    </>
  );
}

function ContentPreviewButtonIcon({
  onClick,
  variant = "invisible",
}: {
  onClick?: () => void;
  variant?: VariantType;
}) {
  return (
    <IconButton
      variant={variant}
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
