import projectService from "../project/project.service";
import { boardDefaultsDb, boardsDb } from "./board.db";
import { defaultBoardSettings } from "./board.defaults";
import {
  CreateBoardDto,
  GetBoardResponseDto,
  UpdateBoardDto,
} from "./board.dto";
import {
  BoardEntity,
  BoardEntityKeys,
  BoardSettings,
  BoardSettingsEntity,
} from "./board.entity";
import { boardRepository } from "./board.repository";

export class BoardService {
  boardsDb = boardsDb;
  boardDefaultsDb = boardDefaultsDb;

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

  public async getBoard(
    boardName: string
  ): Promise<GetBoardResponseDto | null> {
    try {
      const boardId = await boardRepository.findBoardIdByName(boardName);

      if (!boardId) {
        return null;
      }

      const board = await this.boardsDb.getRecord<BoardEntity>(boardId);

      const project = await projectService.getProject(board.projectId);

      if (!project) {
        return null;
      }

      return {
        board,
        project,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getAllBoards(): Promise<BoardEntity[]> {
    try {
      const boards = await this.boardsDb.getAllRecords<BoardEntity>({
        descending: true,
        endkey: `${BoardEntityKeys.BOARD}_`,
        startkey: `${BoardEntityKeys.BOARD}_\ufff0`,
      });
      return boards;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  public async createDefaultBoardSettings() {
    const existingSettings =
      await this.boardDefaultsDb.getAllRecords<BoardSettingsEntity>({
        startkey: `${BoardEntityKeys.BOARD_DEFAULTS}_`,
        endkey: `${BoardEntityKeys.BOARD_DEFAULTS}_\uffff`,
      });

    if (existingSettings.length > 0) {
      return true;
    }

    try {
      await this.boardDefaultsDb.createRecord<BoardSettings>(
        defaultBoardSettings
      );
      return true;
    } catch (error) {
      throw new Error(`Error creating default board settings - ${error}`);
    }
  }

  public async getDefaultBoardSettings(): Promise<BoardSettingsEntity> {
    try {
      const boardSettings =
        await this.boardDefaultsDb.getAllRecords<BoardSettingsEntity>({
          startkey: `${BoardEntityKeys.BOARD_DEFAULTS}_`,
          endkey: `${BoardEntityKeys.BOARD_DEFAULTS}_\uffff`,
        });
      return boardSettings[0];
    } catch (err) {
      console.error(err);
      throw new Error("Error fetching board settings");
    }
  }
}

const boardService = new BoardService();
export default boardService;
