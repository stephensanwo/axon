import "./index.css";
import { $isCodeHighlightNode } from "@lexical/code";
import {
  $isLinkNode,
  TOGGLE_LINK_COMMAND,
  $createLinkNode,
} from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
  ElementFormatType,
  ElementNode,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
  TextNode,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
  getDOMRangeRect,
  getSelectedNode,
  getSelectionFormat,
  setFloatingElemPosition,
} from "../utils";
import { FloatingMenuWrapper } from "./style";
import IconButton from "src/components/Button/IconButton";
import { ThemeColors } from "src/shared/themes";
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
  PiTextT,
} from "react-icons/pi";
import { RiSubscript, RiSuperscript } from "react-icons/ri";
import IconDropdownButton from "src/components/Button/IconDropdownButton";
import { FloatingMenuDropdownTypes } from "../interface";
import { FloatingMenuDropdown } from "./Dropdown";
import { sanitizeUrl } from "src/utils/url";
// import {INSERT_INLINE_COMMAND} from '../CommentPlugin';

function TextFormatFloatingToolbar({
  editor,
  anchorElem,
  isLink,
  isBold,
  isItalic,
  isUnderline,
  isCode,
  isStrikethrough,
  isSubscript,
  isSuperscript,
  alignmentType,
  isOpen,
  currentNode,
  parentNode,
}: {
  editor: LexicalEditor;
  anchorElem: HTMLElement;
  isBold: boolean;
  isCode: boolean;
  isItalic: boolean;
  isLink: boolean;
  isStrikethrough: boolean;
  isSubscript: boolean;
  isSuperscript: boolean;
  isUnderline: boolean;
  alignmentType: ElementFormatType;
  isOpen: boolean;
  currentNode: any;
  parentNode: any;
}): JSX.Element {
  const popupCharStylesEditorRef = useRef<HTMLDivElement | null>(null);
  const [showDropdown, setShowDropdown] =
    useState<FloatingMenuDropdownTypes | null>(null);
  const namespace = editor._config.namespace;

  const getLinkUrl = useCallback(() => {
    let link: string = "";
    editor.getEditorState().read(() => {
      if (parentNode && isLink) {
        console.log("getLinkUrl", parentNode!!.getURL());
        link = parentNode.getURL();
      }
    });

    if (link) {
      return link;
    }

    return "";
  }, [editor, currentNode, isLink]);

  const setLinkUrl = useCallback(
    (link: string) => {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl(link));
    },
    [editor, currentNode, isLink]
  );

  const unLink = useCallback(() => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
  }, [editor, currentNode, isLink]);

  function mouseMoveListener(e: MouseEvent) {
    if (
      popupCharStylesEditorRef?.current &&
      (e.buttons === 1 || e.buttons === 3)
    ) {
      if (popupCharStylesEditorRef.current.style.pointerEvents !== "none") {
        const x = e.clientX;
        const y = e.clientY;
        const elementUnderMouse = document.elementFromPoint(x, y);

        if (!popupCharStylesEditorRef.current.contains(elementUnderMouse)) {
          // Mouse is not over the target element => not a normal click, but probably a drag
          popupCharStylesEditorRef.current.style.pointerEvents = "none";
        }
      }
    }
  }

  function mouseUpListener(e: MouseEvent) {
    if (popupCharStylesEditorRef?.current) {
      if (popupCharStylesEditorRef.current.style.pointerEvents !== "auto") {
        popupCharStylesEditorRef.current.style.pointerEvents = "auto";
      }
    }
  }

  useEffect(() => {
    if (popupCharStylesEditorRef?.current) {
      document.addEventListener("mousemove", mouseMoveListener);
      document.addEventListener("mouseup", mouseUpListener);

      return () => {
        document.removeEventListener("mousemove", mouseMoveListener);
        document.removeEventListener("mouseup", mouseUpListener);
      };
    }
  }, [popupCharStylesEditorRef]);

  const updateTextFormatFloatingToolbar = useCallback(() => {
    const selection = $getSelection();

    const popupCharStylesEditorElem = popupCharStylesEditorRef.current;
    const nativeSelection = window.getSelection();

    if (popupCharStylesEditorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement);

      setFloatingElemPosition(
        rangeRect,
        popupCharStylesEditorElem,
        anchorElem,
        isLink
      );
    }
  }, [editor, anchorElem, isLink]);

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement;

    const update = () => {
      editor.getEditorState().read(() => {
        updateTextFormatFloatingToolbar();
      });
    };

    window.addEventListener("resize", update);
    if (scrollerElem) {
      scrollerElem.addEventListener("scroll", update);
    }

    return () => {
      window.removeEventListener("resize", update);
      if (scrollerElem) {
        scrollerElem.removeEventListener("scroll", update);
      }
    };
  }, [editor, updateTextFormatFloatingToolbar, anchorElem]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateTextFormatFloatingToolbar();
    });
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateTextFormatFloatingToolbar();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateTextFormatFloatingToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, updateTextFormatFloatingToolbar]);

  return (
    <>
      {isOpen && (
        <FloatingMenuWrapper
          ref={popupCharStylesEditorRef}
          className="floating-text-format-popup"
          showDropdown={showDropdown}
        >
          <div data-floating-menu>
            {editor.isEditable() && (
              <>
                <IconButton
                  id={`bold-text-action-${namespace}`}
                  name={"Bold"}
                  selected={isBold}
                  width="24px"
                  height="24px"
                  onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
                  }}
                  background="transparent"
                  fill={ThemeColors.textDark}
                  hoverfill={ThemeColors.primary}
                >
                  <PiTextB size={18} />
                </IconButton>
                <IconButton
                  id={`underline-text-action-${namespace}`}
                  name={"Underline"}
                  selected={isUnderline}
                  width="24px"
                  height="24px"
                  onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
                  }}
                  background="transparent"
                  fill={ThemeColors.textDark}
                  hoverfill={ThemeColors.primary}
                >
                  <PiTextUnderline size={18} />
                </IconButton>
                <IconButton
                  id={`italic-text-action-${namespace}`}
                  name={"Italic"}
                  selected={isItalic}
                  width="24px"
                  height="24px"
                  onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                  }}
                  background="transparent"
                  fill={ThemeColors.textDark}
                  hoverfill={ThemeColors.primary}
                >
                  <PiTextItalic size={18} />
                </IconButton>
                <IconButton
                  id={`strikethrough-text-action-${namespace}`}
                  name={"Strike Through"}
                  selected={isStrikethrough}
                  width="24px"
                  height="24px"
                  onClick={() => {
                    editor.dispatchCommand(
                      FORMAT_TEXT_COMMAND,
                      "strikethrough"
                    );
                  }}
                  background="transparent"
                  fill={ThemeColors.textDark}
                  hoverfill={ThemeColors.primary}
                >
                  <PiTextStrikethrough size={18} />
                </IconButton>
                <IconButton
                  id={`subscript-text-action-${namespace}`}
                  name={"Subscript"}
                  selected={isSubscript}
                  width="24px"
                  height="24px"
                  onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
                  }}
                  background="transparent"
                  fill={ThemeColors.textDark}
                  hoverfill={ThemeColors.primary}
                >
                  <RiSubscript size={18} />
                </IconButton>
                <IconButton
                  id={`superscript-text-action-${namespace}`}
                  name={"Superscript"}
                  selected={isSuperscript}
                  width="24px"
                  height="24px"
                  onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
                  }}
                  background="transparent"
                  fill={ThemeColors.textDark}
                  hoverfill={ThemeColors.primary}
                >
                  <RiSuperscript size={18} />
                </IconButton>
                <IconDropdownButton
                  id={`align-text-dropdown-${namespace}`}
                  name={"Align"}
                  toggleState={showDropdown === "align"}
                  setToggleState={() =>
                    setShowDropdown((dropDown) =>
                      dropDown === "align" ? null : "align"
                    )
                  }
                  currentIcon={
                    alignmentType === "right" ? (
                      <PiTextAlignLeft size={18} />
                    ) : alignmentType === "center" ? (
                      <PiTextAlignCenter size={18} />
                    ) : alignmentType === "justify" ? (
                      <PiTextAlignJustify size={18} />
                    ) : (
                      <PiTextAlignLeft size={18} />
                    )
                  }
                />
                <IconDropdownButton
                  id={`format-text-dropdown-${namespace}`}
                  name={"Format"}
                  toggleState={showDropdown === "text"}
                  setToggleState={() =>
                    setShowDropdown((dropDown) =>
                      dropDown === "text" ? null : "text"
                    )
                  }
                  currentIcon={<PiTextT size={18} />}
                />
                <IconButton
                  id={"test"}
                  name={"name"}
                  selected={isCode}
                  width="24px"
                  height="24px"
                  onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
                  }}
                  background="transparent"
                  fill={ThemeColors.textDark}
                  hoverfill={ThemeColors.primary}
                >
                  <PiCodeSimple size={18} />
                </IconButton>
                <IconButton
                  id={"test"}
                  name={"name"}
                  selected={isLink}
                  width="24px"
                  height="24px"
                  onClick={() =>
                    setShowDropdown((dropDown) =>
                      dropDown === "link" ? null : "link"
                    )
                  }
                  background="transparent"
                  fill={ThemeColors.textDark}
                  hoverfill={ThemeColors.primary}
                >
                  <PiLinkSimpleHorizontalBreak size={18} />
                </IconButton>
              </>
            )}
          </div>
          <FloatingMenuDropdown
            dropDownType={showDropdown}
            namespace={namespace}
            currentValue={{ link: getLinkUrl() }}
            action={{ link: { setLinkUrl: setLinkUrl, unLink: unLink } }}
          />
        </FloatingMenuWrapper>
      )}
    </>
  );
}

