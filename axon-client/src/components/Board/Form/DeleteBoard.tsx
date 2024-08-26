import { Box, Button, IconButton } from "@primer/react";
import { PiTrashBold } from "react-icons/pi";
import OverlayMenu from "../../Common/OverlayMenu";
import { Text } from "../../Common/Text";
import { useForm } from "@tanstack/react-form";
import { InlineSpinner } from "../../Common/Spinner";
import map from "lodash/map";
import { useMemo } from "react";
import { BaseProjectProps } from "src/components/Project/index.types";
import { useBoard } from "src/context/board/hooks/useBoard";

function DeleteBoard({ projectState }: BaseProjectProps) {
  const { deleteBoard } = useBoard();
  const {
    projectFiles: { selectedBoards },
  } = projectState;
  const isMultipleBoardsSelected = selectedBoards.length > 1;

  const selectedBoardIds = useMemo(
    () => map(selectedBoards, "id"),
    [selectedBoards]
  );

  const Form = useForm({
    onSubmit: async ({ value }) => {
      deleteBoard.mutate(selectedBoardIds);
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
        isMultipleBoardsSelected ? (
          <Button
            variant="danger"
            leadingVisual={PiTrashBold}
            trailingVisual={() => (
              <Text.Heading6>{selectedBoards.length}</Text.Heading6>
            )}
            disabled={false}
            aria-label="Delete Selected Boards"
            sx={{
              flexShrink: 0,
            }}
          >
            Delete Boards
          </Button>
        ) : (
          <IconButton
            variant="danger"
            icon={PiTrashBold}
            disabled={false}
            aria-label="Delete Selected Boards"
            sx={{
              flexShrink: 0,
            }}
          />
        )
      }
      heading={<Text.Heading5>Delete Selected Boards(s)</Text.Heading5>}
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
          {`Are you sure you want to delete ${isMultipleBoardsSelected ? "these boards" : "this board"}? This action cannot be undone.`}
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
                ? `Deleting ${isMultipleBoardsSelected ? "Boards" : "Board"}...`
                : `Delete ${isMultipleBoardsSelected ? "Boards" : "Board"}`}
            </Button>
          )}
        />
      </Box>
    </OverlayMenu>
  );
}

export default DeleteBoard;
