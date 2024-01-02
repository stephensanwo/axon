import { UNDO_COMMAND, REDO_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import IconButton from "src/components/Button/IconButton";
import { PiArrowCounterClockwise, PiArrowClockwise } from "react-icons/pi";
import { ThemeColors } from "src/shared/themes";

export const HistoryActionsPlugin = () => {
  const [editor] = useLexicalComposerContext();
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
      }}
    >
      <IconButton
        id={`test`}
        name={""}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        width="24px"
        height="24px"
        background="transparent"
        fill={ThemeColors.textDark}
      >
        <PiArrowCounterClockwise size={16} />
      </IconButton>
      <IconButton
        id={`test`}
        name={""}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        width="24px"
        height="24px"
        background="transparent"
        fill={ThemeColors.textDark}
      >
        <PiArrowClockwise size={16} />
      </IconButton>
    </div>
  );
};
