import { CreateNoteProps } from "./notes";

export interface FolderListProps {
  date_created: string;
  folder_id: string;
  last_edit?: string;
  name: string;
  user_id: string;
  notes: Array<NoteSummaryProps> | [];
}

export interface NoteSummaryProps {
  user_id: string;
  folder_id: string;
  note_id: string;
  name: string;
  description: string;
  date_created: string;
  last_edited: string;
}

export interface FolderProps {
  date_created: string;
  folder_id: string;
  last_edit?: string;
  name: string;
  user_id: string;
}

export type FolderActionProps =
  | {
      type: "init_folder";
      payload: Array<FolderListProps>;
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
    };

export interface CreateFolderProps {
  folder_name: string;
}

export interface PatchFolderProps {
  folder_name: string;
}
