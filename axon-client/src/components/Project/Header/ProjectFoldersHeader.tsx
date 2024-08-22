import { Box } from "@primer/react";
import { Text } from "../../Common/Text";
import { BaseProjectProps } from "../index.types";
import CreateProject from "../Form/CreateProject";
import SelectProjectOptions from "../components/SelectProjectOptions";

function ProjectFoldersHeader({
  title,
  subtitle,
  projectState,
  projectStateDispatch,
}: {
  title: string;
  subtitle: string;
} & BaseProjectProps) {
  return (
    <>
      <Box
        sx={{
          height: "80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Text.Heading4>{title}</Text.Heading4>
          <Text.Small>{subtitle}</Text.Small>
        </Box>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <SelectProjectOptions
            projectState={projectState}
            projectStateDispatch={projectStateDispatch}
          />
          <CreateProject
            projectState={projectState}
            projectStateDispatch={projectStateDispatch}
          />
        </Box>
      </Box>
    </>
  );
}

export default ProjectFoldersHeader;
