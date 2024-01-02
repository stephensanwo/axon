import { useContext, useMemo, useState } from "react";
import NoteContext from "src/context/notes";
import { IMAGE_ERROR_URL } from "src/types/image";
import { INode, INodeMarkdownContent } from "src/types/node";

export const useMarkdown = (): {
  markdown: INodeMarkdownContent | undefined;
  getMarkdownData: () => string | undefined;
  handleMarkdownUpdate: (value: string | undefined, event: any) => void;
} => {
  const { selectedNode, nodes, setNodes } = useContext(NoteContext);
  const [markdown, setMarkdown] = useState<INodeMarkdownContent>();

  useMemo(() => {
    const node = nodes?.find((node) => node.id === selectedNode?.id);
    setMarkdown(node?.data.markdown!!);
    return node;
  }, [nodes]);

  const getMarkdownData = () => {
    return markdown?.data;
  };

  const handleMarkdownUpdate = (value: string | undefined, event: any) => {
    console.log("value", value);
    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              ...node.data,
              markdown: {
                ...node.data.markdown,
                data: value,
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
    markdown,
    getMarkdownData,
    handleMarkdownUpdate,
  };
};
