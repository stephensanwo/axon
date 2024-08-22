import { Box } from "@primer/react";
import { Text } from "../../Common/Text";
import { BaseProjectProps } from "../index.types";

function ProjectFilesHeader({
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
        ></Box>
      </Box>
    </>
  );
}

export default ProjectFilesHeader;
