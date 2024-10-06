import { Button, IconButton } from "@primer/react";
import { PiCloudArrowDown } from "react-icons/pi";
import { Text } from "src/components/Common/Text";
import { useDocument } from "src/context/document/hooks/useDocument";
import { useDocumentStore } from "src/context/document/document.store";

function DownloadDocumentFile() {
  const { selectedDocumentFiles } = useDocumentStore();
  const { downloadDocumentFile } = useDocument();

  const isMultipleFilesSelected = selectedDocumentFiles?.length!! > 1;
  return isMultipleFilesSelected ? (
    <Button
      variant="default"
      leadingVisual={PiCloudArrowDown}
      trailingVisual={() => (
        <Text.Heading6>{selectedDocumentFiles?.length!!}</Text.Heading6>
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
      onClick={() => downloadDocumentFile(selectedDocumentFiles!!)}
    />
  );
}

export default DownloadDocumentFile;
