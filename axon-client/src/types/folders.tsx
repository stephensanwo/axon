export interface IFolderList {
  date_created: string;
  folder_id: string;
  last_edited?: string;
  folder_name: string;
  user_id: string;
  notes: INoteSummary[];
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
  last_edited?: string;
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
      payload: IFolderList;
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

export interface IMutateFolder {
  folder_name: string;
  folder_id: string;
}

export interface IFolderMenuEvents {
  newFolder: boolean;
  updateFolder: boolean;
  newNote: boolean;
  updateNote: boolean;
}
