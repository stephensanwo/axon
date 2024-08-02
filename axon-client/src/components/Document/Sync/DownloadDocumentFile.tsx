import { Button, IconButton } from "@primer/react";
import { PiCloudArrowDown } from "react-icons/pi";
import { Text } from "src/components/Common/Text";
import { BaseDocumentProps } from "../index.types";
import { useDocument } from "src/context/document/hooks/useDocument";

function DownloadDocumentFile({ documentState }: BaseDocumentProps) {
  const {
    documentFolderFiles: { selectedDocumentFiles },
  } = documentState;
  const { downloadDocumentFile } = useDocument();

  const isMultipleFilesSelected = selectedDocumentFiles.length > 1;
  return isMultipleFilesSelected ? (
    <Button
      variant="default"
      leadingVisual={PiCloudArrowDown}
      trailingVisual={() => (
        <Text.Heading6>{selectedDocumentFiles.length}</Text.Heading6>
      )}
      disabled={false}
      aria-label="Download Selected Files"
      sx={{
        flexShrink: 0,
      }}
    >
      Download
    </Button>
  ) : (
    <IconButton
      variant="default"
      icon={PiCloudArrowDown}
      disabled={false}
      aria-label="Download Selected File"
      sx={{
        flexShrink: 0,
      }}
      onClick={() => downloadDocumentFile(selectedDocumentFiles)}
    />
  );
}

export default DownloadDocumentFile;
