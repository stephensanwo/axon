import { ActionList } from "@primer/react";
import { flushSync } from "react-dom";
import { PiSidebarSimple } from "react-icons/pi";
import { Button, ButtonVariant } from "src/components/Common/Button";
import Close from "src/components/Common/Close";
import { Text } from "src/components/Common/Text";

function ContentPreviewButton({
  type,
  onClick,
  variant,
}: {
  type: "icon" | "button" | "action-list" | "close-icon";
  variant: ButtonVariant;
  onClick?: () => void;
}) {
  return (
    <>
      {type === "button" ? (
        <Button
          variant={variant as ButtonVariant}
          disabled={false}
          aria-label="Preview"
          title="Preview"
          className="flex-shrink-0"
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
      ) : (
        <ContentPreviewButtonIcon
          variant={variant}
          onClick={() => {
            flushSync(() => {
              onClick && onClick();
            });
          }}
        />
      )}
    </>
  );
}

function ContentPreviewButtonIcon({
  onClick,
  variant,
}: {
  onClick?: () => void;
  variant: ButtonVariant;
}) {
  return (
    <Button
      variant={variant as ButtonVariant}
      size="icon"
      disabled={false}
      aria-label="Preview"
      title="Preview"
      className="flex-shrink-0"
      onClick={onClick}
    >
      <PiSidebarSimple size={18} />
    </Button>
  );
}
export default ContentPreviewButton;
