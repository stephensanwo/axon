import { Box } from "@primer/react";
import { Text } from "../../Common/Text";
import CreateDocumentFolder from "./../components/CreateDocumentFolder";
import SelectDocumentOptions from "../components/SelectDocumentOptions";
import { BaseDocumentProps } from "../index.types";

function DocumentFolderHeader({
  title,
  subtitle,
  documentState,
  documentStateDispatch,
}: {
  title: string;
  subtitle: string;
} & BaseDocumentProps) {
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
          <SelectDocumentOptions
            level="folder"
            documentState={documentState}
            documentStateDispatch={documentStateDispatch}
          />
          <CreateDocumentFolder
            documentState={documentState}
            documentStateDispatch={documentStateDispatch}
          />
        </Box>
      </Box>
    </>
  );
}

export default DocumentFolderHeader;
