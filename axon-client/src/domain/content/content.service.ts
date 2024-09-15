import { pick } from "lodash";
import { contentDb, contentTypeDb } from "./content.db";
import { defaultContentTypes } from "./content.defaults";
import { CreateContentDto, UpdateContentDto } from "./content.dto";
import {
  ContentEntity,
  ContentType,
  ContentTypeEntity,
  ContentTypeEnums,
} from "./content.entity";
import { contentRepository } from "./content.repository";

export class ContentService {
  contentDb = contentDb;
  contentTypeDb = contentTypeDb;

  constructor() {}

  public async createContent(entity: CreateContentDto): Promise<ContentEntity> {
    // try {
    console.log("entity", entity);
    const existingRecords = await contentRepository.findContentMatchByName(
      entity.name
    );
    console.log("existingRecords", existingRecords);
    if (existingRecords.docs.length > 0) {
      const num = existingRecords.docs.length;
      entity.name = `${entity.name} ${num}`;
    }
    const res = await this.contentDb.createRecord<CreateContentDto>(entity);
    return res;
    // } catch (error) {
    //   throw new Error(`Error creating content - ${error}`);
    // }
  }

  public async updateContent(entity: UpdateContentDto): Promise<boolean> {
    try {
      await this.contentDb.updateRecord<UpdateContentDto>(entity);
      return true;
    } catch (error) {
      throw new Error(`Error updating content - ${error}`);
    }
  }

  public async deleteContent(ids: string[]): Promise<boolean> {
    try {
      const ok = await this.contentDb.deleteRecords(ids);
      return ok;
    } catch (error) {
      throw new Error(`Error deleting content - ${error}`);
    }
  }

  public async getContent(contentName: string): Promise<ContentEntity | null> {
    try {
      const contentId =
        await contentRepository.findContentIdByName(contentName);

      if (!contentId) {
        return null;
      }
      const content = await this.contentDb.getRecord<ContentEntity>(contentId);
      return content;
    } catch (error) {
      throw new Error(`Content not found - ${error}`);
    }
  }

  public async getAllContent(): Promise<ContentEntity[]> {
    try {
      const content = await this.contentDb.getAllRecords<ContentEntity>({
        descending: true,
        endkey: "content_",
        startkey: "content_\ufff0",
      });
      return content;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  public async getContentByBoardId(boardId: string): Promise<ContentEntity[]> {
    try {
      const content = await this.contentDb.getAllRecords<ContentEntity>({
        descending: true,
        endkey: `content_${boardId}_\ufff0`,
        startkey: `content_${boardId}_`,
      });
      return content;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  public async createDefaultContentTypes(): Promise<boolean> {
    const existingContentTypes =
      await this.contentTypeDb.getAllRecords<ContentTypeEntity>({
        startkey: "content-types_",
        endkey: "content-types_\uffff",
      });
    if (existingContentTypes.length > 0) {
      return true;
    }
    try {
      await this.contentTypeDb.createRecord<ContentType>(defaultContentTypes);
      return true;
    } catch (error) {
      throw new Error(`Error creating default content types - ${error}`);
    }
  }

  public async getContentTypes(): Promise<ContentType> {
    try {
      const contentTypes = await this.contentTypeDb.getAllRecords<ContentType>({
        startkey: "content-types_",
        endkey: "content-types_\uffff",
      });

      const contentTypeKeys = Object.values(ContentTypeEnums);

      const response = contentTypeKeys.reduce((acc, key) => {
        acc[key] = contentTypes[0][key];
        return acc;
      }, {} as ContentType);

      return response;
    } catch (err) {
      console.error(err);
      throw new Error("Error fetching content types");
    }
  }
}

const contentService = new ContentService();
export default contentService;
