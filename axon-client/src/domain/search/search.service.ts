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
    const projects = await projectService.getProjects();
    console.log("Initializing Search Records:", folders, files);
    const folderIndexRecords = map(
      folders,
      (folder) =>
        ({
          identifier: folder.id,
          type: SearchIndexTypes.DOCUMENT_FOLDER,
          name: folder.name,
          description: folder.description,
          content: "",
          path: ["documents", `${folder.name}`],
        }) satisfies BaseSearchSchema
    );

    const fileIndexRecords = map(
      files,
      (file) =>
        ({
          identifier: file.id,
          type: SearchIndexTypes.DOCUMENT_FILE,
          name: file.name,
          description: `File Type: ${getContentType(file.content_type)!!}, File Size: ${convertFileSize({ size: file.file_size })!!}`,
          content: "",
          path: ["documents", `${file.parentName!!}`],
        }) satisfies BaseSearchSchema
    );

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

    const allIndexRecords = concat(
      folderIndexRecords,
      fileIndexRecords,
      projectRecords
    );
    search.insertMultipleIndexes(allIndexRecords);
  }

  public addDocumentFolderToIndex(dto: DocumentFolderEntity) {
    console.log("Document Folder Index Insert:", dto);
    search.insertIndex({
      identifier: dto.id,
      type: SearchIndexTypes.DOCUMENT_FOLDER,
      name: dto.name,
      description: dto.description,
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

  public async search(query: string): Promise<SearchResults> {
    console.log("Searching for:", query);
    const res = await search.searchIndex<BaseSearchSchema>({
      term: query,
      limit: 20,
      distinctOn: "identifier",
    });
    return res;
  }
}

const searchService = new SearchService();
export default searchService;
