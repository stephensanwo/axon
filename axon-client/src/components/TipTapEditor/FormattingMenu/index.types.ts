import {
  Editor,
  BubbleMenuProps as TipTapBubbleMenuProps,
} from "@tiptap/react";
export type BubbleMenuProps = Omit<TipTapBubbleMenuProps, "children"> & {
  editor: Editor | null;
};

export type FormattingMenuButtonEvents =
  // block type
  | "block"
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6"
  | "paragraph"
  | "blockquote"
  | "codeBlock"
  | "orderedList"
  | "bulletList"
  | "link"

  // text formatting
  | "formatting"
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "superscript"
  | "subscript"

  // alignment
  | "alignment"
  | "align-left"
  | "align-center"
  | "align-right"
  | "align-justify"
  | "strikethrough"
  | "color"
  | "text-color"
  | "highlight"
  | "listItem"
  | "link"
  | "code"

  // insert
  | "insert"
  | "code-block"
  | "youtube"
  | "table"
  | "image"
  | "block-link"
  | "horizontalRule"
  | "hardBreak";

export type FormattingMenuButtonProps = {
  id: FormattingMenuButtonEvents;
  name: string;
  icon: React.ReactNode;
  submenus?: boolean;
  value?: string | number;
  longText?: string;
};
