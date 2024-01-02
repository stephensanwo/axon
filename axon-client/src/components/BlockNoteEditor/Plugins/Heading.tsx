import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  createCommand,
  COMMAND_PRIORITY_NORMAL,
} from "lexical";
import { $createHeadingNode, HeadingTagType } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { useEffect } from "react";

export const FORMAT_HEADING_COMMAND = createCommand("FORMAT_HEADING_COMMAND");

// export const HeadingActionsPlugin = (): React.ReactNode => {
//   const [editor] = useLexicalComposerContext();
//   const onClick = (level: HeadingTagType) => {
//     editor.update(() => {
//       editor.dispatchCommand(FORMAT_HEADING_COMMAND, level);
//     });
//   };
//   return <HeadingMenu onClick={onClick}></HeadingMenu>;
// };

// export const HeadingMenu: React.FC<{
//   onClick: (level: HeadingTagType) => void;
// }> = (props) => {
//   const { onClick } = props;
//   return (
//     <div
//       style={{
//         display: "flex",
//         gap: "8px",
//       }}
//     >
//       <IconButton
//         id={`test`}
//         name={""}
//         onClick={() => onClick("h1")}
//         width="24px"
//         height="24px"
//         background="transparent"
//         fill={ThemeColors.textDark}
//       >
//         <PiTextHOne size={18} />
//       </IconButton>
//       <IconButton
//         id={`test`}
//         name={""}
//         onClick={() => onClick("h4")}
//         width="24px"
//         height="24px"
//         background="transparent"
//         fill={ThemeColors.textDark}
//       >
//         <PiTextHFour size={18} />
//       </IconButton>
//     </div>
//   );
// };

export const HeadingPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerCommand<HeadingTagType>(
      FORMAT_HEADING_COMMAND,
      (payload) => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(payload));
        }
        return true;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, []);

  return null;
};
