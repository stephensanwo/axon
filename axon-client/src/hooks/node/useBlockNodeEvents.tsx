import { SerializedEditor } from "lexical";
import { useNoteContext } from "../notes/useNoteContext";
import { useMemo } from "react";
import { INode } from "src/types/node";

export const useBlockNodeEvents = (
  selectedNodeId: string
): {
  handleBlockNodeEditorStateUpdate: (editorState: string) => void;
} => {
  const { nodes, setNodes, selectedNode } = useNoteContext();

  const node = useMemo(() => {
    const node = nodes?.find((node) => node.id === selectedNodeId);
    return node;
  }, [selectedNodeId]);

  const handleBlockNodeEditorStateUpdate = (editorState: string) => {
    console.log("inhook", editorState);
    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              block: editorState,
            },
          };
        }
        return node;
      });

      return updatedNodes;
    });
  };

  return {
    handleBlockNodeEditorStateUpdate,
  };
};
