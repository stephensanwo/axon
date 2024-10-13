import { BaseProjectProps } from "../index.types";
import Board from "src/components/Board";
import Icon from "src/components/Common/Icon";

function ProjectFilesList({ projectFiles, projectFolders }: BaseProjectProps) {
  // Could potentially support different types of lists (boards, actions etc...)
  return (
    <Board.List
      projectFiles={projectFiles}
      projectFolders={projectFolders}
      initialSortColumn={
        projectFiles.data?.boards && projectFiles.data?.boards.length > 0
          ? "created"
          : ""
      }
      initialSortDirection={
        projectFiles.data?.boards && projectFiles.data?.boards.length > 0
          ? "DESC"
          : undefined
      }
      emptyDocumentMessage={
        <Board.Empty
          message={"You have no boards \n Create a new board to get started"}
          icon={Icon.Board}
        ></Board.Empty>
      }
    />
  );
}

export default ProjectFilesList;
