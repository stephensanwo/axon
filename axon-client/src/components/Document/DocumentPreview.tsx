import { Box, Truncate, useTheme } from "@primer/react";
import { Stack } from "@primer/react/drafts";
import { DocumentIcon } from "./components/DocumentIcon";
import { formatDateToRelativeTime } from "src/common/date";
import { convertFileSize, getContentType } from "src/common/file";
import { DocumentState } from "src/context/document/document.types";
import { Text } from "../Common/Text";

function DocumentPreview(documentState: DocumentState) {
  const { theme } = useTheme();

  const documentInfo: Record<string, string>[] = [
    {
      name: "File Name",
      value:
        documentState.documentFolderFiles.selectedDocumentFilePreview?.name ||
        "",
    },
    {
      name: "Extension",
      value:
        getContentType(
          documentState.documentFolderFiles.selectedDocumentFilePreview
            ?.content_type!!
        ) || "",
    },
    {
      name: "Size",
      value:
        convertFileSize({
          size: documentState.documentFolderFiles.selectedDocumentFilePreview
            ?.file_size!!,
        }) || "",
    },
    {
      name: "Created",
      value:
        formatDateToRelativeTime(
          documentState.documentFolderFiles.selectedDocumentFilePreview
            ?.created!!
        ) || "",
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 8,
        paddingTop: "25%",
        gap: 8,
      }}
    >
      <Box>
        {DocumentIcon({
          content_type:
            documentState.documentFolderFiles.selectedDocumentFilePreview
              ?.content_type || "",
          size: 250,
          color: theme?.colors.border.variant1,
        })}
      </Box>
      <Stack
        direction="vertical"
        gap={"condensed"}
        style={{
          width: "100%",
        }}
      >
        <Box>
          <Text.Heading5Secondary>Placeholder</Text.Heading5Secondary>
        </Box>
        {documentInfo.map((info, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 4,
              borderBottom:
                index !== documentInfo.length - 1 &&
                `1px solid ${theme?.colors.border.default}`,
              paddingBottom: 2,
            }}
          >
            <Text.ParagraphSecondary>{info.name}</Text.ParagraphSecondary>
            <Text.ParagraphSecondary
              sx={{
                textAlign: "right",
              }}
            >
              <Truncate title={info.value} maxWidth={300}>
                {info.value}
              </Truncate>
            </Text.ParagraphSecondary>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default DocumentPreview;
