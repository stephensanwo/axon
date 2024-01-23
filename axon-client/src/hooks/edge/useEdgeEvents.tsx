import { useTheme } from "@primer/react";
import { useContext, useEffect, useMemo } from "react";
import { EdgeMarker, EdgeProps } from "reactflow";
import NoteContext from "src/context/notes";
import { EdgeTypes, IEdge } from "src/types/edge";

export const useEdgeEvents = (
  props: EdgeProps
): {
  edge: IEdge | undefined;
  removeEdge: (edge_id: string) => void;
  updateEdgeAnimation: () => void;
  updateEdgeColor: (color: string) => void;
  handleEdgeLabelContentChange: (label: string) => void;
  updateConnectionLineType: (type: EdgeTypes) => void;
  updateEdgeMarkers: (markerDirection: "start" | "end") => void;
} => {
  const { id: selectedEdgeId } = props;
  const { edges, setEdges, noteDispatch } = useContext(NoteContext);
  const { theme } = useTheme();
  const edge = useMemo(() => {
    const edge = edges?.find((node) => node.id === selectedEdgeId);
    return edge;
  }, []);

  useEffect(() => {
    if (edge) {
      noteDispatch({
        type: "UPDATE_EDGES",
        payload: edges,
      });
    }
  }, [edges]);

  const removeEdge = (edge_id: string) => {
    setEdges((eds: IEdge[]) => {
      const updatedEdges = eds.filter((edge) => edge.id !== edge_id);
      return updatedEdges;
    });
  };

  const updateEdgeAnimation = () => {
    setEdges((eds: IEdge[]) => {
      const updatedEdges = eds.map((edge) => {
        if (edge.id === selectedEdgeId) {
          return { ...edge, animated: !edge.animated };
        }
        return edge;
      });
      return updatedEdges;
    });
  };

  const updateEdgeColor = (color: string) => {
    setEdges((eds: IEdge[]) => {
      const updatedEdges = eds.map((edge) => {
        if (edge.id === selectedEdgeId) {
          return {
            ...edge,
            style: { ...edge.style, stroke: color },
            labelStyle: { ...edge.labelStyle, color: color },
            markerEnd: {
              ...(edge.markerEnd as EdgeMarker),
              color: color,
            },
            markerStart: {
              ...(edge.markerEnd as EdgeMarker),
              color: color,
            },
          };
        }
        return edge;
      });
      return updatedEdges;
    });
  };

  const handleEdgeLabelContentChange = (label: string) => {
    setEdges((eds: IEdge[]) => {
      const updatedEdges = eds.map((edge) => {
        if (edge.id === selectedEdgeId) {
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

  const updateConnectionLineType = (type: EdgeTypes) => {
    setEdges((eds: IEdge[]) => {
      const updatedEdges = eds.map((edge) => {
        if (edge.id === selectedEdgeId) {
          return {
            ...edge,
            type: type,
            data: {
              ...edge.data,
              type: type,
            },
          };
        }
        return edge;
      });
      return updatedEdges;
    });
  };

  const updateEdgeMarkers = (markerDirection: "start" | "end") => {
    setEdges((eds: IEdge[]) => {
      const updatedEdges = eds.map((edge) => {
        if (edge.id === selectedEdgeId) {
          const edgeColor =
            edge?.style?.stroke || theme?.colors.border.variant2;
          switch (markerDirection) {
            case "start":
              if (edge.markerStart !== undefined) {
                return {
                  ...edge,
                  markerStart: undefined,
                };
              }
              return {
                ...edge,
                markerStart: {
                  type: "arrow",
                  width: 20,
                  height: 20,
                  color: edgeColor,
                },
              };
            case "end":
              if (edge.markerEnd !== undefined) {
                return {
                  ...edge,
                  markerEnd: undefined,
                };
              }
              return {
                ...edge,
                markerEnd: {
                  type: "arrow",
                  width: 20,
                  height: 20,
                  color: edgeColor,
                },
              };
          }
        }
        return edge;
      });

      return updatedEdges;
    });
  };

  return {
    edge,
    removeEdge,
    updateEdgeAnimation,
    updateEdgeColor,
    handleEdgeLabelContentChange,
    updateConnectionLineType,
    updateEdgeMarkers,
  };
};
