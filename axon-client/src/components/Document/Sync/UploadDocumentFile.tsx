import { Button, IconButton } from "@primer/react";
import { VariantType } from "@primer/react/lib/Button/types";
import { PiCloudArrowUp } from "react-icons/pi";
import { useDocument } from "src/context/document/hooks/useDocument";

function UploadDocumentFile({
  isIconButton = true,
  variant = "default",
}: {
  isIconButton?: boolean;
  variant?: VariantType;
}) {
  const { documentFiles, uploadDocument } = useDocument();

  return isIconButton ? (
    <IconButton
      variant={variant}
      icon={PiCloudArrowUp}
      disabled={false}
      onClick={() =>
        uploadDocument(
          documentFiles.data?.folder?.id!!,
          documentFiles.data?.folder?.name!!
        )
      }
      aria-label="Upload New Document"
      sx={{
        flexShrink: 0,
      }}
    />
  ) : (
    <Button
      variant={variant}
      disabled={false}
      onClick={() =>
        uploadDocument(
          documentFiles.data?.folder?.id!!,
          documentFiles.data?.folder?.name!!
        )
      }
      aria-label="Upload New Document"
      sx={{
        flexShrink: 0,
      }}
      leadingVisual={() => <PiCloudArrowUp size={14} />}
      size="small"
    >
      Upload Document
    </Button>
  );
}

export default UploadDocumentFile;
