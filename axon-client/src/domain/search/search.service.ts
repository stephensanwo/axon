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

export class SearchService {
  constructor() {
    search.initializeDBSchema({
      identifier: "string",
      type: "string",
      name: "string",
      description: "string",
      content: "string",
      path: "string",
    } satisfies BaseSearchSchema);
  }

  public async initializeSearchRecords() {
    const { folders, files } = await documentService.getAllDocumentRecords();
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
          path: `documents/${folder.name}`,
        }) satisfies BaseSearchSchema
    );

    const fileIndexRecords = map(
      files,
      (file) =>
        ({
          identifier: file.id,
          type: SearchIndexTypes.DOCUMENT_FILE,
          name: file.name,
          description: `${file.name} File Type: ${getContentType(file.content_type)!!} File Size: ${convertFileSize({ size: file.file_size })!!}`,
          content: "",
          path: `documents/${file.name}`,
        }) satisfies BaseSearchSchema
    );

    const allIndexRecords = concat(folderIndexRecords, fileIndexRecords);
    search.insertMultipleIndexes(allIndexRecords);
    // console.log("Initializing Search Records:", allIndexRecords);
    // const res = await search.searchIndex({
    //   term: "Test",
    // });
    // console.log("Search Results:", res);
  }

  public addDocumentFolderToIndex(dto: DocumentFolderEntity) {
    console.log("Document Folder Index Insert:", dto);
    search.insertIndex({
      identifier: dto.id,
      type: SearchIndexTypes.DOCUMENT_FOLDER,
      name: dto.name,
      description: dto.description,
      content: "",
      path: `document/${dto.name}`,
    } satisfies BaseSearchSchema);
  }

  public async addDocumentFileToIndex(dto: DocumentFileEntity) {
    await search.insertIndex({
      identifier: dto.id,
      type: SearchIndexTypes.DOCUMENT_FILE,
      name: dto.name,
      description: `${dto.name} ${dto.content_type} ${dto.file_size} bytes`,
      content: "",
      path: `document/${dto.name}`,
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
