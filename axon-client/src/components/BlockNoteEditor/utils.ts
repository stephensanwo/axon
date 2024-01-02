import { $isAtNodeEnd } from "@lexical/selection";
import {
  ElementNode,
  RangeSelection,
  TextNode,
  $isElementNode,
  GridSelection,
  NodeSelection,
  ElementFormatType,
  $isTextNode,
} from "lexical";
import { $isDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";

export function getSelectedNode(
  selection: RangeSelection
): TextNode | ElementNode {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
  }
}

export function getDOMRangeRect(
  nativeSelection: Selection,
  rootElement: HTMLElement
): DOMRect {
  const domRange = nativeSelection.getRangeAt(0);

  let rect;

  if (nativeSelection.anchorNode === rootElement) {
    let inner = rootElement;
    while (inner.firstElementChild != null) {
      inner = inner.firstElementChild as HTMLElement;
    }
    rect = inner.getBoundingClientRect();
  } else {
    rect = domRange.getBoundingClientRect();
  }

  return rect;
}

const VERTICAL_GAP = 2;
const HORIZONTAL_OFFSET = 5;

export function setFloatingElemPosition(
  targetRect: DOMRect | null,
  floatingElem: HTMLElement,
  anchorElem: HTMLElement,
  isLink: boolean = false,
  verticalGap: number = VERTICAL_GAP,
  horizontalOffset: number = HORIZONTAL_OFFSET
): void {
  const scrollerElem = anchorElem.parentElement;

  if (targetRect === null || !scrollerElem) {
    floatingElem.style.opacity = "0";
    floatingElem.style.transform = "translate(-10000px, -10000px)";
    return;
  }

  const floatingElemRect = floatingElem.getBoundingClientRect();
  const anchorElementRect = anchorElem.getBoundingClientRect();
  const editorScrollerRect = scrollerElem.getBoundingClientRect();

  let top = targetRect.top - floatingElemRect.height + verticalGap;
  let left = targetRect.left - horizontalOffset;

  if (top < editorScrollerRect.top) {
    // adjusted height for link element if the element is at top
    top +=
      floatingElemRect.height +
      targetRect.height +
      verticalGap * (isLink ? 9 : 2);
  }

  if (left + floatingElemRect.width > editorScrollerRect.right) {
    left = editorScrollerRect.right - floatingElemRect.width - horizontalOffset;
  }
  console.log("anchorElementRect", targetRect);
  top += anchorElementRect.top + targetRect.height;
  left += anchorElementRect.left;

  floatingElem.style.opacity = "1";
  floatingElem.style.transform = `translate(${left}px, ${top}px)`;
}

export function getSelectionFormat(
  selection: RangeSelection | NodeSelection | GridSelection
): ElementFormatType {
  const nodes = selection.getNodes();
  const formatSet = new Set<ElementFormatType>();

  for (const node of nodes) {
    const topNode = node.getTopLevelElementOrThrow();
    if ($isDecoratorBlockNode(topNode)) {
      formatSet.add(node.getFormat());
    } else if ($isElementNode(topNode) || $isTextNode(topNode)) {
      formatSet.add(topNode.getFormatType());
    }
  }

  return formatSet.size === 1 ? formatSet.values().next().value : "";
}

export function getSelectionNodeType(
  selection: RangeSelection | NodeSelection | GridSelection
): string {
  const nodes = selection.getNodes();
  const nodeSet = new Set<string>();

  for (const node of nodes) {
    const topNode = node.getTopLevelElementOrThrow();
    if ($isDecoratorBlockNode(topNode)) {
      nodeSet.add(node.getType());
    } else if ($isElementNode(topNode) || $isTextNode(topNode)) {
      nodeSet.add(topNode.getType());
    }
  }

  return nodeSet.size === 1 ? nodeSet.values().next().value : "";
}
