import { ISelectedNote } from "./notes";

export interface IFolderList {
  date_created: string;
  folder_id: string;
  last_edit?: string;
  folder_name: string;
  user_id: string;
  notes: INoteSummary[] | [];
}

export interface INoteSummary {
  user_id: string;
  folder_id: string;
  note_id: string;
  note_name: string;
  description: string;
  date_created: string;
  last_edited: string;
}

export interface IFolder {
  date_created: string;
  folder_id: string;
  last_edit?: string;
  folder_name: string;
  user_id: string;
}

export type IFolderAction =
  | {
      type: "INIT_FOLDER_LIST";
      payload: IFolderList[];
    }
  | {
      type: "NEW_FOLDER";
      payload: {
        folder_id: string;
        folder_name: string;
      };
    }
  | {
      type: "NEW_NOTE";
      payload: INoteSummary;
    }
  | {
      type: "EDIT_FOLDER";
      payload: {
        folder_id: string;
        folder_name: string;
      };
    }
  | {
      type: "EDIT_NOTE";
      payload: {
        folder_id: string;
        note_id: string;
        description: string;
        note_name: string;
      };
    }
  | {
      type: "DELETE_FOLDER";
      payload: {
        folder_id: string;
      };
    }
  | {
      type: "DELETE_NOTE";
      payload: {
        note_id: string;
        folder_id: string;
      };
    };

export interface ICreateFolder {
  folder_name: string;
}

export interface IPatchFolder {
  folder_name: string;
}
