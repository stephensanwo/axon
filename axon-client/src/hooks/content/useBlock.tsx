import { JSONContent } from "@tiptap/react";
import { SerializedEditor } from "lexical";
import { useContext, useMemo, useState } from "react";
import NoteContext from "src/context/notes";
import { INode, INodeJsonEditorContent } from "src/types/node";

export const useBlock = (): {
  block: JSONContent | undefined;
  handleBlockEditorStateUpdate: (editorState: JSONContent) => void;
} => {
  const { selectedNode, nodes, setNodes } = useContext(NoteContext);
  const [block, setBlock] = useState<JSONContent>();

  useMemo(() => {
    const node = nodes?.find((node) => node.id === selectedNode?.id);
    setBlock(node?.data.block_note!!);
    return node;
  }, [nodes, selectedNode]);

  const handleBlockEditorStateUpdate = (editorState: JSONContent) => {
    console.log("inhook", editorState);
    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              ...node.data,
              block_note: editorState,
            },
          };
        }
        return node;
      });

      return updatedNodes;
    });
  };

  return {
    block,
    handleBlockEditorStateUpdate,
  };
};
