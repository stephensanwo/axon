import { BoardSettingsEntity } from "../board/board.entity";
import boardService from "../board/board.service";
import contentService from "../content/content.service";
import { EdgeStyleEntity } from "../edge/edge.entity";
import edgeService from "../edge/edge.service";
import { NodeStyleEntity } from "../node/node.entity";
import nodeService from "../node/node.service";
import { colorsDb } from "./settings.db";
import { CreateColorDto } from "./settings.dto";
import { ColorEntity, SettingsEntity } from "./settings.entity";

export class SettingsService {
  colorsDb = colorsDb;

  constructor() {}

  public async getColors(): Promise<ColorEntity[]> {
    try {
      const colors = await this.colorsDb.getAllRecords<ColorEntity>({
        descending: true,
        startkey: "colors_\uffff",
        endkey: "colors_",
      });
      return colors;
    } catch (err) {
      console.error(err);
      throw new Error("Error fetching colors");
    }
  }

  public async getSettings(): Promise<SettingsEntity> {
    let settings: SettingsEntity = {
      colors: [],
      nodeStyles: {} as NodeStyleEntity,
      edgeStyles: {} as EdgeStyleEntity,
      boardSettings: {} as BoardSettingsEntity,
      contentTypes: {} as any,
    };

    try {
      // Get Colors
      const colors = await this.getColors();
      // Get Node Styles
      await nodeService.createDefaultNodeStyles();
      const nodeStyles = await nodeService.getNodeStyles();
      // Get Edge Styles
      await edgeService.createDefaultEdgeStyles();
      const edgeStyles = await edgeService.getEdgeStyles();
      // Get Board Default Settings
      await boardService.createDefaultBoardSettings();
      const boardSettings = await boardService.getDefaultBoardSettings();
      // Get Content Types Defaults
      await contentService.createDefaultContentTypes();
      const contentTypes = await contentService.getContentTypes();

      settings = {
        colors: colors,
        nodeStyles: nodeStyles,
        edgeStyles: edgeStyles,
        boardSettings: boardSettings,
        contentTypes: contentTypes,
      };

      return settings;
    } catch (err) {
      console.error(err);
      throw new Error("Error fetching settings");
    }
  }

  public async createColor(entity: CreateColorDto): Promise<ColorEntity> {
    try {
      const color = await this.colorsDb.createRecord<CreateColorDto>(entity);
      return color;
    } catch (error) {
      throw new Error(`Error creating color - ${error}`);
    }
  }

  public async deleteColor(id: string[]): Promise<boolean> {
    try {
      const ok = await this.colorsDb.deleteRecords(id);
      return ok;
    } catch (error) {
      throw new Error(`Error deleting color - ${error}`);
    }
  }
}

const settingsService = new SettingsService();
export default settingsService;
