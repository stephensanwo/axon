import { IFolderList } from "src/types/folders";
import { Theme } from "src/types/theme";

export interface IFolderMenuContextProps {
  theme: Theme | undefined;
  isCurrentFolder: CurrentFolderProps;
  setIsCurrentFolder: React.Dispatch<React.SetStateAction<CurrentFolderProps>>;
  folderDialog: FolderDialogProps;
  setFolderDialog: React.Dispatch<React.SetStateAction<FolderDialogProps>>;
}

export type FolderProps = {
  theme: Theme | undefined;
  folders: IFolderList[] | null;
};

export interface FolderTreeProps {
  folder: IFolderList;
}

export type FolderDialogProps = string | null;

export type CurrentFolderProps = string | undefined;
