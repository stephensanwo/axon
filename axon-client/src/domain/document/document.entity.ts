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

export type DocumentFolderData = { name: string; description: string };
export type DocumentFolderEntity = BaseEntity & DocumentFolderData;
export type DocumentFileEntity = BaseEntity & AttachmentRecord;

export const DocumentTypes: Record<
  string,
  {
    name: string;
    icon: React.ElementType;
  }
> = {
  PDF: {
    name: "PDF",
    icon: PiFilePdf,
  },
  DOC: {
    name: "Word",
    icon: PiMicrosoftWordLogo,
  },
  DOCX: {
    name: "Word",
    icon: PiMicrosoftWordLogo,
  },
  XLS: {
    name: "Excel",
    icon: PiMicrosoftExcelLogo,
  },
  XLSX: {
    name: "Excel",
    icon: PiMicrosoftExcelLogo,
  },
  PPT: {
    name: "Powerpoint",
    icon: PiMicrosoftPowerpointLogo,
  },
  PPTX: {
    name: "Powerpoint",
    icon: PiMicrosoftPowerpointLogo,
  },
  CSV: {
    name: "CSV",
    icon: PiFileCsv,
  },
  TXT: {
    name: "Text",
    icon: PiFileText,
  },
  JSON: {
    name: "JSON",
    icon: PiFileJs,
  },
  XML: {
    name: "XML",
    icon: PiFileCode,
  },
  ZIP: {
    name: "ZIP",
    icon: PiFileZip,
  },
  JPG: {
    name: "JPG",
    icon: PiFileImage,
  },
  JPEG: {
    name: "JPEG",
    icon: PiFileImage,
  },
  PNG: {
    name: "PNG",
    icon: PiFileImage,
  },
  GIF: {
    name: "GIF",
    icon: PiFileImage,
  },
  SVG: {
    name: "SVG",
    icon: PiFileSvg,
  },
  FILE: {
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

export const DocumentQueryKeys = {
  DOCUMENT_FOLDERS: ["document", "folders"],
  DOCUMENT_FOLDER_COUNT: ["document", "folders", "count"],
  DOCUMENT_FILE: ["document", "file"],
} satisfies Record<string, string[]>;
