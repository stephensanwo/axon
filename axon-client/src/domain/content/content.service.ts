import { contentDb, contentTypeDataDb, contentTypeDb } from "./content.db";
import { defaultContentTypes } from "./content.defaults";
import {
  CreateContentDto,
  CreateContentTypeDataDto,
  GetContentTypeDataResponseDto,
  UpdateContentDto,
  UpdateContentTypeDataDto,
} from "./content.dto";
import {
  ContentEntity,
  ContentEntityKeys,
  ContentType,
  ContentTypeDataEntity,
  ContentTypeEnums,
} from "./content.entity";
import { contentRepository } from "./content.repository";

export class ContentService {
  contentDb = contentDb;
  contentTypeDb = contentTypeDb;
  contentTypeDataDb = contentTypeDataDb;

  constructor() {}

  public async createContent(entity: CreateContentDto): Promise<ContentEntity> {
    try {
      const existingRecords = await contentRepository.findContentMatchByName(
        entity.name
      );
      if (existingRecords.docs.length > 0) {
        const num = existingRecords.docs.length;
        entity.name = `${entity.name} ${num}`;
      }
      const res = await this.contentDb.createRecord<CreateContentDto>(entity);

      const defaultDbContentTypes = await this.getContentTypes();

      const contentTypeDataDto = {
        content_id: res.id,
        content: defaultDbContentTypes[res.content_type],
      };

      await this.createContentTypeData(contentTypeDataDto);
      return res;
    } catch (error) {
      console.error(`Error creating content - ${error}`);
      throw new Error(`Error creating content - ${error}`);
    }
  }

  private async createContentTypeData(
    entity: CreateContentTypeDataDto
  ): Promise<ContentTypeDataEntity> {
    try {
      const res =
        await this.contentTypeDataDb.createRecord<CreateContentTypeDataDto>(
          entity
        );
      return res;
    } catch (error) {
      throw new Error(`Error creating content type data - ${error}`);
    }
  }

  public async updateContent(entity: UpdateContentDto): Promise<boolean> {
    try {
      await this.contentDb.updateRecord<UpdateContentDto>(entity);
      return true;
    } catch (error) {
      throw new Error(`Error updating content - ${error}`);
    }
  }

  public async updateContentTypeData(
    entity: UpdateContentTypeDataDto
  ): Promise<boolean> {
    try {
      await this.contentTypeDataDb.updateRecord<UpdateContentTypeDataDto>(
        entity
      );
      return true;
    } catch (error) {
      throw new Error(`Error updating content type - ${error}`);
    }
  }

  public async deleteContent(ids: string[]): Promise<boolean> {
    try {
      const ok = await this.contentDb.deleteRecords(ids);
      await this.deleteContentTypeData(ids);
      return ok;
    } catch (error) {
      throw new Error(`Error deleting content - ${error}`);
    }
  }

  private async deleteContentTypeData(ids: string[]): Promise<boolean> {
    try {
      const ok = await this.contentTypeDb.deleteRecords(ids);
      return ok;
    } catch (error) {
      throw new Error(`Error deleting content type - ${error}`);
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

  public async getContentTypeData(
    contentId: string
  ): Promise<GetContentTypeDataResponseDto | null> {
    try {
      const contentTypeDataId =
        await contentRepository.findContentTypeDataIdByContentId(contentId);

      if (!contentTypeDataId) {
        return null;
      }
      const content = await this.contentDb.getRecord<ContentEntity>(contentId);

      const contentTypeData =
        await this.contentTypeDataDb.getRecord<ContentTypeDataEntity>(
          contentTypeDataId
        );

      return {
        parent_content: content,
        ...contentTypeData,
      };
    } catch (error) {
      console.error(`Error getting content type data - ${error}`);
      return null;
    }
  }

  public async getContentById(
    contentId: string
  ): Promise<ContentEntity | null> {
    try {
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
        endkey: `${ContentEntityKeys.CONTENT}_`,
        startkey: `${ContentEntityKeys.CONTENT}_\ufff0`,
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
        endkey: `${ContentEntityKeys.CONTENT}_${boardId}_\ufff0`,
        startkey: `${ContentEntityKeys.CONTENT}_${boardId}_`,
      });
      return content;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  public async createDefaultContentTypes(): Promise<boolean> {
    const existingContentTypes =
      await this.contentTypeDb.getAllRecords<ContentType>({
        startkey: `${ContentEntityKeys.CONTENT_TYPE_DEFAULTs}_`,
        endkey: `${ContentEntityKeys.CONTENT_TYPE_DEFAULTs}_\uffff`,
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
        startkey: `${ContentEntityKeys.CONTENT_TYPE_DEFAULTs}_`,
        endkey: `${ContentEntityKeys.CONTENT_TYPE_DEFAULTs}_\uffff`,
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