function useFloatingToolbar(
  editor: LexicalEditor,
  anchorElem: HTMLElement
): JSX.Element | null {
  const [isText, setIsText] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [alignment, setAlignment] = useState<ElementFormatType>("left");
  const [isOpenTextFormatter, setIsOpenTextFormatter] = useState(false);
  const [currentNode, setCurrentNode] = useState<any>(null);
  const [parentNode, setParentNode] = useState<any>(null);

  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      // Should not to pop up the floating toolbar when using IME input
      if (editor.isComposing()) {
        return;
      }
      const selection = $getSelection();
      const nativeSelection = window.getSelection();
      const rootElement = editor.getRootElement();

      if (
        nativeSelection !== null &&
        (!$isRangeSelection(selection) ||
          rootElement === null ||
          !rootElement.contains(nativeSelection.anchorNode))
      ) {
        setIsText(false);
        return;
      }

      if (!$isRangeSelection(selection)) {
        return;
      }

      // Get node details
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      console.log("node", node);

      setCurrentNode(node);
      setParentNode(parent);

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsSubscript(selection.hasFormat("subscript"));
      setIsSuperscript(selection.hasFormat("superscript"));
      setIsCode(selection.hasFormat("code"));

      // Uodate alignment
      const selectionFormat = getSelectionFormat(selection);
      setAlignment(selectionFormat);

      // Update links

      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (
        !$isCodeHighlightNode(selection.anchor.getNode()) &&
        selection.getTextContent() !== ""
      ) {
        setIsText($isTextNode(node) || $isParagraphNode(node));
      } else {
        setIsText(false);
      }

      const rawTextContent = selection.getTextContent().replace(/\n/g, "");
      if (!selection.isCollapsed() && rawTextContent === "") {
        setIsText(false);
        return;
      }
    });
  }, [editor]);

  const handleToggle = () => {
    setIsOpenTextFormatter(true);
  };

  const handleMenu = (event: KeyboardEvent) => {
    if (event.key === "/") {
      console.log("event.key", event.key);
    }
  };

  useEffect(() => {
    editor.getEditorState().read(() => {
      // check if the user types / or @
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        setIsOpenTextFormatter(true);
      }
    });

    anchorElem.addEventListener("selectionchange", handleToggle);
    anchorElem.addEventListener("keyup", function (event) {
      handleMenu(event);
    });
    return () => {
      anchorElem.removeEventListener("selectionchange", handleToggle);
    };
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        setIsOpenTextFormatter(true);
        updatePopup();
      }),
      editor.registerRootListener(() => {
        if (editor.getRootElement() === null) {
          setIsText(false);
        }
      })
    );
  }, [editor, updatePopup]);

  if (!isText) {
    return null;
  }

  return (
    <>
      {isOpenTextFormatter &&
        createPortal(
          <TextFormatFloatingToolbar
            editor={editor}
            anchorElem={anchorElem}
            isLink={isLink}
            isBold={isBold}
            isItalic={isItalic}
            isStrikethrough={isStrikethrough}
            isSubscript={isSubscript}
            isSuperscript={isSuperscript}
            isUnderline={isUnderline}
            isCode={isCode}
            alignmentType={alignment}
            isOpen={isOpenTextFormatter}
            currentNode={currentNode}
            parentNode={parentNode}
          />,
          anchorElem
        )}
    </>
  );
}

export default function FloatingTextFormatToolbarPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  return useFloatingToolbar(editor, anchorElem);
}
