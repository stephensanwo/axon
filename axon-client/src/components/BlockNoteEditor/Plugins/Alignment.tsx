import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_ELEMENT_COMMAND,
  ElementFormatType,
  OUTDENT_CONTENT_COMMAND,
  INDENT_CONTENT_COMMAND,
} from "lexical";
import IconButton from "src/components/Button/MenuButton";
import { ThemeColors } from "src/shared/themes";
import {
  PiTextAlignLeft,
  PiTextAlignCenter,
  PiTextAlignRight,
  PiTextAlignJustify,
  PiTextIndent,
  PiTextOutdent,
} from "react-icons/pi";

export const useAlignActionsPlugin = (): React.ReactNode[] => {
  const [editor] = useLexicalComposerContext();
  const handleOnClick = (formatType: ElementFormatType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, formatType);
  };
  return [
    <IconButton
      id={`test`}
      name={""}
      onClick={() => handleOnClick("left" as ElementFormatType)}
      width="24px"
      height="24px"
      background="transparent"
      fill={ThemeColors.textDark}
    >
      <PiTextAlignLeft size={16} />
    </IconButton>,
    <IconButton
      id={`test`}
      name={""}
      onClick={() => handleOnClick("center" as ElementFormatType)}
      width="24px"
      height="24px"
      background="transparent"
      fill={ThemeColors.textDark}
    >
      <PiTextAlignCenter size={16} />
    </IconButton>,
    <IconButton
      id={`test`}
      name={""}
      onClick={() => handleOnClick("right" as ElementFormatType)}
      width="24px"
      height="24px"
      background="transparent"
      fill={ThemeColors.textDark}
    >
      <PiTextAlignRight size={16} />
    </IconButton>,
    <IconButton
      id={`test`}
      name={""}
      onClick={() => handleOnClick("end" as ElementFormatType)}
      width="24px"
      height="24px"
      background="transparent"
      fill={ThemeColors.textDark}
    >
      <PiTextAlignJustify size={16} />
    </IconButton>,
    <IconButton
      id={`test`}
      name={""}
      onClick={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)}
      width="24px"
      height="24px"
      background="transparent"
      fill={ThemeColors.textDark}
    >
      <PiTextIndent size={16} />
    </IconButton>,
    <IconButton
      id={`test`}
      name={""}
      onClick={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)}
      width="24px"
      height="24px"
      background="transparent"
      fill={ThemeColors.textDark}
    >
      <PiTextOutdent size={16} />
    </IconButton>,
  ];
};
