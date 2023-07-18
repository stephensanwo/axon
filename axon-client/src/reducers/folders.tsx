import { IFolderAction, IFolderList, INoteSummary } from "src/types/folders";

const folderReducer = (folders: Array<IFolderList>, action: IFolderAction) => {
  switch (action.type) {
    case "init_folder": {
      return action.payload;
    }

    case "new_folder": {
      const newFolder = {} as IFolderList;
      newFolder.folder_id = action.payload.folder_id;
      newFolder.name = action.payload.name;
      return [...folders, newFolder];
    }

    case "new_note": {
      const newNote = {} as INoteSummary;
      newNote.folder_id = action.payload.folder_id;
      newNote.name = action.payload.note_name;
      newNote.description = action.payload.note_description;

      return folders.map((folder) => {
        if (folder.folder_id === action.payload.folder_id) {
          return { ...folder, notes: [...folder.notes, newNote] };
        } else {
          return folder;
        }
      });
    }

    case "edit_folder": {
      return folders.map((folder) => {
        if (folder.folder_id === action.payload.folder_id) {
          return { ...folder, name: action.payload.name };
        } else {
          return folder;
        }
      });
    }

    case "delete_folder": {
      return folders.filter(
        (folder) => folder.folder_id !== action.payload.folder_id
      );
    }

    case "delete_note": {
      return folders.map((folder) => {
        if (folder.folder_id === action.payload.folder_id) {
          const filteredNotes = folder.notes.filter((note) => {
            return note.note_id !== action.payload.note_id;
          });
          return { ...folder, notes: filteredNotes };
        } else {
          return folder;
        }
      });
    }

    default: {
      throw Error("Unknown action: " + action);
    }
  }
};

export default folderReducer;
