import { useContext, useMemo, useState } from "react";
import NoteContext from "src/context/notes";
import { INode, INodeJsonEditorContent } from "src/types/node";

export const useJson = (): {
  json: INodeJsonEditorContent | undefined;
  handleJsonUpdate: (value: string | undefined, event: any) => void;
} => {
  const { selectedNode, nodes, setNodes } = useContext(NoteContext);
  const [json, setJson] = useState<INodeJsonEditorContent>();

  useMemo(() => {
    console.log("init");
    const node = nodes?.find((node) => node.id === selectedNode?.id);
    setJson(node?.data.json!!);
    return node;
  }, [nodes]);

  const handleJsonUpdate = (value: string | undefined, event: any) => {
    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              ...node.data,
              json: {
                ...node.data.json,
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
    json,
    handleJsonUpdate,
  };
};
