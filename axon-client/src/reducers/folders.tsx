import { FolderActionProps, FolderListProps } from "types/folders";

const folderReducer = (
  folders: Array<FolderListProps>,
  action: FolderActionProps
) => {
  switch (action.type) {
    case "init_folder": {
      return action.payload;
    }

    case "new_folder": {
      const newFolder = {} as FolderListProps;
      newFolder.folder_id = action.payload.folder_id;
      newFolder.name = action.payload.name;
      newFolder.date_created = "";
      newFolder.last_edit = "";
      newFolder.user_id = "";
      newFolder.notes = null;
      return [...folders, newFolder];
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
};

export default folderReducer;
