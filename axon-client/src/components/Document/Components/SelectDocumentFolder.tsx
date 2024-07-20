import { Box, Button, IconButton } from "@primer/react";
import { PiFoldersBold, PiSelection, PiTrashBold } from "react-icons/pi";
import { Text } from "src/components/Common/Text";
import {
  DocumentAction,
  DocumentState,
} from "src/context/document/document.types";
import DeleteDocumentFolder from "./DeleteDocumentFolder";
import UpdateDocumentFolder from "./UpdateDocumentFolder";

function SelectDocumentFolder({
  documentState,
  documentStateDispatch,
}: {
  documentState: DocumentState;
  documentStateDispatch: React.Dispatch<DocumentAction>;
}) {
  const {
    documentFolders: { selectedDocumentFolders },
  } = documentState;
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      {selectedDocumentFolders.length > 0 && (
        <Button
          variant="primary"
          leadingVisual={PiFoldersBold}
          trailingVisual={() => (
            <Text.Heading6>{selectedDocumentFolders.length}</Text.Heading6>
          )}
          disabled={false}
          aria-label="Selected Folders"
          sx={{
            flexShrink: 0,
          }}
        >
          Selected
        </Button>
      )}
      {selectedDocumentFolders.length === 1 && (
        <UpdateDocumentFolder
          documentState={documentState}
          documentStateDispatch={documentStateDispatch}
        />
      )}

      {selectedDocumentFolders.length > 0 && (
        <DeleteDocumentFolder
          documentState={documentState}
          documentStateDispatch={documentStateDispatch}
        />
      )}
    </Box>
  );
}

export default SelectDocumentFolder;
