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
} from "react-icons/pi";

export const AlignActionsPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const handleOnClick = (formatType: ElementFormatType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, formatType);
  };
  //   editor.dispatchCommand(FORMAT_PARAGRAPH_COMMAND, undefined);
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
        onClick={() => handleOnClick("left" as ElementFormatType)}
        width="24px"
        height="24px"
        background="transparent"
        fill={ThemeColors.textDark}
      >
        <PiTextAlignLeft size={18} />
      </IconButton>
      <IconButton
        id={`test`}
        name={""}
        onClick={() => handleOnClick("center" as ElementFormatType)}
        width="24px"
        height="24px"
        background="transparent"
        fill={ThemeColors.textDark}
      >
        <PiTextAlignCenter size={18} />
      </IconButton>
      <IconButton
        id={`test`}
        name={""}
        onClick={() => handleOnClick("right" as ElementFormatType)}
        width="24px"
        height="24px"
        background="transparent"
        fill={ThemeColors.textDark}
      >
        <PiTextAlignRight size={18} />
      </IconButton>
      <IconButton
        id={`test`}
        name={""}
        onClick={() => handleOnClick("justify" as ElementFormatType)}
        width="24px"
        height="24px"
        background="transparent"
        fill={ThemeColors.textDark}
      >
        <PiTextAlignJustify size={18} />
      </IconButton>
    </div>
  );
};
