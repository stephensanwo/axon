import {
  PiFileCode,
  PiFileCsv,
  PiFileImage,
  PiFileJs,
  PiFilePdf,
  PiFileSvg,
  PiFileText,
  PiFileZip,
  PiMicrosoftExcelLogo,
  PiMicrosoftPowerpointLogo,
  PiMicrosoftWordLogo,
} from "react-icons/pi";
import { BaseEntity, AttachmentRecord } from "src/db/db.types";

export type DocumentFolderData = { name: string };
export type DocumentFolderEntity = BaseEntity & DocumentFolderData;
export type DocumentFileEntity = BaseEntity & AttachmentRecord;

export type DocumentTreeData = { id: string; name: string };

export type DocumentTreeEntity = Record<
  string,
  DocumentTreeData & {
    files: Record<string, DocumentTreeData>;
  }
>;

export const DocumentTypes: Record<
  string,
  {
    name: string;
    icon: React.ElementType;
  }
> = {
  Pdf: {
    name: "PDF",
    icon: PiFilePdf,
  },
  Doc: {
    name: "Word",
    icon: PiMicrosoftWordLogo,
  },
  Docx: {
    name: "Word",
    icon: PiMicrosoftWordLogo,
  },
  Xls: {
    name: "Excel",
    icon: PiMicrosoftExcelLogo,
  },
  Xlsx: {
    name: "Excel",
    icon: PiMicrosoftExcelLogo,
  },
  Ppt: {
    name: "Powerpoint",
    icon: PiMicrosoftPowerpointLogo,
  },
  Pptx: {
    name: "Powerpoint",
    icon: PiMicrosoftPowerpointLogo,
  },
  Csv: {
    name: "CSV",
    icon: PiFileCsv,
  },
  Txt: {
    name: "Text",
    icon: PiFileText,
  },
  Json: {
    name: "JSON",
    icon: PiFileJs,
  },
  Xml: {
    name: "XML",
    icon: PiFileCode,
  },
  Zip: {
    name: "ZIP",
    icon: PiFileZip,
  },
  Jpg: {
    name: "JPG",
    icon: PiFileImage,
  },
  Jpeg: {
    name: "JPEG",
    icon: PiFileImage,
  },
  Png: {
    name: "PNG",
    icon: PiFileImage,
  },
  Gif: {
    name: "GIF",
    icon: PiFileImage,
  },
  Svg: {
    name: "SVG",
    icon: PiFileSvg,
  },
  File: {
    name: "File",
    icon: PiFileCode,
  },
};

export const SupportedDocumentTypes = Object.keys(DocumentTypes)
  .map((key) => `.${key}`)
  .join(", ");

export type DocumentUploadEventPayload = {
  eventId: string;
  file: File;
  folderId: string;
  folderName: string;
};

export type DocumentEventTypes = "document:upload";
export type DocumentEventStatus = "success" | "error" | "pending";
export type DocumentDeleteEventPayload = string;

export type DocumentEventPayload = {
  "document:upload": DocumentUploadEventPayload;
};

export type DocumentEventResponse = {
  eventId: string;
  eventType: DocumentEventTypes;
  status: DocumentEventStatus;
};

export enum DocumentEntityKeys {
  DOCUMENT = "document",
  FOLDERS = "folders",
  FOLDER = "folder",
  FILES = "files",
  FILE = "file",
}
