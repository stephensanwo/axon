import { IFolderAction, IFolderList } from "src/types/folders";

const folderReducer = (
  folders: IFolderList[],
  action: IFolderAction
): IFolderList[] => {
  switch (action.type) {
    case "INIT_FOLDER_LIST": {
      return action.payload;
    }

    case "NEW_FOLDER": {
      return [action.payload, ...folders];
    }

    case "NEW_NOTE": {
      return folders.map((folder) => {
        if (folder.folder_id === action.payload.folder_id) {
          return { ...folder, notes: [action.payload, ...folder.notes] };
        } else {
          return folder;
        }
      });
    }

    case "EDIT_FOLDER": {
      return folders.map((folder) => {
        if (folder.folder_id === action.payload.folder_id) {
          return { ...folder, folder_name: action.payload.folder_name };
        } else {
          return folder;
        }
      });
    }

    case "EDIT_NOTE": {
      return folders.map((folder) => {
        if (folder.folder_id === action.payload.folder_id) {
          const updatedNotes = folder.notes.map((note) => {
            if (note.note_id === action.payload.note_id) {
              return {
                ...note,
                note_name: action.payload.note_name,
                description: action.payload.description,
              };
            } else {
              return note;
            }
          });
          return { ...folder, notes: updatedNotes };
        }
        return folder;
      });
    }

    case "DELETE_FOLDER": {
      return folders.filter(
        (folder) => folder.folder_id !== action.payload.folder_id
      );
    }

    case "DELETE_NOTE": {
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
