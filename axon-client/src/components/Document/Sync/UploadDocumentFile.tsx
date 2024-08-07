import { Button, IconButton } from "@primer/react";
import { VariantType } from "@primer/react/lib/Button/types";
import { PiCloudArrowUp } from "react-icons/pi";
import { DocumentState } from "src/context/document/document.types";
import { useDocument } from "src/context/document/hooks/useDocument";
import { BaseDocumentProps } from "../index.types";

function UploadDocumentFile({
  documentState,
  isIconButton = true,
  variant = "default",
}: {
  isIconButton?: boolean;
  variant?: VariantType;
} & BaseDocumentProps) {
  const { uploadDocument } = useDocument();

  return isIconButton ? (
    <IconButton
      variant={variant}
      icon={PiCloudArrowUp}
      disabled={false}
      onClick={() =>
        uploadDocument(
          documentState.documentFolderFiles.folder?.id!!,
          documentState.documentFolderFiles.folder?.name!!
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
          documentState.documentFolderFiles.folder?.id!!,
          documentState.documentFolderFiles.folder?.name!!
        )
      }
      aria-label="Upload New Document"
      sx={{
        flexShrink: 0,
      }}
      leadingVisual={() => <PiCloudArrowUp size={18} />}
    >
      Upload Document
    </Button>
  );
}

export default UploadDocumentFile;
