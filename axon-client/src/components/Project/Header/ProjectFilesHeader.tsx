import { Box } from "@primer/react";
import { Text } from "../../Common/Text";
import { BaseProjectProps } from "../index.types";
import CreateBoard from "src/components/Board/Form/CreateBoard";
import SelectBoardOptions from "src/components/Board/Form/SelectBoardOptions";

function ProjectFilesHeader({
  title,
  subtitle,
  projectState,
  projectStateDispatch,
}: {
  title: string;
  subtitle: string;
} & BaseProjectProps) {
  // Could potentially support different types of project files (boards, actions etc...)
  return (
    <>
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 4,
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
          <SelectBoardOptions
            projectState={projectState}
            projectStateDispatch={projectStateDispatch}
          />
          <CreateBoard
            projectState={projectState}
            projectStateDispatch={projectStateDispatch}
          />
        </Box>
      </Box>
    </>
  );
}

export default ProjectFilesHeader;
