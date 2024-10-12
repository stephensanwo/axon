import { Button, useTheme } from "@primer/react";
import { PiCloudArrowDown } from "react-icons/pi";
import { Text } from "src/components/Common/Text";
import { useDocument } from "src/context/document/hooks/useDocument";
import { useDocumentStore } from "src/context/document/document.store";

function DownloadDocumentFile() {
  const { selectedDocumentFiles } = useDocumentStore();
  const { downloadDocumentFile } = useDocument();
  const { theme } = useTheme();

  return (
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
        color: theme?.colors.text.gray,
      }}
    >
      Download
    </Button>
  );
}

export default DownloadDocumentFile;
