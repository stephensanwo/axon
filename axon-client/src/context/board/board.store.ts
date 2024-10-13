import { create } from "zustand";
import { CreateBoardDto } from "src/domain/board/board.dto";
import { BoardEntity } from "src/domain/board/board.entity";

export type BoardStore = {
  createBoardForm: CreateBoardDto | null;
  setCreateBoardForm: (createBoardForm: CreateBoardDto | null) => void;
  selectedBoards: BoardEntity[];
  setSelectedBoards: (selectedBoards: BoardEntity[]) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  createBoardForm: null,
  setCreateBoardForm: (createBoardForm: CreateBoardDto | null) =>
    set({ createBoardForm }),
  selectedBoards: [],
  setSelectedBoards: (selectedBoards: BoardEntity[]) => set({ selectedBoards }),
}));
