import { BaseProjectProps } from "../index.types";
import { Box, useTheme } from "@primer/react";
import { PiAppWindowFill } from "react-icons/pi";
import { formatDateToRelativeTime } from "src/common/date";
import Card from "src/components/Common/Card";
import { useProject } from "src/context/project/hooks/useProject";
import { UpdateProjectDto } from "src/domain/project/project.dto";

function ProjectRecents({ projectState }: BaseProjectProps) {
  const { theme } = useTheme();
  const { updateProject } = useProject();
  return (
    <Box
      sx={{
        height: "200px",
        display: "flex",
        alignItems: "center",
        gap: 4,
        overflowX: "scroll",
        scrollbarWidth: "none",
      }}
    >
      {projectState?.projects?.pinnedProjects?.map((project, index) => (
        <Card.Button
          key={index}
          icon={
            <PiAppWindowFill size={64} color={theme?.colors.primary.default} />
          }
          title={project.name}
          subtitle={formatDateToRelativeTime(project.updated)}
          border
          trailingAction={() => {
            // Unpin project
            const projectUpdateDto: UpdateProjectDto = {
              ...project,
              pinned: false,
            };
            updateProject.mutate(projectUpdateDto);
          }}
          onClick={() => console.log("click")}
        ></Card.Button>
      ))}
    </Box>
  );
}

export default ProjectRecents;
