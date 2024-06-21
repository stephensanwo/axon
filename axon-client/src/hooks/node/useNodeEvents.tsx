import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CarbonIcons, CommomCarbonIcons } from "src/assets/carbon_icons";
import NodeContext from "src/context/node";
import NoteContext from "src/context/notes";
import { ThemeColors } from "src/shared/themes";
import { EdgeTypes, IEdge } from "src/types/edge";
import {
  BLOCK_EDITOR_INITIAL_STATE,
  BorderStyles,
  FontAlignments,
  FontWeights,
  INodeCodeContent,
  INodeIcon,
  INodeInlineImage,
  INodeJsonEditorContent,
  INodeLinkContent,
  INodeMarkdownContent,
  NodeContentTypes,
  NodeHandlePositions,
  NodeIconSizes,
  NodeThemes,
  NodeTypes,
} from "src/types/node";
import { INode, NodeDataProps, NodeStyleProps } from "src/types/node";
import { ulid } from "ulid";

import {
  Connection,
  HandleType,
  Node,
  OnConnectStartParams,
  ResizeParams,
  XYPosition,
  useReactFlow,
} from "reactflow";
import { useNoteContext } from "../notes/useNoteContext";
import { SerializedEditor } from "lexical";
import { JSONContent } from "@tiptap/react";

