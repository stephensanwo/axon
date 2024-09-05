import { Box, Button, IconButton } from "@primer/react";
import { LuFolderEdit } from "react-icons/lu";
import OverlayMenu from "../../Common/OverlayMenu";
import { Text } from "../../Common/Text";
import { formOptions, useForm } from "@tanstack/react-form";
import { InlineSpinner } from "../../Common/Spinner";
import { Input } from "src/components/Common/Input";
import { formValidation } from "src/common/forms/forms.validation";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { BaseProjectProps } from "src/components/Project/index.types";
import { useBoard } from "src/context/board/hooks/useBoard";
import { BoardData } from "src/domain/board/board.entity";
import { UpdateBoardDto } from "src/domain/board/board.dto";
import Icon from "src/components/Common/Icon";

function UpdateBoard({ projectState }: BaseProjectProps) {
  const { updateBoard } = useBoard();
  const {
    projectFiles: { selectedBoards },
  } = projectState;

  // UpdateBoard.tsx is only rendered when a single folder is selected
  const boardData = selectedBoards[0];

  const formOpts = formOptions<BoardData>({
    defaultValues: {
      name: boardData?.name || "",
      description: boardData?.description || "",
      pinned: boardData?.pinned,
      projectId: boardData?.projectId,
    },
  });

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      const dto: UpdateBoardDto = {
        ...boardData,
        ...value,
      };
      updateBoard.mutate(dto);
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
        <IconButton
          variant="default"
          icon={LuFolderEdit}
          disabled={false}
          aria-label="Update Board"
          sx={{
            flexShrink: 0,
          }}
        />
      }
      heading={<Text.Heading5>Update Board</Text.Heading5>}
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
        <Form.Field
          name="name"
          validatorAdapter={zodValidator()}
          validators={{
            onChangeAsyncDebounceMs: 500,
            onChange: formValidation.fieldValidation("string", 50),
          }}
        >
          {({ state, handleChange, handleBlur }) => {
            return (
              <Input.Text
                label="Name"
                placeholder="e.g. My Board"
                value={state.value || ""}
                error={formValidation.fieldError(state.meta)}
                onChange={handleChange}
                onBlur={handleBlur}
                leadingVisual={<Icon.BoardAlt />}
                required={true}
                htmlFor="update-board-name"
                type="text"
                caption="Max 50 characters"
              />
            );
          }}
        </Form.Field>
        <Form.Field
          name="description"
          validatorAdapter={zodValidator()}
          validators={{
            onChangeAsyncDebounceMs: 500,
            onChange: formValidation.fieldValidation("string", 250),
          }}
        >
          {({ state, handleChange, handleBlur }) => {
            return (
              <Input.TextArea
                label="Short Description"
                placeholder="e.g. Board Description"
                rows={2}
                resize="none"
                value={state.value || ""}
                error={formValidation.fieldError(state.meta)}
                onChange={handleChange}
                onBlur={handleBlur}
                caption="Max 250 characters"
                required={true}
                htmlFor="update-board-description"
              />
            );
          }}
        </Form.Field>
        <Form.Subscribe
          selector={({ isSubmitting }) => [isSubmitting]}
          children={([isSubmitting]) => (
            <Button
              variant="primary"
              leadingVisual={isSubmitting ? InlineSpinner : Icon.BoardAlt}
              disabled={isSubmitting}
              onClick={Form.handleSubmit}
              size="medium"
            >
              {isSubmitting ? "Updating Board..." : "Update Board"}
            </Button>
          )}
        />
      </Box>
    </OverlayMenu>
  );
}

export default UpdateBoard;
