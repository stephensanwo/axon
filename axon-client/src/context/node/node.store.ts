import { NodeEntity } from "src/domain/node/node.entity";
import { create } from "zustand";

export type NodeStore = {
  selectedNode: NodeEntity | null;
  setSelectedNode: (node: NodeEntity | null) => void;
};

export const useNodeStore = create<NodeStore>((set) => ({
  selectedNode: null,
  setSelectedNode: (node) => set({ selectedNode: node }),
}));
