import { Box } from "@primer/react";
import { useEffect } from "react";
import { BaseProjectProps } from "../index.types";
import UpdateProject from "../Form/UpdateProject";
import DeleteProject from "../Form/DeleteProject";

function SelectProjectOptions({
  projectState,
  projectStateDispatch,
}: BaseProjectProps) {
  const {
    projects: { selectedProjects },
  } = projectState;

  useEffect(() => {
    projectStateDispatch({
      type: "CLEAR_SELECTED_PROJECTS",
    });
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      {selectedProjects.length === 1 && (
        <UpdateProject
          projectState={projectState}
          projectStateDispatch={projectStateDispatch}
        />
      )}
      {selectedProjects.length > 0 && (
        <DeleteProject
          projectState={projectState}
          projectStateDispatch={projectStateDispatch}
        />
      )}
    </Box>
  );
}

export default SelectProjectOptions;
