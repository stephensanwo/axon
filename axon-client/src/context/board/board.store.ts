import { create } from "zustand";
import { CreateBoardDto } from "src/domain/board/board.dto";
import { BoardEntity } from "src/domain/board/board.entity";
import {
  NodeOptionsProps,
  NodeContentProps,
  NodeOptionsComponents,
} from "./board.types";

export type BoardStore = {
  createBoardForm: CreateBoardDto | null;
  setCreateBoardForm: (createBoardForm: CreateBoardDto | null) => void;
  selectedBoards: BoardEntity[];
  setSelectedBoards: (selectedBoards: BoardEntity[]) => void;
  nodeOptions: NodeOptionsProps;
  toggleNodeOptions: (
    action: "open" | "closed",
    component: NodeOptionsComponents
  ) => void;
  nodeContent: NodeContentProps;
  toggleNodeContent: (action: "open" | "closed") => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  createBoardForm: null,
  setCreateBoardForm: (createBoardForm: CreateBoardDto | null) =>
    set({ createBoardForm }),
  selectedBoards: [],
  setSelectedBoards: (selectedBoards: BoardEntity[]) => set({ selectedBoards }),
  nodeOptions: {
    state: "closed",
    component: "formatting",
  },
  toggleNodeOptions: (
    action: "open" | "closed",
    component: NodeOptionsComponents
  ) => set({ nodeOptions: { state: action, component } }),
  nodeContent: {
    state: "closed",
  },
  toggleNodeContent: (action: "open" | "closed") =>
    set({ nodeContent: { state: action } }),
}));
