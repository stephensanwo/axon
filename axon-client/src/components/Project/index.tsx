import ProjectFooter from "./components/ProjectFooter";
import ProjectFilesHeader from "./Header/ProjectFilesHeader";
import ProjectFoldersHeader from "./Header/ProjectFoldersHeader";
import ProjectHeader from "./Header/ProjectFoldersHeader";
import ProjectFilesList from "./List/ProjectFilesList";
import ProjectFoldersList from "./List/ProjectFoldersList";
import ProjectsList from "./List/ProjectFoldersList";
import ProjectNav from "./Nav";
import ProjectEmpty from "./ProjectEmpty";
import { ProjectMain } from "./ProjectMain";

export const Project = {
  Main: ProjectMain,
  Nav: ProjectNav,
  Header: ProjectHeader,
  Footer: ProjectFooter,
  List: ProjectsList,
  Empty: ProjectEmpty,
};

export const ProjectFolders = {
  Header: ProjectFoldersHeader,
  List: ProjectFoldersList,
};

export const ProjectFiles = {
  Header: ProjectFilesHeader,
  List: ProjectFilesList,
};