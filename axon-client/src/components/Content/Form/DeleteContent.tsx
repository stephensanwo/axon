import { Box } from "@primer/react";
import { PiTrashBold } from "react-icons/pi";
import OverlayMenu from "../../Common/OverlayMenu";
import { Text } from "../../Common/Text";
import { useForm } from "@tanstack/react-form";
import { InlineSpinner } from "../../Common/Spinner";
import map from "lodash/map";
import { useMemo } from "react";
import { useContent } from "src/context/content/hooks/useContent";
import { useContentStore } from "src/context/content/hooks/useContentStore";
import { Button } from "src/components/Common/Button";

function DeleteContent() {
  const { deleteContent } = useContent();
  const { selectedContent, setSelectedContent } = useContentStore();

  const isMultipleContentSelected = selectedContent.length > 1;

  const selectedContentIds = useMemo(() => {
    return map(selectedContent, "id");
  }, [selectedContent]);

  const Form = useForm({
    onSubmit: async () => {
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
          variant="outline-destructive"
          disabled={false}
          aria-label="Delete Selected Content"
          size="icon"
        >
          <PiTrashBold />
        </Button>
      }
      heading={
        <Text.Heading5Secondary>
          Delete Selected Content(s)
        </Text.Heading5Secondary>
      }
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
        onSubmit={(e: any) => {
          e.preventDefault();
          Form.handleSubmit();
        }}
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
              type="submit"
              variant="outline-destructive"
              disabled={isSubmitting}
              size="default"
            >
              {isSubmitting ? (
                <>
                  <InlineSpinner />
                  {`Deleting ${isMultipleContentSelected ? "Content" : "Content"}...`}
                </>
              ) : (
                `Delete ${isMultipleContentSelected ? "Content" : "Content"}`
              )}
            </Button>
          )}
        />
      </Box>
    </OverlayMenu>
  );
}

export default DeleteContent;
