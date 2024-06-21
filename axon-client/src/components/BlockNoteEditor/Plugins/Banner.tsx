import {
  EditorConfig,
  ElementNode,
  LexicalEditor,
  SerializedElementNode,
  Spread,
  $createParagraphNode,
  LexicalNode,
  RangeSelection,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
  createCommand,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import IconButton from "src/components/Button/MenuButton";
import { StateColors, ThemeColors } from "src/shared/themes";
import { PiArticleFill } from "react-icons/pi";

export type SerializedBannerNode = Spread<
  {
    customValue: string;
  },
  SerializedElementNode
>;

export type BannerNodeStatus = "error" | "warning" | "success" | "info";

export class BannerNode extends ElementNode {
  status: BannerNodeStatus = "info";

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const div = document.createElement("div");
    switch (this.status) {
      case "error":
        div.className = _config.theme.banner.error;
        break;
      case "warning":
        div.className = _config.theme.banner.warning;
        break;
      case "success":
        div.className = _config.theme.banner.success;
        break;
      case "info":
        div.className = _config.theme.banner.info;
        break;
      default:
        div.className = _config.theme.banner.info;
    }
    return div;
  }

  static clone(node: BannerNode): BannerNode {
    return new BannerNode(node.__key);
  }

  static getType(): string {
    return "banner";
  }

  /**
   * Returning false tells Lexical that this node does not need its
   * DOM element replacing with a new copy from createDOM.
   */
  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false;
  }

  /**
   * Node should be set to paragraph when user delete all content
   */
  collapseAtStart(_: RangeSelection): boolean {
    const paragraph = $createParagraphNode();
    const children = this.getChildren();
    children.forEach((child) => paragraph.append(child));
    this.replace(paragraph);

    return true;
  }

  /**
   * Node should be set to paragraph when user press Enter.
   * Node will remain the same on ShiftEnter
   */
  insertNewAfter(
    _: RangeSelection,
    restoreSelection?: boolean
  ): LexicalNode | null {
    const paragraph = $createParagraphNode();
    const direction = this.getDirection();
    paragraph.setDirection(direction);
    this.insertAfter(paragraph, restoreSelection);

    return paragraph;
  }

  static importJSON(_: SerializedBannerNode): BannerNode {
    return new BannerNode();
  }

  exportJSON(): SerializedBannerNode {
    return {
      type: "banner",
      version: 1,
      children: [],
      customValue: "",
      format: "",
      indent: 1,
      direction: null,
    };
  }
}

// export const $createBannerNode = (status: BannerNodeStatus): BannerNode =>
//   new BannerNode(status);

export const $createBannerNode = (
  status: BannerNodeStatus
): (() => BannerNode) => {
  return () => {
    const node = new BannerNode();
    node.status = status;
    return node;
  };
};

export const INSERT_BANNER_COMMAND = createCommand("create_banner");

export const BannerPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  if (!editor.hasNode(BannerNode)) {
    throw new Error('BannerPlugin: "BannerNode" not registered on editor');
  }
  editor.registerCommand(
    INSERT_BANNER_COMMAND,
    (status: BannerNodeStatus) => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, $createBannerNode(status));
      }
      return true;
    },
    COMMAND_PRIORITY_NORMAL
  );

  return null;
};

export const BannerActionsPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const onClick = (status: BannerNodeStatus) => {
    editor.dispatchCommand(INSERT_BANNER_COMMAND, status);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
      }}
    >
      <IconButton
        id={`banner-actions-button-error`}
        name={""}
        onClick={() => onClick("error")}
        width="24px"
        height="24px"
        background="transparent"
        fill={StateColors.failed}
      >
        <PiArticleFill size={18} />
      </IconButton>
      <IconButton
        id={`banner-actions-button-info`}
        name={""}
        onClick={() => onClick("info")}
        width="24px"
        height="24px"
        background="transparent"
        fill={StateColors.open}
      >
        <PiArticleFill size={18} />
      </IconButton>
      <IconButton
        id={`banner-actions-button-success`}
        name={""}
        onClick={() => onClick("success")}
        width="24px"
        height="24px"
        background="transparent"
        fill={StateColors.success}
      >
        <PiArticleFill size={18} />
      </IconButton>
      <IconButton
        id={`banner-actions-button-warning`}
        name={""}
        onClick={() => onClick("warning")}
        width="24px"
        height="24px"
        background="transparent"
        fill={StateColors.warning}
      >
        <PiArticleFill size={18} />
      </IconButton>
    </div>
  );
};
