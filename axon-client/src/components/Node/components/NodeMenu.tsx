import { DashIcon, PlusIcon } from "@primer/octicons-react";
import { Box, ButtonGroup, IconButton, useTheme } from "@primer/react";
import {
  BlendingModeIcon,
  CopyIcon,
  CrossCircledIcon,
  FontStyleIcon,
  LetterCaseCapitalizeIcon,
  LockClosedIcon,
  ViewVerticalIcon,
} from "@radix-ui/react-icons";
import {
  PiCopySimple,
  PiGearLight,
  PiTrash,
  PiTrashSimple,
} from "react-icons/pi";
import { useBoardStore } from "src/context/board/board.store";

function NodeMenu() {
  const { theme } = useTheme();
  const { nodeContent, toggleNodeContent, nodeOptions, toggleNodeOptions } =
    useBoardStore();
  return (
    // <Box
    //   sx={{
    //     position: "absolute",
    //     marginTop: 2,
    //     left: "50%",
    //     transform: "translateX(-50%)",
    //     zIndex: 1000,
    //     minWidth: "120px",
    //     height: "32px",
    //     backgroundColor: theme?.colors.bg.variant1,
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     borderRadius: 2,
    //   }}
    // >
    <ButtonGroup
      sx={{
        position: "absolute",
        marginTop: 2,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        // minWidth: "120px",
        // height: "32px",
        backgroundColor: theme?.colors.bg.variant1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
      }}
    >
      <IconButton
        unsafeDisableTooltip={true}
        icon={CrossCircledIcon}
        aria-label="Delete"
        sx={{
          flexShrink: 0,
        }}
        size="medium"
      />
      <IconButton
        unsafeDisableTooltip={true}
        icon={CopyIcon}
        aria-label="Copy"
        sx={{
          flexShrink: 0,
        }}
        size="medium"
      />
      <IconButton
        unsafeDisableTooltip={true}
        icon={LockClosedIcon}
        aria-label="Subtract"
        sx={{
          flexShrink: 0,
        }}
        size="medium"
      />
      <IconButton
        unsafeDisableTooltip={true}
        icon={BlendingModeIcon}
        aria-label="Subtract"
        sx={{
          flexShrink: 0,
        }}
        size="medium"
        onClick={() => {
          nodeOptions.state === "open"
            ? toggleNodeOptions("closed", "formatting")
            : toggleNodeOptions("open", "formatting");
        }}
      />
      <IconButton
        unsafeDisableTooltip={true}
        icon={ViewVerticalIcon}
        aria-label="Subtract"
        sx={{
          flexShrink: 0,
        }}
        size="medium"
        onClick={() => {
          nodeContent.state === "open"
            ? toggleNodeContent("closed")
            : toggleNodeContent("open");
        }}
      />
    </ButtonGroup>
    // </Box>
  );
}

export default NodeMenu;
