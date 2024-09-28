import { Box } from "@primer/react";
import { Text } from "../../Common/Text";
import SyncDocumentStatus from "../Sync/DocumentFileStatus";
import UploadDocumentFile from "../Sync/UploadDocumentFile";
import SelectDocumentOptions from "../Form/SelectDocumentOptions";
import { BaseDocumentProps } from "../index.types";

function DocumentFileHeader({
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
          <SelectDocumentOptions
            level="file"
            documentState={documentState}
            documentStateDispatch={documentStateDispatch}
          />
          <SyncDocumentStatus
            documentState={documentState}
            documentStateDispatch={documentStateDispatch}
          />
          <UploadDocumentFile
            documentState={documentState}
            documentStateDispatch={documentStateDispatch}
          />
        </Box>
      </Box>
    </>
  );
}

export default DocumentFileHeader;
