import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
  createCommand,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import IconButton from "src/components/Button/MenuButton";
import { PiTextT } from "react-icons/pi";
import { ThemeColors } from "src/shared/themes";
import { useEffect } from "react";

export const FORMAT_PARAGRAPH_COMMAND = createCommand(
  "FORMAT_PARAGRAPH_COMMAND"
);

export const ParagraphActionsPlugin = (): React.ReactNode => {
  const [editor] = useLexicalComposerContext();
  const onClick = () => {
    editor.update(() => {
      editor.dispatchCommand(FORMAT_PARAGRAPH_COMMAND, undefined);
    });
  };
  return <ParagraphMenu onClick={onClick}></ParagraphMenu>;
};

export const ParagraphMenu: React.FC<{
  onClick: () => void;
}> = (props) => {
  const { onClick } = props;
  return (
    <>
      <IconButton
        id={`test`}
        name={""}
        onClick={() => onClick()}
        width="24px"
        height="24px"
        background="transparent"
        fill={ThemeColors.textDark}
      >
        <PiTextT size={16} />
      </IconButton>
    </>
  );
};

export const ParagraphPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerCommand(
      FORMAT_PARAGRAPH_COMMAND,
      () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
        return true;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, []);

  return null;
};
