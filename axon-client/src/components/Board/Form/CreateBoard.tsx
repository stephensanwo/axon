import { Box, Button, IconButton } from "@primer/react";
import { Input } from "../../Common/Input";
import { PiFolderBold, PiPlusBold } from "react-icons/pi";
import OverlayMenu from "../../Common/OverlayMenu";
import { Text } from "../../Common/Text";
import { formOptions, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { formValidation } from "src/common/forms/forms.validation";
import { InlineSpinner } from "../../Common/Spinner";
import { useBoard } from "src/context/board/hooks/useBoard";
import { CreateBoardDto } from "src/domain/board/board.dto";
import { BaseProjectProps } from "src/components/Project/index.types";
import Icon from "src/components/Common/Icon";
import { useBoardStore } from "src/context/board/board.store";

function CreateBoard({ projectFiles }: BaseProjectProps) {
  const { createBoard } = useBoard();
  const { createBoardForm, setCreateBoardForm } = useBoardStore();

  const formOpts = formOptions<CreateBoardDto>({
    defaultValues: {
      name: createBoardForm?.name || "",
      pinned: false,
      projectId: projectFiles.data?.project?.id!!,
    },
  });

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      createBoard.mutate(value);
      formApi.reset();
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
          icon={PiPlusBold}
          disabled={false}
          aria-label="Create New Board"
          sx={{
            flexShrink: 0,
          }}
        />
      }
      heading={<Text.Heading5>Create New Board</Text.Heading5>}
      onCloseCallback={() => {
        setCreateBoardForm(Form.state.values);
      }}
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
                leadingVisual={<PiFolderBold />}
                required={true}
                htmlFor="create-board-name"
                type="text"
                caption="Max 50 characters"
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
              {isSubmitting ? "Creating Board..." : "Create Board"}
            </Button>
          )}
        />
      </Box>
    </OverlayMenu>
  );
}

export default CreateBoard;
