import { Box, Button } from "@primer/react";
import { PiTrashBold } from "react-icons/pi";
import OverlayMenu from "../../Common/OverlayMenu";
import { Text } from "../../Common/Text";
import { useForm } from "@tanstack/react-form";
import { InlineSpinner } from "../../Common/Spinner";
import { useDocument } from "src/context/document/hooks/useDocument";
import map from "lodash/map";
import { useMemo } from "react";
import { useDocumentStore } from "src/context/document/document.store";

function DeleteDocumentFolder() {
  const { selectedDocumentFolders } = useDocumentStore();
  const { deleteDocumentFolder } = useDocument();
  const isMultipleFoldersSelected = selectedDocumentFolders.length > 1;

  const selectedFolderIds = useMemo(
    () => map(selectedDocumentFolders, "id"),
    [selectedDocumentFolders]
  );

  const Form = useForm({
    onSubmit: async ({ value }) => {
      deleteDocumentFolder.mutate(selectedFolderIds);
    },
  });

  return (
    <OverlayMenu
      width={300}
      minHeight={150}
      side="outside-top"
      anchorOffset={10}
      alignmentOffset={0}
      align="center"
      anchorComponent={
        <Button
          variant="danger"
          leadingVisual={PiTrashBold}
          trailingVisual={() => (
            <Text.Heading6>{selectedDocumentFolders?.length}</Text.Heading6>
          )}
          disabled={false}
          aria-label="Delete Selected Folders"
          sx={{
            flexShrink: 0,
          }}
        >
          Delete Folders
        </Button>
      }
      heading={<Text.Heading5>Delete Selected Folder(s)</Text.Heading5>}
      onCloseCallback={() => {}}
    >
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
        as="form"
      >
        <Text.ParagraphSecondary
          sx={{
            textAlign: "center",
            marginBottom: 1,
            fontSize: 0,
          }}
        >
          {`Are you sure you want to delete ${isMultipleFoldersSelected ? "these folders and all their contents" : "this folder and all its contents"}? This action cannot be undone.`}
        </Text.ParagraphSecondary>
        <Form.Subscribe
          selector={({ isSubmitting }) => [isSubmitting]}
          children={([isSubmitting]) => (
            <Button
              variant="danger"
              leadingVisual={isSubmitting ? InlineSpinner : PiTrashBold}
              disabled={isSubmitting}
              onClick={Form.handleSubmit}
              size="medium"
            >
              {isSubmitting
                ? `Deleting ${isMultipleFoldersSelected ? "Folders" : "Folder"}...`
                : `Delete ${isMultipleFoldersSelected ? "Folders" : "Folder"}`}
            </Button>
          )}
        />
      </Box>
    </OverlayMenu>
  );
}

export default DeleteDocumentFolder;
