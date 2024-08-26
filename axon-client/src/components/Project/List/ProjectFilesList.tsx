import { BaseProjectProps } from "../index.types";
import Board from "src/components/Board";
import Icon from "src/components/Common/Icon";

function ProjectFilesList({
  projectState,
  projectStateDispatch,
}: BaseProjectProps) {
  // Could potentially support different types of lists (boards, actions etc...)
  return (
    <Board.List
      projectState={projectState}
      projectStateDispatch={projectStateDispatch}
      isLoading={projectState.projectFiles.query.isLoading}
      initialSortColumn={
        projectState.projectFiles.boards &&
        projectState.projectFiles.boards.length > 0
          ? "created"
          : ""
      }
      initialSortDirection={
        projectState.projectFiles.boards &&
        projectState.projectFiles.boards.length > 0
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
