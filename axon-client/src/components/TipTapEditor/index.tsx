import { Box } from "@primer/react";
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
  JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./styles.scss";
import MenuButton from "../Button/MenuButton";
import { PiTextHFour } from "react-icons/pi";
import FormattingMenu from "./FormattingMenu";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Code from "@tiptap/extension-code";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Link from "@tiptap/extension-link";
// define your extension array
const extensions = [
  StarterKit,
  Document,
  Heading,
  Paragraph,
  Text,
  Link,
  TextAlign.configure({
    types: ["textStyle"],
  }),
  Color.configure({ types: ["textStyle"] }),
  TextStyle,
  Highlight.configure({ multicolor: true }),
  Code.configure({
    HTMLAttributes: {
      class: "my-custom-class",
    },
  }),
  Underline,
  Subscript,
  Superscript,
];

const Tiptap = (props: {
  content: string;
  updateEvent: (json: JSONContent) => void;
}) => {
  const editor = useEditor({
    extensions,
    content: props.content,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      props.updateEvent(json);
    },
  });

  return (
    <Box>
      <EditorContent
        editor={editor}
        style={{
          height: "50vh",
        }}
      />
      <FloatingMenu editor={editor!!}>This is the floating menu</FloatingMenu>
      <FormattingMenu editor={editor!!} />
    </Box>
  );
};

export default Tiptap;
