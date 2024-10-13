import { Box } from "@primer/react";
import { useEffect } from "react";
import UpdateProject from "../Form/UpdateProject";
import DeleteProject from "../Form/DeleteProject";
import { useProjectStore } from "src/context/project/project.store";

function SelectProjectOptions() {
  const { selectedProjects, setSelectedProjects } = useProjectStore();

  useEffect(() => {
    setSelectedProjects([]);
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
      {selectedProjects.length === 1 && <UpdateProject />}
      {selectedProjects.length > 0 && <DeleteProject />}
    </Box>
  );
}

export default SelectProjectOptions;
