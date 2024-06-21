import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import IconButton from "src/components/Button/MenuButton";
import { ThemeColors } from "src/shared/themes";
import {
  PiTextHOne,
  PiTextHFour,
  PiTextHTwo,
  PiTextHThree,
  PiTextHFive,
  PiTextHSix,
  PiParagraph,
} from "react-icons/pi";
import { FORMAT_PARAGRAPH_COMMAND } from "./Paragraph";
import { FORMAT_HEADING_COMMAND } from "./Heading";

export const useTextActionsPlugin = (): React.ReactNode[] => {
  const [editor] = useLexicalComposerContext();
  const namespace = editor._config.namespace;
  return [
    <IconButton
      id={`heading-1-action-${namespace}`}
      name={""}
      onClick={() => editor.dispatchCommand(FORMAT_HEADING_COMMAND, "h1")}
      width="24px"
      height="24px"
      background="transparent"
      fill={ThemeColors.textDark}
    >
      <PiTextHOne size={18} />
    </IconButton>,
    <IconButton
      id={`heading-2-action-${namespace}`}
      name={""}
      onClick={() => editor.dispatchCommand(FORMAT_HEADING_COMMAND, "h2")}
      width="24px"
      height="24px"
      background="transparent"
      fill={ThemeColors.textDark}
    >
      <PiTextHTwo size={18} />
    </IconButton>,
    <IconButton
      id={`heading-3-action-${namespace}`}
      name={""}
      onClick={() => editor.dispatchCommand(FORMAT_HEADING_COMMAND, "h3")}
      width="24px"
      height="24px"
      background="transparent"
      fill={ThemeColors.textDark}
    >
      <PiTextHThree size={18} />
    </IconButton>,
    <IconButton
      id={`heading-4-action-${namespace}`}
      name={""}
      onClick={() => editor.dispatchCommand(FORMAT_HEADING_COMMAND, "h4")}
      width="24px"
      height="24px"
      background="transparent"
      fill={ThemeColors.textDark}
    >
      <PiTextHFour size={18} />
    </IconButton>,
    <IconButton
      id={`heading-5-action-${namespace}`}
      name={""}
      onClick={() => editor.dispatchCommand(FORMAT_HEADING_COMMAND, "h5")}
      width="24px"
      height="24px"
      background="transparent"
      fill={ThemeColors.textDark}
    >
      <PiTextHFive size={18} />
    </IconButton>,
    <IconButton
      id={`heading-6-action-${namespace}`}
      name={""}
      onClick={() => editor.dispatchCommand(FORMAT_HEADING_COMMAND, "h6")}
      width="24px"
      height="24px"
      background="transparent"
      fill={ThemeColors.textDark}
    >
      <PiTextHSix size={18} />
    </IconButton>,
    <IconButton
      id={`paragraph-action-${namespace}`}
      name={""}
      onClick={() =>
        editor.dispatchCommand(FORMAT_PARAGRAPH_COMMAND, undefined)
      }
      width="24px"
      height="24px"
      background="transparent"
      fill={ThemeColors.textDark}
    >
      <PiParagraph size={18} />
    </IconButton>,
  ];
};
