import { useContext, useMemo, useState } from "react";
import NoteContext from "src/context/notes";
import { INode, INodeCodeContent } from "src/types/node";

export const useCode = (): {
  code: INodeCodeContent | undefined;
  handleLanguageChange: (lang: string) => void;
  handleCodeChange: (value: string | undefined, event: any) => void;
} => {
  const { selectedNode, nodes, setNodes } = useContext(NoteContext);
  const [code, setCode] = useState<INodeCodeContent>();

  useMemo(() => {
    const node = nodes?.find((node) => node.id === selectedNode?.id);
    setCode(node?.data.code!!);
    return node;
  }, [nodes]);

  const handleLanguageChange = (lang: string) => {
    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              ...node.data,
              code: {
                ...node.data.code,
                language: lang,
              },
            },
          };
        }
        return node;
      });

      return updatedNodes;
    });
  };

  const handleCodeChange = (value: string | undefined, event: any) => {
    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              ...node.data,
              code: {
                ...node.data.code,
                code: value,
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
    code,
    handleLanguageChange,
    handleCodeChange,
  };
};
