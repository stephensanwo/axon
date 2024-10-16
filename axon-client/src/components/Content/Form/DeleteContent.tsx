import { Box, Button } from "@primer/react";
import { PiTrashBold } from "react-icons/pi";
import OverlayMenu from "../../Common/OverlayMenu";
import { Text } from "../../Common/Text";
import { useForm } from "@tanstack/react-form";
import { InlineSpinner } from "../../Common/Spinner";
import map from "lodash/map";
import { useMemo } from "react";
import { useContent } from "src/context/content/hooks/useContent";
import { useContentStore } from "src/context/content/content.store";

function DeleteContent() {
  const { deleteContent } = useContent();
  const { selectedContent, setSelectedContent } = useContentStore();

  const isMultipleContentSelected = selectedContent.length > 1;

  const selectedContentIds = useMemo(() => {
    return map(selectedContent, "id");
  }, [selectedContent]);

  const Form = useForm({
    onSubmit: async ({ value }) => {
      deleteContent.mutate(selectedContentIds);
      setSelectedContent([]);
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
            <Text.Heading6>{selectedContent.length}</Text.Heading6>
          )}
          disabled={false}
          aria-label="Delete Selected Content"
          sx={{
            flexShrink: 0,
          }}
        >
          Delete Content
        </Button>
      }
      heading={<Text.Heading5>Delete Selected Content(s)</Text.Heading5>}
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
          }}
        >
          {`Are you sure you want to delete ${isMultipleContentSelected ? "these content" : "this content"}? This action cannot be undone.`}
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
                ? `Deleting ${isMultipleContentSelected ? "Content" : "Content"}...`
                : `Delete ${isMultipleContentSelected ? "Content" : "Content"}`}
            </Button>
          )}
        />
      </Box>
    </OverlayMenu>
  );
}

export default DeleteContent;