export const useNodeEvents = (): {
  node: INode | undefined;
  onConnect: (connection: Connection) => void;
  onConnectStart: (
    event: any,
    params: {
      nodeId: string | null;
      handleId: string | null;
      handleType: HandleType | null;
    }
  ) => void;
  onConnectEnd: (event: any) => void;
  onNodeDragStart: (event: any, node: Node, nodes: Node[]) => void;
  onNodeDragStop: (event: any, node: Node, nodes: Node[]) => void;
  createNewNode: (
    node_type: NodeTypes,
    node_content_type: NodeContentTypes | null,
    position?: XYPosition
  ) => void;
  duplicateNode: (data: NodeDataProps, type: NodeTypes) => void;
  deleteNode: (id: string) => void;
  onResizeStart: (id: string, params: ResizeParams) => void;
  onResizeEnd: (id: string, params: ResizeParams) => void;
  updateNodeTheme: (theme: Partial<NodeThemes>) => void;
  updateNodeColor: (color: string) => void;
  updateNodeFontWeight: (fontWeight: FontWeights) => void;
  updateNodeBorderRadius: (raduis: number) => void;
  updateNodeBorderStyle: (borderStyle: BorderStyles) => void;
  updateNodeFontSize: (fontSize: number) => void;
  updateNodeFontAlignment: (alignment: FontAlignments) => void;
  setDefaultStyles: () => void;
  updateNodeIcon: (iconName: string) => void;
  updateNodeIconSize: (iconSize: NodeIconSizes) => void;
  iconSearch: {
    iconSearchResult: string | undefined;
    icons: string[];
    findIcon: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  handleNodeClick: (id: string) => void;
  handleNodeInteraction: (id: string) => void;
  handleNodeContentPaste: (e: any) => void;
  handleNodeBlur: () => void;
  handleNodeContentChange: (evt: any) => void;
} => {
  const sourceNode = useRef<{
    nodeId: string | null;
    handleId: string | null;
    handleType: HandleType | null;
  }>();
  const sourceNodePosition = useRef({ x: 0, y: 0 });
  const {
    note,
    noteDispatch,
    selectedNode,
    setEdges,
    setNodes,
    nodes,
    edges,
    setSelectedNode,
    interactiveNode,
  } = useContext(NoteContext);

  const {
    noteSettingsOptions,
    defaultNodeTheme,
    defaultNodeStyles,
    setDefaultNodeStyles,
    setDefaultNodeTheme,
  } = useNoteContext();

  const [iconSearchResult, setIconSearchResult] = useState<string>();
  const [icons, setIcons] = useState<string[]>(CommomCarbonIcons);
  const { setNodeMenu } = useContext(NodeContext);
  const { screenToFlowPosition, getIntersectingNodes } = useReactFlow();
  const [renderNode, setRenderNode] = useState<boolean>(false);

  const node = useMemo(() => {
    const node = nodes?.find((node) => node.id === selectedNode?.id);
    return node;
  }, [selectedNode, nodes]);

  useEffect(() => {
    console.log("Axon Nodes and Edges state update triggered");
    if (note) {
      noteDispatch({
        type: "UPDATE_NODES",
        payload: nodes,
      });
      // noteDispatch({
      //   type: "UPDATE_EDGES",
      //   payload: edges,
      // });
    }
  }, [nodes]);

  /**
   * Create new node
   * * creates a new node based on type and content type
   */
  const createNewNode = (
    node_type: NodeTypes,
    node_content_type: NodeContentTypes | null,
    position?: XYPosition,
    node_id?: string,
    isSubFlow?: boolean,
    parentNode?: string
  ): void => {
    let newNode: INode = {} as INode;
    let id = node_id ?? ulid();
    const lastNode = nodes.length > 0 ? nodes[nodes.length - 1] : null;
    const newX = lastNode
      ? lastNode.position.x + 100 + 280
      : window.innerWidth / 2.5;
    const newY = lastNode ? lastNode.position.y + 0 : window.outerHeight / 2.5;
    const type =
      node_type ?? noteSettingsOptions.default_node_settings.node_type;
    const { nodeWidth, nodeHeight } = getNodeDimensions(type);
    newNode = {
      id: id,
      type: type,
      data: {
        user_id: note?.user_id,
        folder_id: note?.folder_id,
        note_id: note?.note_id,
        node_id: id,
        title: "",
        description: "New Text",
        icon: {
          name: "OverflowMenuHorizontal",
          size: 16,
        } as INodeIcon,
        contentType: node_content_type,
        code: {
          code: "",
          language: "typescript",
        } as INodeCodeContent,
        block: BLOCK_EDITOR_INITIAL_STATE,
        json: {
          code: "",
        } as INodeJsonEditorContent,
        link: {
          url: "",
          isLoadable: false,
          title: "",
          description: "",
          image: "",
        } as INodeLinkContent,
        inlineImage: {
          url: "",
        } as INodeInlineImage,
        block_note: {} as JSONContent,
        markdown: {
          data: "",
        } as INodeMarkdownContent,
        node_theme: {
          style:
            node_type === "paragraph"
              ? "border-outline"
              : defaultNodeTheme.style,
          color:
            node_type === "paragraph"
              ? ThemeColors.white
              : defaultNodeTheme.color,
        } as NodeThemes,
        node_styles: {
          background_color: defaultNodeStyles.background_color,
          border_color: defaultNodeStyles.border_color,
          font_color:
            node_type === "paragraph"
              ? ThemeColors.white
              : defaultNodeStyles.font_color,
          font_weight: defaultNodeStyles.font_weight,
          font_alignment: defaultNodeStyles.font_alignment,
          font_size: defaultNodeStyles.font_size,
          border_style: defaultNodeStyles.border_style,
          border_radius: defaultNodeStyles.border_radius,
        } as NodeStyleProps,
        last_edited: new Date().toISOString(),
        position: {
          x: position?.x ?? newX,
          y: position?.y ?? newY,
        } as XYPosition,
        width: nodeWidth,
        height: nodeHeight,
      } as NodeDataProps,
      position: {
        x: position?.x ?? newX,
        y: position?.y ?? newY,
      },
      extent: isSubFlow ? "parent" : undefined,
      parentNode: isSubFlow && parentNode ? parentNode : undefined,
    };

    // Set flow tree node
    setNodes((nds: INode[]) => nds.concat(newNode));
    // noteDispatch({
    //   type: "ADD_NODE",
    //   payload: newNode,
    // });

    // Set the selected node to new node
    setSelectedNode(newNode);
  };

  const onNodeDragStart = (event: any, node: Node, nodes: Node[]) => {
    const intersectingNodes = getIntersectingNodes(node, false); // False ensures that the node is only classified as intersecting if all the node width is within the parent node, partial intersecting nodes will not set bounding box as parent
    // console.log("SUBNOTE Event", event);
    // const boundingNode = intersectingNodes.find(
    //   (node) => node.type === "bounding_box"
    // );
    // if (boundingNode) {
    //   console.log("Intersecting Bounding Node", boundingNode);
    //   setParentNode(boundingNode.id, node.id);
    // }
  };

  const onNodeDragStop = (event: any, node: Node, nodes: Node[]) => {
    const intersectingNodes = getIntersectingNodes(node, false); // False ensures that the node is only classified as intersecting if all the node width is within the parent node, partial intersecting nodes will not set bounding box as parent

    const boundingNode = intersectingNodes.find(
      (node) => node.type === "bounding_box"
    );

    if (boundingNode && node.parentNode === undefined) {
      console.log("Intersecting Bounding Node", boundingNode);
      setParentNode(boundingNode.id, node.id);
    }
    // console.log("Intersecting Current Node", nodes);
    // console.log("Node Drag End Intersecting Nodes", boundingNode);
  };

  const setParentNode = (parentNodeId: string, node_id: string) => {
    setNodes((nodes: INode[]) => {
      const currentNode = nodes.find((n) => n.id === node_id);
      if (currentNode) {
        currentNode.parentNode = parentNodeId;
        currentNode.position = {
          x: 0,
          y: 0,
        };
        currentNode.extent = "parent";
      }
      return [...nodes];
    });
    // setNodes((nds: INode[]) => {
    //   const updatedNodes = nds.map((node) => {
    //     if (node.id === node_id) {
    //       return {
    //         ...node,
    //         parentNode: parentNodeId,
    //       };
    //     }
    //     return node;
    //   });
    //   return updatedNodes;
    // });
  };

  const duplicateNode = (data: NodeDataProps, type: NodeTypes) => {
    let newNode: INode = {} as INode;
    let id = ulid();
    newNode = {
      id: id,
      type: type,
      data: {
        ...data,
        node_id: id,
        last_edited: new Date().toISOString(),
        position: {
          x: data.position.x + data.width + 100,
          y: data.position.y,
        } as XYPosition,
      } as NodeDataProps,
      position: {
        x: data.position.x + data.width + 100,
        y: data.position.y,
      },
    };

    // Add node to flow tree state
    setNodes((nds: INode[]) => nds.concat(newNode));
    // Set the selected node to new node
    setSelectedNode(newNode);
  };

  const deleteNode = (id: string) => {
    if (window.confirm(`Are you sure you want to delete this node?`)) {
      setNodes((nds: INode[]) => nds.filter((node) => node.id !== id));
      setEdges((eds: IEdge[]) => eds.filter((edge) => edge.source !== id));
      // noteDispatch({
      //   type: "DELETE_NODE",
      //   payload: id,
      // });
    }
  };

  const onResizeStart = (id: string, params: ResizeParams) => {
    console.log("Resize Params", params);
  };

  /*
  Resize a node
  */
  const onResizeEnd = (id: string, params: ResizeParams) => {
    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              width: params.width,
              height: params.height,
            },
          };
        }
        return node;
      });

      return updatedNodes;
    });
    setRenderNode(() => true);
  };

  /*
  Create a new edge 
  */
  const createNewEdge = (
    edgeType: EdgeTypes,
    source: string,
    sourceHandle: string,
    target: string,
    targetHandle: string,
    animated: boolean
  ) => {
    const newEdgeId = ulid();
    const newEdge: IEdge = {
      id: newEdgeId,
      data: {
        user_id: note?.user_id,
        folder_id: note?.folder_id,
        note_id: note?.note_id,
        edge_id: newEdgeId,
        type: edgeType,
      },
      source: source,
      target: target,
      animated: animated,
      type: edgeType,
      sourceHandle: sourceHandle,
      targetHandle: targetHandle,
      label: "",
    };
    setEdges((eds: IEdge[]) => eds.concat(newEdge));
    // noteDispatch({
    //   type: "UPDATE_EDGES",
    //   payload: newEdge,
    // });
  };

  const onConnect = useCallback((connection: Connection) => {
    const { source, sourceHandle, target, targetHandle } = connection;
    // Check if the edge already exists
    const isEdgeAlreadyExists = edges.some(
      (edge) => edge.source === source && edge.target === target
    );

    if (!isEdgeAlreadyExists) {
      createNewEdge(
        "curveEdge",
        source!!,
        sourceHandle!!,
        target!!,
        targetHandle!!,
        true
      );
    }
  }, []);

  const onConnectStart = useCallback(
    (event: any, params: OnConnectStartParams) => {
      sourceNode.current = params;
      sourceNodePosition.current.x = event.clientX;
      sourceNodePosition.current.y = event.clientY;
    },
    []
  );

  const onConnectEnd = useCallback(
    (event: any) => {
      // Use alt key to create new node on edge drop
      if (event.metaKey) {
        const targetIsPane =
          event.target.classList.contains("react-flow__pane");
        console.log("SUBNOTE", targetIsPane);

        if (targetIsPane) {
          const position: XYPosition = screenToFlowPosition({
            x: event.clientX - 280 / 2,
            y: event.clientY - 38.4 / 2,
          });

          if (interactiveNode.current) {
            const newNodeId = ulid();
            const placement = getSourceAndTargetPlacement(
              interactiveNode.current?.data.node_id!!,
              newNodeId,
              sourceNode.current?.handleId!!
            );

            if (placement !== null) {
              createNewNode(
                interactiveNode.current?.type!!,
                interactiveNode.current.data.contentType,
                position,
                newNodeId
              );

              createNewEdge(
                "curveEdge",
                placement.sourceNodeId,
                placement.sourceHandlePosition,
                placement.targetNodeId,
                placement.targetHandlePosition,
                true
              );
            }
          }
        } else {
          console.log("SUBNOTE for SUbflow");
          const newNodeId = ulid();
          const placement = getSourceAndTargetPlacement(
            interactiveNode.current?.data.node_id!!,
            newNodeId,
            sourceNode.current?.handleId!!
          );
          if (placement !== null) {
            createNewNode(
              interactiveNode.current?.type!!,
              interactiveNode.current.data.contentType,
              { x: 10, y: 10 },
              newNodeId,
              true,
              interactiveNode.current.parentNode
            );
            createNewEdge(
              "curveEdge",
              placement.sourceNodeId,
              placement.sourceHandlePosition,
              placement.targetNodeId,
              placement.targetHandlePosition,
              true
            );
          }
        }
      }
    },
    [screenToFlowPosition]
  );

  const updateNodeTheme = (theme: Partial<NodeThemes>): void => {
    let newNodeStyles: Partial<NodeStyleProps> = {};
    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNode?.id) {
          if (theme.style === "background-fill") {
            newNodeStyles = {
              background_color: node.data.node_theme.color,
              border_color: "",
              font_color: ThemeColors.textBlack,
            };
          }
          if (theme.style === "border-outline") {
            newNodeStyles = {
              background_color: "",
              border_color: node.data.node_theme.color,
              font_color: node.data.node_theme.color,
            };
          }
          if (theme.style === "none") {
            newNodeStyles = {
              background_color: "",
              border_color: "",
              font_color: node.data.node_theme.color,
            };
          }
          return {
            ...node,
            data: {
              ...node.data,
              node_theme: {
                ...node.data.node_theme,
                ...theme,
              },
              node_styles: {
                ...node.data.node_styles,
                ...newNodeStyles,
              },
            },
          };
        }
        return node;
      });

      return updatedNodes;
    });
  };

  const updateNodeColor = (color: string): void => {
    let newNodeStyles: Partial<NodeStyleProps> = {};
    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNode?.id) {
          if (node.data.node_theme.style === "background-fill") {
            newNodeStyles = {
              background_color: color,
              border_color: "",
              font_color:
                node.type === "paragraph"
                  ? ThemeColors.white
                  : ThemeColors.textBlack,
            };
          }
          if (node.data.node_theme.style === "border-outline") {
            newNodeStyles = {
              background_color: "",
              border_color: color,
              font_color: color,
            };
          }
          if (node.data.node_theme.style === "none") {
            newNodeStyles = {
              background_color: "",
              border_color: "",
              font_color: color,
            };
          }
          return {
            ...node,
            data: {
              ...node.data,
              node_theme: {
                ...node.data.node_theme,
                color: color,
              },
              node_styles: {
                ...node.data.node_styles,
                ...newNodeStyles,
              },
            },
          };
        }
        return node;
      });

      return updatedNodes;
    });
  };

  const updateNodeFontWeight = (fontWeight: FontWeights): void => {
    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              ...node.data,
              node_styles: {
                ...node.data.node_styles,
                font_weight: fontWeight,
              },
            },
          };
        }
        return node;
      });
      return updatedNodes;
    });
  };

  const updateNodeFontSize = (fontSize: number): void => {
    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              ...node.data,
              node_styles: {
                ...node.data.node_styles,
                font_size: fontSize,
              },
            },
          };
        }
        return node;
      });
      return updatedNodes;
    });
  };

  const updateNodeBorderRadius = (raduis: number): void => {
    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              ...node.data,
              node_styles: {
                ...node.data.node_styles,
                border_radius: raduis,
              },
            },
          };
        }
        return node;
      });
      return updatedNodes;
    });
  };

  const updateNodeBorderStyle = (style: BorderStyles): void => {
    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              ...node.data,
              node_styles: {
                ...node.data.node_styles,
                border_style: style,
              },
            },
          };
        }
        return node;
      });
      return updatedNodes;
    });
  };

  const updateNodeFontAlignment = (alignment: FontAlignments): void => {
    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              ...node.data,
              node_styles: {
                ...node.data.node_styles,
                font_alignment: alignment,
              },
            },
          };
        }
        return node;
      });
      return updatedNodes;
    });
  };

  const setDefaultStyles = () => {
    nodes.map((node) => {
      if (node.id === selectedNode?.id) {
        setDefaultNodeStyles(node.data.node_styles);
        setDefaultNodeTheme(node.data.node_theme);
      }
    });
  };

  const updateNodeIcon = (iconName: string) => {
    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              ...node.data,
              icon: {
                ...node.data.icon,
                name: iconName,
              },
            },
          };
        }
        return node;
      });
      return updatedNodes;
    });
  };

  const updateNodeIconSize = (iconSize: NodeIconSizes) => {
    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              ...node.data,
              icon: {
                ...node.data.icon,
                size: iconSize,
              },
            },
          };
        }
        return node;
      });
      return updatedNodes;
    });
  };

  const findIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setIconSearchResult(searchTerm);

    const formattedSearchTerm =
      searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();

    const filteredIcons = CarbonIcons.filter((icon) =>
      icon.toLowerCase().includes(formattedSearchTerm.toLowerCase())
    );

    setIcons(
      searchTerm.length > 0 ? filteredIcons.slice(0, 50) : CommomCarbonIcons
    );
  };

  const handleNodeClick = (id: string) => {
    setNodeMenu(null);
    setSelectedNode(
      note.nodes?.find((node) => {
        if (node.id === id) {
          return node;
        }
      }) as INode
    );
  };

  const handleNodeInteraction = (id: string) => {
    note.nodes?.find((node) => {
      if (node.id === id) {
        interactiveNode.current = node;
      }
    });
  };

  const handleNodeContentPaste = (e: any) => {
    e.preventDefault(); // Prevent the default paste behavior

    // Get the pasted text as plain text
    const pastedText = (e.clipboardData || window.Clipboard).getData(
      "text/plain"
    );

    // Get the current text box color
    const currentColor = window.getComputedStyle(e.target).color;

    // Create a new HTML element to hold the pasted text with the desired style
    const styledPastedText = `<span style="color: ${currentColor}">${pastedText}</span>`;

    // Insert the styled pasted text into the text box
    document.execCommand("insertHTML", false, styledPastedText);
  };

  const handleNodeBlur = () => {
    setNodeMenu(() => null);
    // setSelectedNode(null);
  };

  const handleNodeContentChange = (evt: any) => {
    const newNodeDescription = evt.target.value;

    setNodes((nds: INode[]) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              ...node.data,
              description: newNodeDescription,
            },
          };
        }
        return node;
      });

      return updatedNodes;
    });
  };

  const getSourceAndTargetPlacement = (
    interactiveNodeId: string,
    newNodeId: string,
    currentNodeHandlePosition: string
  ): {
    sourceNodeId: string;
    targetNodeId: string;
    sourceHandlePosition: NodeHandlePositions;
    targetHandlePosition: NodeHandlePositions;
  } | null => {
    switch (currentNodeHandlePosition) {
      case "right_handle":
        return {
          sourceNodeId: interactiveNodeId,
          targetNodeId: newNodeId,
          sourceHandlePosition: "right_handle",
          targetHandlePosition: "left_handle",
        };

      case "bottom_handle":
        return {
          sourceNodeId: interactiveNodeId,
          targetNodeId: newNodeId,
          sourceHandlePosition: "bottom_handle",
          targetHandlePosition: "top_handle",
        };

      default:
        return null; // New edge cannot be created from left or top handle
    }
  };

  const getNodeDimensions = (
    type: NodeTypes
  ): { nodeWidth: number; nodeHeight: number } => {
    switch (type) {
      case "icon":
        return { nodeWidth: 45, nodeHeight: 45 };
      case "link":
        return { nodeWidth: 280, nodeHeight: 200 };
      case "image":
        return { nodeWidth: 280, nodeHeight: 200 };
      case "bounding_box":
        return { nodeWidth: 350, nodeHeight: 350 };
      default:
        return { nodeWidth: 280, nodeHeight: 42 };
    }
  };

  return {
    node,
    onConnect,
    onConnectStart,
    onConnectEnd,
    onNodeDragStart,
    onNodeDragStop,
    createNewNode,
    duplicateNode,
    deleteNode,
    onResizeStart,
    onResizeEnd,
    updateNodeTheme,
    updateNodeColor,
    updateNodeFontWeight,
    updateNodeBorderRadius,
    updateNodeBorderStyle,
    updateNodeFontSize,
    updateNodeFontAlignment,
    setDefaultStyles,
    updateNodeIcon,
    updateNodeIconSize,
    iconSearch: {
      iconSearchResult,
      icons,
      findIcon,
    },
    handleNodeClick,
    handleNodeInteraction,
    handleNodeContentPaste,
    handleNodeBlur,
    handleNodeContentChange,
  };
};
