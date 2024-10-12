import { Box, Truncate, useTheme } from "@primer/react";
import { Stack } from "@primer/react/drafts";
import { DocumentIcon } from "./Common/DocumentIcon";
import { formatDateToRelativeTime } from "src/common/date";
import { convertFileSize, getContentType } from "src/common/file";
import { Text } from "../Common/Text";
import { UseQueryResult } from "@tanstack/react-query";
import { DocumentFileEntity } from "src/domain/document/document.entity";
import Skeleton from "../Skeleton";

function DocumentPreview({
  documentFile,
}: {
  documentFile: UseQueryResult<DocumentFileEntity | null, unknown>;
}) {
  const { theme } = useTheme();

  if (!documentFile || documentFile.isLoading) {
    return (
      <Box
        sx={{
          padding: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          width: "100%",
        }}
      >
        <Skeleton count={1} height={250} width={250} />
        <Skeleton count={4} height={14} width={250} />
      </Box>
    );
  }

  const documentInfo: Record<string, string>[] = documentFile.data
    ? [
        {
          name: "File Name",
          value: documentFile.data.name || "",
        },
        {
          name: "Extension",
          value: getContentType(documentFile.data.content_type!!) || "",
        },
        {
          name: "Size",
          value:
            convertFileSize({
              size: documentFile.data.file_size!!,
            }) || "",
        },
        {
          name: "Created",
          value: formatDateToRelativeTime(documentFile.data.created!!) || "",
        },
      ]
    : [];

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 8,
        gap: 8,
      }}
    >
      <Box>
        {documentFile.data && (
          <DocumentIcon
            content_type={documentFile.data.content_type || ""}
            size={250}
            color={theme?.colors.border.variant1}
          />
        )}
      </Box>
      <Stack
        direction="vertical"
        gap={"condensed"}
        style={{
          width: "100%",
        }}
      >
        {documentInfo &&
          documentInfo.map((info, index) => (
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
                <Truncate title={info.value} maxWidth={200}>
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
