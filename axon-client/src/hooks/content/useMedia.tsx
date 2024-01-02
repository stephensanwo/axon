import { useContext } from "react";
import NoteContext from "src/context/notes";
import { INode } from "src/types/node";

export const useMedia = (): {
  handleMediaUrl: (
    imageInputUrl: string,
    setPreviewImage: React.Dispatch<boolean>
  ) => void;
} => {
  const { selectedNode, nodes, setNodes } = useContext(NoteContext);

  const handleMediaUrl = (
    imageInputUrl: string,
    setPreviewImage: React.Dispatch<boolean>
  ): void => {
    setPreviewImage(true);
    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              ...node.data,
              inlineImage: {
                url: imageInputUrl,
              },
            },
          };
        }
        return node;
      });

      return updatedNodes;
    });
  };

  return {
    handleMediaUrl,
  };
};
