import { Result, Results } from "@orama/orama";
import search from ".";
import {
  DocumentFileEntity,
  DocumentFolderEntity,
} from "../document/document.entity";
import documentService from "../document/document.service";
import {
  BaseSearchSchema,
  SearchIndexTypes,
  SearchResults,
} from "./search.entity";
import concat from "lodash/concat";
import map from "lodash/map";
import { convertFileSize, getContentType } from "src/common/file";
import projectService from "../project/project.service";
import boardService from "../board/board.service";
import contentService from "../content/content.service";

export class SearchService {
  constructor() {
    search.initializeDBSchema({
      identifier: "string",
      type: "string",
      name: "string",
      description: "string",
      content: "string",
      path: "string[]",
    } satisfies BaseSearchSchema);
  }

  public async initializeSearchRecords() {
    const { folders, files } = await documentService.getAllDocumentRecords();
    const { projects } = await projectService.getProjects();
    const boards = await boardService.getAllBoards();
    const content = await contentService.getAllContent();
    const contentFolders = await contentService.getAllContentFolders();
    const folderIndexRecords = map(
      folders,
      (folder) =>
        ({
          identifier: folder.id,
          type: SearchIndexTypes.DOCUMENT_FOLDER,
          name: folder.name,
          description: "",
          content: "",
          path: ["documents", `${folder.name}`],
        }) satisfies BaseSearchSchema
    );

    const fileIndexRecords = map(files, (file) => {
      const documentFolderName = folders.find(
        (folder) => folder.id === file.parentId
      )?.name;
      return {
        identifier: file.id,
        type: SearchIndexTypes.DOCUMENT_FILE,
        name: file.name,
        description: `File Type: ${getContentType(file.content_type)!!}, File Size: ${convertFileSize({ size: file.file_size })!!}`,
        content: "",
        path: ["documents", `${documentFolderName}`, `${file.parentName!!}`],
      } satisfies BaseSearchSchema;
    });

    const projectRecords = map(
      projects,
      (project) =>
        ({
          identifier: project.id,
          type: SearchIndexTypes.PROJECT,
          name: project.name,
          description: project.description,
          content: "",
          path: ["projects", `${project.name}`],
        }) satisfies BaseSearchSchema
    );

    const boardRecords = map(boards, (board) => {
      const boardProjectName = projects.find(
        (project) => project.id === board.projectId
      )?.name;
      return {
        identifier: board.id,
        type: SearchIndexTypes.BOARD,
        name: board.name,
        description: board.description,
        content: "",
        path: ["projects", `${boardProjectName}`, `${board.name}`],
      } satisfies BaseSearchSchema;
    });

    const contentRecords = map(content, (contentItem) => {
      return {
        identifier: contentItem.id,
        type: SearchIndexTypes.CONTENT,
        name: contentItem.name,
        description: "",
        content: contentItem.content_type,
        path: ["content", `${contentItem.name}`],
      } satisfies BaseSearchSchema;
    });

    const contentFolderRecords = map(contentFolders, (contentFolder) => {
      return {
        identifier: contentFolder.id,
        type: SearchIndexTypes.CONTENT,
        name: contentFolder.name,
        description: "",
        content: "",
        path: ["content", `${contentFolder.name}`],
      } satisfies BaseSearchSchema;
    });

    const allIndexRecords = concat(
      folderIndexRecords,
      fileIndexRecords,
      projectRecords,
      boardRecords,
      contentRecords,
      contentFolderRecords
    );
    search.insertMultipleIndexes(allIndexRecords);
  }

  public addDocumentFolderToIndex(dto: DocumentFolderEntity) {
    console.log("Document Folder Index Insert:", dto);
    search.insertIndex({
      identifier: dto.id,
      type: SearchIndexTypes.DOCUMENT_FOLDER,
      name: dto.name,
      description: "",
      content: "",
      path: ["documents", `${dto.name}`],
    } satisfies BaseSearchSchema);
  }

  public async addDocumentFileToIndex(dto: DocumentFileEntity) {
    await search.insertIndex({
      identifier: dto.id,
      type: SearchIndexTypes.DOCUMENT_FILE,
      name: dto.name,
      description: `File Type: ${getContentType(dto.content_type)!!}, File Size: ${convertFileSize({ size: dto.file_size })!!}`,
      content: "",
      path: ["documents", `${dto.parentName}`],
    } satisfies BaseSearchSchema);
  }

  public async search(
    query: string,
    type: SearchIndexTypes[] | null
  ): Promise<SearchResults> {
    console.log("Searching for:", query);
    const types = type ? type : Object.values(SearchIndexTypes);
    const res = await search.searchIndex<BaseSearchSchema>({
      term: query,
      limit: 20,
      distinctOn: "identifier",
      where: {
        type: types,
      },
    });
    return res;
  }
}

const searchService = new SearchService();
export default searchService;
