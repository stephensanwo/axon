import { Box, Button, IconButton } from "@primer/react";
import { PiTrashBold } from "react-icons/pi";
import OverlayMenu from "../../Common/OverlayMenu";
import { Text } from "../../Common/Text";
import { useForm } from "@tanstack/react-form";
import { InlineSpinner } from "../../Common/Spinner";
import { useDocument } from "src/context/document/hooks/useDocument";
import map from "lodash/map";
import { useMemo } from "react";
import { useDocumentStore } from "src/context/document/document.store";

function DeleteDocumentFile() {
  const { selectedDocumentFiles, setSelectedDocumentFiles } =
    useDocumentStore();
  const { deleteDocumentFile } = useDocument();
  const isMultipleFilesSelected = selectedDocumentFiles?.length!! > 1;

  const selectedFileIds = useMemo(
    () => map(selectedDocumentFiles, "id"),
    [selectedDocumentFiles]
  );

  const Form = useForm({
    onSubmit: async ({ value }) => {
      deleteDocumentFile.mutate(selectedFileIds);
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
        isMultipleFilesSelected ? (
          <Button
            variant="danger"
            leadingVisual={PiTrashBold}
            trailingVisual={() => (
              <Text.Heading6>{selectedDocumentFiles?.length!!}</Text.Heading6>
            )}
            disabled={false}
            aria-label="Delete Selected Files"
            sx={{
              flexShrink: 0,
            }}
          >
            Delete
          </Button>
        ) : (
          <IconButton
            variant="danger"
            icon={PiTrashBold}
            disabled={false}
            aria-label="Delete Selected File"
            sx={{
              flexShrink: 0,
            }}
          />
        )
      }
      heading={<Text.Heading5>Delete Selected File(s)</Text.Heading5>}
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
          {`Are you sure you want to delete ${isMultipleFilesSelected ? "these files" : "this file"}? This action cannot be undone.`}
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
                ? `Deleting ${isMultipleFilesSelected ? "Files" : "File"}...`
                : `Delete ${isMultipleFilesSelected ? "Files" : "File"}`}
            </Button>
          )}
        />
      </Box>
    </OverlayMenu>
  );
}

export default DeleteDocumentFile;
