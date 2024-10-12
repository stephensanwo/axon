import { Box, useTheme } from "@primer/react";
import { PiAppWindowFill } from "react-icons/pi";
import { formatDateToRelativeTime } from "src/common/date";
import Card from "src/components/Common/Card";
import { DocumentFolderEntity } from "src/domain/document/document.entity";
import { UpdateDocumentFolderDto } from "src/domain/document/document.dto";
import { useDocument } from "src/context/document/hooks/useDocument";
import { useNavigate } from "react-router-dom";

function DocumentRecents({
  documentRecents,
}: {
  documentRecents: DocumentFolderEntity[];
}) {
  const { theme } = useTheme();
  const { updateDocumentFolder } = useDocument();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "150px",
        display: "flex",
        alignItems: "center",
        gap: 4,
        overflowX: "scroll",
        scrollbarWidth: "none",
        mb: 4,
      }}
    >
      {documentRecents.map((document, index) => (
        <Card.Button
          key={index}
          icon={
            <PiAppWindowFill size={64} color={theme?.colors.primary.default} />
          }
          title={document.name}
          subtitle={formatDateToRelativeTime(document.updated)}
          border
          trailingAction={() => {
            const dto: UpdateDocumentFolderDto = {
              ...document,
              pinned: false,
            };
            updateDocumentFolder.mutate(dto);
          }}
          onClick={() => navigate(`/documents/${document.name}`)}
        ></Card.Button>
      ))}
    </Box>
  );
}

export default DocumentRecents;
