import { useContext, useMemo } from "react";
import EdgeContext from "src/context/edge";
import NoteContext from "src/context/notes";
import { IEdge } from "src/types/edge";

export const useEdgeEvents = (): {
  edge: IEdge | undefined;
  removeEdgeOnClick: (semantic_number: number, edge_id: string) => void;
  handleEdgeClick: (id: string) => void;
  updateEdgeAnimation: () => void;
  updateEdgeColor: (color: string) => void;
  handleEdgeLabelContentChange: (label: string) => void;
} => {
  const { edges, setEdges } = useContext(NoteContext);
  const { selectedEdge, setSelectedEdge, setEdgeMenu } =
    useContext(EdgeContext);

  const edge = useMemo(() => {
    const edge = edges?.find((node) => node.id === selectedEdge?.id);
    return edge;
  }, [edges]);

  const removeEdgeOnClick = (semantic_number: number, edge_id: string) => {
    if (
      window.confirm(`Are you sure you want to delete edge ${semantic_number}?`)
    ) {
      setEdges((eds: IEdge[]) => {
        const updatedEdges = eds.filter((edge) => edge.id !== edge_id);
        return updatedEdges;
      });
      setSelectedEdge(null);
      setEdgeMenu(null);
    }
  };

  const handleEdgeClick = (id: string) => {
    const edge = edges.find((edge) => edge.id === id);
    if (edge) {
      edge.data!!.semantic_number = edges.indexOf(edge) + 1;
      setSelectedEdge(edge);
    } else {
      setSelectedEdge(null);
    }
  };

  const updateEdgeAnimation = () => {
    setEdges((eds: IEdge[]) => {
      const updatedEdges = eds.map((edge: IEdge) => {
        if (edge.id === selectedEdge?.id) {
          return { ...edge, animated: !edge.animated };
        }
        return edge;
      });
      return updatedEdges;
    });
  };

  const updateEdgeColor = (color: string) => {
    setEdges((eds: IEdge[]) => {
      const updatedEdges = eds.map((edge: IEdge) => {
        if (edge.id === selectedEdge?.id) {
          return { ...edge, style: { ...edge.style, stroke: color } };
        }
        return edge;
      });
      return updatedEdges;
    });
  };

  const handleEdgeLabelContentChange = (label: string) => {
    setEdges((eds: IEdge[]) => {
      const updatedEdges = eds.map((edge) => {
        if (edge.id === selectedEdge?.id) {
          return {
            ...edge,
            label,
          };
        }
        return edge;
      });

      return updatedEdges;
    });
  };

  return {
    edge,
    removeEdgeOnClick,
    handleEdgeClick,
    updateEdgeAnimation,
    updateEdgeColor,
    handleEdgeLabelContentChange,
  };
};
