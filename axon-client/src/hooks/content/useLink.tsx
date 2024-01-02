import { useState, useContext, useMemo } from "react";
import { isValidURL } from "src/components/Content/ContentTypes/Link/utils";
import { JSON_LINK_API_KEY } from "src/config";
import NoteContext from "src/context/notes";
import { INode, INodeLinkContent } from "src/types/node";

export const useLink = (): {
  link: INodeLinkContent | undefined;
  handleLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetLinkData: (
    setLinkState: React.Dispatch<"error" | "loading" | null>,
    setPreviewLink: React.Dispatch<boolean>
  ) => void;
  fetchLinkData: (
    url: string,
    setLinkState: React.Dispatch<"error" | "loading" | null>,
    setPreviewLink: React.Dispatch<boolean>
  ) => Promise<void>;
} => {
  const { selectedNode, nodes, setNodes } = useContext(NoteContext);
  const [link, setLink] = useState<INodeLinkContent>();

  useMemo(() => {
    const node = nodes?.find((node) => node.id === selectedNode?.id);
    setLink(node?.data.link!!);
    return node;
  }, []);

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newUrl = e.target.value;

    setLink((prevLink) => {
      return {
        ...prevLink,
        url: newUrl,
      } as INodeLinkContent;
    });

    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              ...node.data,
              link: {
                ...node.data.link,
                url: newUrl,
                isLoadable: isValidURL(newUrl),
              },
            },
          };
        }
        return node;
      });

      return updatedNodes;
    });
  };

  const resetLinkData = (
    setLinkState: React.Dispatch<"error" | "loading" | null>,
    setPreviewLink: React.Dispatch<boolean>
  ): void => {
    setLinkState(null);
    setPreviewLink(false);
  };

  const fetchLinkData = (
    url: string,
    setLinkState: React.Dispatch<"error" | "loading" | null>,
    setPreviewLink: React.Dispatch<boolean>
  ): any => {
    const apiUrl = `https://jsonlink.io/api/extract?url=${url}&api_key=${JSON_LINK_API_KEY}`;
    setLinkState("loading");
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const title = data.title ?? "Link title";
        const description = data.description ?? "Link description";
        const image =
          data.images[0] ?? `https://placehold.co/600x400?text=${title}`;
        console.log("fetchLinkData data", data.description);
        setLinkState(null);
        setPreviewLink(true);
        setNodes((nds: INode[]) => {
          const updatedNodes = nds.map((node) => {
            if (node.id === selectedNode?.id) {
              return {
                ...node,
                data: {
                  ...node.data,
                  link: {
                    ...node.data.link,
                    url: url,
                    isLoadable: true,
                    title: title,
                    description: description,
                    image: image,
                  },
                },
              };
            }
            return node;
          });

          return updatedNodes;
        });
      })
      .catch(() => {
        setLinkState("error");
        setPreviewLink(false);
        setNodes((nds: INode[]) => {
          const updatedNodes = nds.map((node) => {
            if (node.id === selectedNode?.id) {
              return {
                ...node,
                data: {
                  ...node.data,
                  link: {
                    ...node.data.link,
                    url: url,
                    isLoadable: false,
                  },
                },
              };
            }
            return node;
          });

          return updatedNodes;
        });
      });
  };

  return { link, handleLinkChange, resetLinkData, fetchLinkData };
};
