import {
  FormattingMenuButtonEvents,
  FormattingMenuButtonProps,
} from "./index.types";
import {
  PiTextB,
  PiTextItalic,
  PiTextStrikethrough,
  PiTextUnderline,
  PiCodeSimple,
  PiLinkSimpleHorizontalBreak,
  PiTextAlignLeft,
  PiTextAlignCenter,
  PiTextAlignJustify,
  PiTextH,
  PiTextHFour,
  PiTextHOne,
  PiTextT,
  PiParagraph,
  PiTextHTwo,
  PiTextHThree,
  PiTextHFive,
  PiTextHSix,
  PiTextAlignRight,
  PiTextTDuotone,
  PiTextAaFill,
} from "react-icons/pi";
import { BiFontColor } from "react-icons/bi";

export const FormattingMenuButtons: FormattingMenuButtonProps[] = [
  {
    id: "block",
    name: "Block",
    longText: "(Select a block type)",
    icon: <PiTextT size={16} />,
    submenus: true,
  },
  {
    id: "formatting",
    name: "Format",
    longText: "(Select a text format)",
    icon: <PiTextB size={16} />,
    submenus: true,
  },
  {
    id: "alignment",
    name: "Align",
    longText: "(Select a text alignment)",
    icon: <PiTextAlignLeft size={16} />,
    submenus: true,
  },
  {
    id: "color",
    name: "Color",
    longText: "(Select text or higlight color)",
    icon: <BiFontColor size={16} />,
    submenus: true,
  },
  {
    id: "insert",
    name: "Insert",
    longText: "(Insert components)",
    icon: <PiLinkSimpleHorizontalBreak size={16} />,
    submenus: true,
  },
];

export const FormattingButtonSubmenus: Partial<
  Record<FormattingMenuButtonEvents, FormattingMenuButtonProps[]>
> = {
  block: [
    {
      id: "paragraph",
      name: "Paragraph",
      icon: <PiParagraph size={16} />,
    },
    {
      id: "heading1",
      name: "Heading 1",
      icon: <PiTextHOne size={16} />,
    },
    {
      id: "heading2",
      name: "Heading 2",
      icon: <PiTextHTwo size={16} />,
    },
    {
      id: "heading3",
      name: "Heading 3",
      icon: <PiTextHThree size={16} />,
    },
    {
      id: "heading4",
      name: "Heading 4",
      icon: <PiTextHFour size={16} />,
    },
    {
      id: "heading5",
      name: "Heading 5",
      icon: <PiTextHFive size={16} />,
    },
    {
      id: "heading6",
      name: "Heading 6",
      icon: <PiTextHSix size={16} />,
    },
    {
      id: "orderedList",
      name: "Ordered List",
      icon: <PiTextAaFill size={16} />,
    },
    {
      id: "bulletList",
      name: "Bullet List",
      icon: <PiTextAaFill size={16} />,
    },
    {
      id: "code",
      name: "Code",
      icon: <PiCodeSimple size={16} />,
    },
    {
      id: "blockquote",
      name: "Blockquote",
      icon: <PiTextTDuotone size={16} />,
    },
  ],
  alignment: [
    {
      id: "align-left",
      name: "Align Text Left",
      icon: <>⌘ ⇧ L</>,
    },
    {
      id: "align-center",
      name: "Align Text Center",
      icon: <>⌘ ⇧ E</>,
    },
    {
      id: "align-justify",
      name: "Justify Text",
      icon: <>⌘ ⇧ J</>,
    },
  ],
  formatting: [
    {
      id: "bold",
      name: "Bold",
      icon: <>⌘ B</>,
    },
    {
      id: "italic",
      name: "Italic",
      icon: <>⌘ I</>,
    },
    {
      id: "underline",
      name: "Underline",
      icon: <>⌘ U</>,
    },
    {
      id: "strikethrough",
      name: "Strikethrough",
      icon: <>⌘ ⇧ X</>,
    },
    {
      id: "superscript",
      name: "Superscript",
      icon: <>⌘ .</>,
    },
    {
      id: "subscript",
      name: "Subscript",
      icon: <>⌘ ,</>,
    },
  ],
  insert: [
    {
      id: "block-link",
      name: "Insert Link",
      icon: <PiLinkSimpleHorizontalBreak size={16} />,
    },
    {
      id: "image",
      name: "Insert Image",
      icon: <PiLinkSimpleHorizontalBreak size={16} />,
    },
    {
      id: "hardBreak",
      name: "Insert Horizontal Break",
      icon: <PiLinkSimpleHorizontalBreak size={16} />,
    },
  ],
};
