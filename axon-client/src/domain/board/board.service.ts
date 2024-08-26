import projectService from "../project/project.service";
import { boardsDb } from "./board.db";
import {
  CreateBoardDto,
  GetBoardResponseDto,
  UpdateBoardDto,
} from "./board.dto";
import { BoardEntity } from "./board.entity";
import { boardRepository } from "./board.repository";

export class BoardService {
  boardsDb = boardsDb;

  constructor() {}

  public async createBoard(entity: CreateBoardDto): Promise<BoardEntity> {
    try {
      const existingRecords = await boardRepository.findBoardMatchByName(
        entity.name
      );
      if (existingRecords.docs.length > 0) {
        const num = existingRecords.docs.length;
        entity.name = `${entity.name} ${num}`;
      }
      const res = await this.boardsDb.createRecord<CreateBoardDto>(entity);
      return res;
    } catch (error) {
      throw new Error(`Error creating board - ${error}`);
    }
  }

  public async updateBoard(entity: UpdateBoardDto): Promise<boolean> {
    try {
      await this.boardsDb.updateRecord<UpdateBoardDto>(entity);
      return true;
    } catch (error) {
      throw new Error(`Error updating board - ${error}`);
    }
  }

  public async deleteBoard(ids: string[]): Promise<boolean> {
    try {
      const ok = await this.boardsDb.deleteRecords(ids);
      return ok;
    } catch (error) {
      throw new Error(`Error deleting board - ${error}`);
    }
  }

  public async getBoard(boardName: string): Promise<GetBoardResponseDto> {
    try {
      const boardId = await boardRepository.findBoardIdByName(boardName);

      if (!boardId) {
        return {
          board: null,
          project: null,
        };
      }
      const board = await this.boardsDb.getRecord<BoardEntity>(boardId);
      const project = await projectService.getProject(board.projectId);

      return {
        board,
        project,
      };
    } catch (error) {
      throw new Error(`Board not found - ${error}`);
    }
  }
}

const boardService = new BoardService();
export default boardService;
