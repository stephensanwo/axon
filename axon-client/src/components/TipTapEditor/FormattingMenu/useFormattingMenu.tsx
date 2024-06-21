import { Editor } from "@tiptap/react";
import {
  FormattingMenuButtonProps,
  FormattingMenuButtonEvents,
} from "./index.types";
import { FormattingButtonSubmenus } from "./buttons";
import { useNoteContext } from "src/hooks/notes/useNoteContext";
import { BiFontColor } from "react-icons/bi";
import { useMemo } from "react";

export function useFormattingMenu(): {
  formattingMenuActions: (
    editor: Editor | undefined,
    buttonEvent: FormattingMenuButtonEvents,
    value?: string | number
  ) => void;
  formattingMenuButtonIsActive: (
    editor: Editor | undefined,
    buttonEvent: FormattingMenuButtonEvents,
    value?: string | number
  ) => boolean;
  formattingSubmenus: (
    buttonEvent: FormattingMenuButtonEvents
  ) =>
    | Partial<Record<FormattingMenuButtonEvents, FormattingMenuButtonProps[]>>
    | undefined
    | null;
} {
  const { noteTheme } = useNoteContext();
  const formattingColors = useMemo(() => {
    return noteTheme?.colors.map((color) => {
      return {
        id: "color" as FormattingMenuButtonEvents,
        name: color.label,
        value: color.hex,
        icon: <BiFontColor size={16} fill={color.hex} />,
      };
    });
  }, [noteTheme]);

  const highlightColors = useMemo(() => {
    return noteTheme?.colors.map((color) => {
      return {
        id: "highlight" as FormattingMenuButtonEvents,
        name: color.label,
        value: color.hex,
        icon: <BiFontColor size={16} fill={color.hex} />,
      };
    });
  }, [noteTheme]);

  function formattingMenuActions(
    editor: Editor | undefined,
    buttonEvent: FormattingMenuButtonEvents,
    value?: string | number
  ) {
    if (!editor) return;
    switch (buttonEvent) {
      case "heading1":
        editor.chain().focus().setHeading({ level: 1 }).run();
        break;
      case "heading2":
        editor.chain().focus().setHeading({ level: 2 }).run();
        break;
      case "heading3":
        editor.chain().focus().setHeading({ level: 3 }).run();
        break;
      case "heading4":
        editor.chain().focus().setHeading({ level: 4 }).run();
        break;
      case "heading5":
        editor.chain().focus().setHeading({ level: 5 }).run();
        break;
      case "heading6":
        editor.chain().focus().setHeading({ level: 6 }).run();
        break;
      case "paragraph":
        editor.chain().focus().setParagraph().run();
        break;

      // formatting
      case "bold":
        editor.chain().focus().toggleBold().run();
        break;
      case "italic":
        editor.chain().focus().toggleItalic().run();
        break;
      case "underline":
        editor.chain().focus().toggleUnderline().run();
        break;
      case "strikethrough":
        editor.chain().focus().toggleStrike().run();
        break;
      case "superscript":
        editor.chain().focus().toggleSuperscript().run();
        break;
      case "subscript":
        editor.chain().focus().toggleSubscript().run();
        break;

      // alignment
      case "align-left":
        editor.chain().focus().setTextAlign("left").run();
        break;
      case "align-center":
        editor.chain().focus().setTextAlign("center").run();
        break;
      case "align-justify":
        editor.chain().focus().setTextAlign("justify").run();
        break;
      case "color":
        editor
          .chain()
          .focus()
          .setColor(value as string)
          .run();
        break;
      case "highlight":
        editor
          .chain()
          .focus()
          .toggleHighlight({ color: value as string })
          .run();
        break;
      default:
        break;
    }
  }

  function formattingMenuButtonIsActive(
    editor: Editor | undefined,
    buttonEvent: FormattingMenuButtonEvents,
    value?: string | number
  ) {
    if (!editor) return false;
    switch (buttonEvent) {
      case "heading1":
        return editor.isActive("heading", { level: 1 });
      case "heading2":
        return editor.isActive("heading", { level: 2 });
      case "heading3":
        return editor.isActive("heading", { level: 3 });
      case "heading4":
        return editor.isActive("heading", { level: 4 });
      case "heading5":
        return editor.isActive("heading", { level: 5 });
      case "heading6":
        return editor.isActive("heading", { level: 6 });
      case "paragraph":
        return editor.isActive("paragraph");
      case "bold":
        return editor.isActive("bold");
      case "italic":
        return editor.isActive("italic");
      case "align-left":
        return editor.isActive({ textAlign: "left" });
      case "align-center":
        return editor.isActive({ textAlign: "center" });
      case "align-justify":
        return editor.isActive({ textAlign: "justify" });
      case "text-color":
        return editor.isActive("textStyle", { color: value as string });
      case "highlight":
        return editor.isActive("highlight", { color: value as string });
      default:
        return false;
    }
  }

  function formattingSubmenus(
    buttonEvent: FormattingMenuButtonEvents
  ):
    | Partial<Record<FormattingMenuButtonEvents, FormattingMenuButtonProps[]>>
    | undefined
    | null {
    switch (buttonEvent) {
      case "block":
        return {
          block: FormattingButtonSubmenus[buttonEvent],
        };
      case "alignment":
        return {
          alignment: FormattingButtonSubmenus[buttonEvent],
        };
      case "formatting":
        return {
          formatting: FormattingButtonSubmenus[buttonEvent],
        };
      case "color":
        return {
          "text-color": formattingColors,
          highlight: highlightColors,
        };
      case "insert":
        return {
          insert: FormattingButtonSubmenus[buttonEvent],
        };
      default:
        return null;
    }
  }
  return {
    formattingMenuActions,
    formattingMenuButtonIsActive,
    formattingSubmenus,
  };
}
