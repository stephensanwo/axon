import { Box, Text, Truncate, useTheme } from "@primer/react";
import { Stack } from "@primer/react/drafts";
import { useDocumentContext } from "src/hooks/document/useDocumentContext";
import { DocumentIcon } from "./Components/DocumentIcon";
import { formatDateToRelativeTime } from "src/common/date";
import { convertFileSize } from "src/common/file";

function DocumentPreview() {
  const { documentState } = useDocumentContext();
  const { theme } = useTheme();

  const documentInfo: Record<string, string>[] = [
    {
      name: "Name",
      value: documentState.documentPage.selectedDocument?.name || "",
    },
    {
      name: "Type",
      value: documentState.documentPage.selectedDocument?.content_type || "",
    },
    {
      name: "Size",
      value: convertFileSize(2000) || "",
    },
    {
      name: "Created",
      value:
        formatDateToRelativeTime(
          documentState.documentPage.selectedDocument?.created!!
        ) || "",
    },
    {
      name: "Updated",
      value:
        formatDateToRelativeTime(
          documentState.documentPage.selectedDocument?.updated!!
        ) || "",
    },
  ];
  console.log(
    "selectedDocument===>",
    documentState.documentPage.selectedDocument
  );

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 8,
        paddingTop: "25%",
        gap: 4,
      }}
    >
      <Box>
        {DocumentIcon({
          content_type:
            documentState.documentPage.selectedDocument?.content_type || "",
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
            <Text
              sx={{
                fontWeight: 600,
                fontSize: 1,
                color: theme?.colors.text.gray,
              }}
            >
              {info.name}
            </Text>
            <Text
              sx={{
                fontWeight: 400,
                fontSize: 1,
                color: theme?.colors.text.gray,
                textAlign: "right",
              }}
            >
              <Truncate title={info.value} maxWidth={300}>
                {info.value}
              </Truncate>
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default DocumentPreview;
