import { Box } from "@primer/react";
import { Text } from "../../Common/Text";
import CreateDocumentFolder from "../Form/CreateDocumentFolder";
import SelectDocumentOptions from "../Form/SelectDocumentOptions";
import { BaseDocumentProps } from "../index.types";

function DocumentFolderHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
} & BaseDocumentProps) {
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
          <SelectDocumentOptions level="folder" />
          <CreateDocumentFolder />
        </Box>
      </Box>
    </>
  );
}

export default DocumentFolderHeader;
