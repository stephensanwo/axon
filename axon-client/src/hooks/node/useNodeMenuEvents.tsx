import React, { useCallback } from "react";
import { NodeMenuEvents, NodeTypes } from "src/types/node";

export const useNodeMenuEvents = (): {
  toggleNodeMenu: (
    nodeMenu: NodeMenuEvents,
    setNodeMenu: React.Dispatch<React.SetStateAction<NodeMenuEvents | null>>
  ) => void;
  nodeMenuState: (id: NodeMenuEvents, type: NodeTypes) => boolean;
} => {
  const nodeMenuState = (id: NodeMenuEvents, type: NodeTypes): boolean => {
    // Disable select icon for all nodes except icon nodes
    if (id === "select-icon" && type !== "icon") {
      return true;
    }
    // Disable node content toggle for text nodes
    if (id === "node-content" && type === "paragraph") {
      return true;
    }
    // Disable text formatting toggle for icon nodes
    if (id === "text-formatting" && type === "icon") {
      return true;
    }

    // Disable Node themes Node text formatting ans Node formatting for link nodes
    if (
      (id === "node-theme" ||
        id === "text-formatting" ||
        id === "node-formatting") &&
      type === "link"
    ) {
      return true;
    }
    return false;
  };

  const toggleNodeMenu = useCallback(
    (
      nodeMenu: NodeMenuEvents | null,
      setNodeMenu: React.Dispatch<React.SetStateAction<NodeMenuEvents | null>>
    ) => {
      setNodeMenu((prevMenu) => {
        if (prevMenu === null) {
          return nodeMenu;
        } else if (prevMenu === nodeMenu) {
          return null;
        } else {
          return nodeMenu;
        }
      });
    },
    []
  );

  return {
    toggleNodeMenu,
    nodeMenuState,
  };
};
