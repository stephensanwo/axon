import { EdgeTypes } from "src/types/edge";
import CurveEdge from "./CurveEdge";
import StepEdge from "./StepEdge";
import StraightEdge from "./StraightEdge";

export const edgeTypes: Record<EdgeTypes, any> = {
  curveEdge: CurveEdge,
  stepEdge: StepEdge,
  straightEdge: StraightEdge,
};
