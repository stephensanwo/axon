import { CreateNoteProps, ISelectedNote } from "./notes";

export interface IFolderList {
  date_created: string;
  folder_id: string;
  last_edit?: string;
  name: string;
  user_id: string;
  notes: Array<INoteSummary> | [];
}

export interface INoteSummary {
  user_id: string;
  folder_id: string;
  note_id: string;
  name: string;
  description: string;
  date_created: string;
  last_edited: string;
}

export interface IFolder {
  date_created: string;
  folder_id: string;
  last_edit?: string;
  name: string;
  user_id: string;
}

export type IFolderAction =
  | {
      type: "init_folder";
      payload: Array<IFolderList>;
    }
  | {
      type: "new_folder";
      payload: {
        folder_id: string;
        name: string;
      };
    }
  | {
      type: "new_note";
      payload: CreateNoteProps;
    }
  | {
      type: "edit_folder";
      payload: {
        folder_id: string;
        name: string;
      };
    }
  | {
      type: "delete_folder";
      payload: {
        folder_id: string;
      };
    }
  | {
      type: "delete_note";
      payload: ISelectedNote;
    };

export interface ICreateFolder {
  folder_name: string;
}

export interface IPatchFolder {
  folder_name: string;
}
