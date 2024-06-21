import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createLineBreakNode,
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
} from "lexical";
import IconButton from "src/components/Button/MenuButton";
import { RxDividerHorizontal } from "react-icons/rx";
import { ThemeColors } from "src/shared/themes";

export const HorizontalRulePlugin = (): React.ReactNode => {
  const [editor] = useLexicalComposerContext();
  const onClick = () => {
    editor.update(() => {
      const root = $getRoot();
      const selection = $getSelection();
      // TODO: if there is a selection, replace the selection with the new node
      // otherwise, append the node to the root
      // create divider
      root.append($createLineBreakNode());
    });
  };
  return <HorizontalRuleMenu onClick={onClick}></HorizontalRuleMenu>;
};

export const HorizontalRuleMenu: React.FC<{
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
        <RxDividerHorizontal size={16} />
      </IconButton>
    </>
  );
};
