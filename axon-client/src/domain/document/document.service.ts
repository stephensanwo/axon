import {
  DocumentEventPayload,
  DocumentEventResponse,
  DocumentFileEntity,
  DocumentFolderEntity,
  SupportedDocumentTypes,
} from "./document.entity";
import {
  CreateDocumentFolderDto,
  GetDocumentFilesResponseDto,
  UpdateDocumentFolderDto,
} from "./document.dto";
import { foldersDb, filesDb } from "./document.db";
import { documentRepository } from "./document.repository";

export class DocumentService {
  foldersDb = foldersDb;
  filesDb = filesDb;

  constructor() {}

  /**
   * Select a file from the user's device.
   * @param acceptedFileTypes - The accepted comma separated file types
   * @returns The selected file or null if no file was selected
   * @example
   */
  private async selectFile(acceptedFileTypes: string): Promise<File | null> {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = acceptedFileTypes;

      input.onchange = (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        resolve(file || null);
      };

      input.click();
    });
  }

  private async readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }

  private jsonToBase64(json: object): string {
    const jsonString = JSON.stringify(json);
    const base64Encoded = btoa(unescape(encodeURIComponent(jsonString)));
    return base64Encoded;
  }

  private base64ToJson(base64String: string): object {
    const jsonString = decodeURIComponent(escape(atob(base64String)));
    const jsonObject = JSON.parse(jsonString);
    return jsonObject;
  }

  public async buildDocumentUploadFile(): Promise<File | null> {
    try {
      const file = await this.selectFile(SupportedDocumentTypes);
      if (file) {
        return file as File;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  public async uploadFile({
    file,
    folderId,
    folderName,
    eventId,
  }: {
    file: File;
    folderId: string;
    folderName: string;
    eventId: string;
  }): Promise<DocumentEventResponse> {
    try {
      if (file && folderId) {
        const attachmentName = file.name;
        const content = await this.readFile(file);
        const attachment = new Blob([content], { type: file.type });
        await this.filesDb.createAttachmentRecord(
          {
            name: attachmentName,
            content_type: file.type,
            data: attachment,
          },
          folderId,
          folderName
        );
      }
      return {
        eventId: eventId,
        eventType: "document:upload",
        status: "success",
      };
    } catch (error) {
      console.error("Error uploading file", error);
      return {
        eventId: eventId,
        eventType: "document:upload",
        status: "error",
      };
    }
  }

  public async processDocumentEvent(
    event: DocumentEventPayload
  ): Promise<DocumentEventResponse | null> {
    const uploadEvent = event["document:upload"];
    if (uploadEvent) {
      const eventResponse = await this.uploadFile({
        file: uploadEvent.file,
        folderId: uploadEvent.folderId,
        eventId: uploadEvent.eventId,
        folderName: uploadEvent.folderName,
      });
      return eventResponse;
    }
    return null;
  }

  public async createDocumentFolder(
    entity: CreateDocumentFolderDto
  ): Promise<DocumentFolderEntity> {
    try {
      const existingRecords = await documentRepository.findDocumentMatchByName(
        entity.name
      );
      if (existingRecords.docs.length > 0) {
        const num = existingRecords.docs.length;
        entity.name = `${entity.name} ${num}`;
      }
      const res =
        await this.foldersDb.createRecord<CreateDocumentFolderDto>(entity);
      return res;
    } catch (error) {
      throw new Error(`Error creating document folder - ${error}`);
    }
  }

  public async updateDocumentFolder(
    entity: UpdateDocumentFolderDto
  ): Promise<boolean> {
    try {
      await this.foldersDb.updateRecord<UpdateDocumentFolderDto>(entity);
      return true;
    } catch (error) {
      throw new Error(`Error updating document folder - ${error}`);
    }
  }

  public async deleteDocumentFolders(ids: string[]): Promise<boolean> {
    try {
      const ok = await this.foldersDb.deleteRecords(ids);
      return ok;
    } catch (error) {
      throw new Error(`Error deleting document folder - ${error}`);
    }
  }

  public async getDocumentFolders(): Promise<DocumentFolderEntity[]> {
    try {
      const folders = await this.foldersDb.getAllRecords<DocumentFolderEntity>({
        descending: true,
      });
      if (folders) {
        return folders;
      } else {
        return [];
      }
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  public async getDocumentFiles(
    folderName: string
  ): Promise<null | GetDocumentFilesResponseDto> {
    try {
      const folderId =
        await documentRepository.findDocumentIdByName(folderName);

      if (!folderId) {
        return {
          folderId: null,
          files: [],
        } as GetDocumentFilesResponseDto;
      }

      const files =
        await documentRepository.findDocumentFilesByFolderId(folderId);

      return {
        folderId,
        files: files || [],
      } as GetDocumentFilesResponseDto;
    } catch (err) {
      console.error(err);
      throw new Error(`Error fetching document files`);
    }
  }

  public async deleteDocumentFile(ids: string[]): Promise<boolean> {
    try {
      const ok = await this.foldersDb.deleteRecords(ids);
      return ok;
    } catch (error) {
      throw new Error(`Error deleting document file - ${error}`);
    }
  }

  public async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  }

  public async downloadDocumentFile(
    file: DocumentFileEntity[]
  ): Promise<string | null> {
    try {
      const attachment = await this.filesDb.getAttachment<DocumentFileEntity>(
        file[0]
      );

      const base64String =
        attachment instanceof Blob && (await this.blobToBase64(attachment));
      if (typeof base64String === "string") {
        const blob = new Blob([base64String], {
          type: "application/octet-stream",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${file[0].name}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      // const blob = new Blob([reader], {
      //   type: file[0].content_type,
      // });
      // console.log("Blob", blob);
      // const url = URL.createObjectURL(blob);
      // console.log("Downloading file", file[0].name, url);
      // const a = document.createElement("a");
      // a.href = url;
      // a.download = `${file[0].name}`;
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
      // URL.revokeObjectURL(url);
      return "success";
    } catch (error) {
      console.error("Error during file download:", error);
      return null;
    }
  }

  public async getAllDocumentRecords(): Promise<{
    folders: DocumentFolderEntity[];
    files: DocumentFileEntity[];
  }> {
    const folders = await this.foldersDb.getAllRecords<DocumentFolderEntity>({
      descending: true,
    });
    const files = await this.filesDb.getAllRecords<DocumentFileEntity>({
      descending: true,
    });
    return { folders, files };
  }
}

const documentService = new DocumentService();
export default documentService;
