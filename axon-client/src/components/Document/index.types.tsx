import { UseQueryResult } from "@tanstack/react-query";
import {
  GetDocumentFilesResponseDto,
  GetDocumentFoldersResponseDto,
} from "src/domain/document/document.dto";

export type BaseDocumentProps = {
  documentFolders: UseQueryResult<
    GetDocumentFoldersResponseDto | null,
    unknown
  >;
  documentFiles: UseQueryResult<GetDocumentFilesResponseDto | null, unknown>;
};
