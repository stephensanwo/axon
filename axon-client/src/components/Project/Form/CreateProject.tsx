import { Box, Button, IconButton } from "@primer/react";
import { Input } from "../../Common/Input";
import {
  PiFolderBold,
  PiFolderNotchPlusBold,
  PiPlusBold,
} from "react-icons/pi";
import OverlayMenu from "../../Common/OverlayMenu";
import { Text } from "../../Common/Text";
import { formOptions, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { formValidation } from "src/common/forms/forms.validation";
import { InlineSpinner } from "../../Common/Spinner";
import { BaseProjectProps } from "../index.types";
import { useProject } from "src/context/project/hooks/useProject";
import { CreateProjectDto } from "src/domain/project/project.dto";

function CreateProject({
  projectState,
  projectStateDispatch,
}: BaseProjectProps) {
  const {
    projectFolders: { createProjectForm },
  } = projectState;
  const { createProject } = useProject();

  const formOpts = formOptions<CreateProjectDto>({
    defaultValues: {
      name: createProjectForm?.name || "",
      description: createProjectForm?.description || "",
      pinned: false,
    },
  });

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      createProject.mutate(value);
      formApi.reset();
    },
  });

  return (
    <OverlayMenu
      width={300}
      minHeight={300}
      side="outside-top"
      anchorOffset={10}
      alignmentOffset={0}
      align="center"
      anchorComponent={
        <IconButton
          variant="default"
          icon={PiPlusBold}
          disabled={false}
          aria-label="Create New Project"
          sx={{
            flexShrink: 0,
          }}
        />
      }
      heading={<Text.Heading5>Create New Folder</Text.Heading5>}
      onCloseCallback={() => {
        projectStateDispatch({
          type: "SET_CREATE_PROJECT_FORM",
          payload: Form.state.values,
        });
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
                placeholder="e.g. My Project"
                value={state.value || ""}
                error={formValidation.fieldError(state.meta)}
                onChange={handleChange}
                onBlur={handleBlur}
                leadingVisual={<PiFolderBold />}
                required={true}
                htmlFor="create-project-name"
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
                placeholder="e.g. Project Folder"
                rows={2}
                resize="none"
                value={state.value || ""}
                error={formValidation.fieldError(state.meta)}
                onChange={handleChange}
                onBlur={handleBlur}
                caption="Max 250 characters"
                required={true}
                htmlFor="create-project-description"
              />
            );
          }}
        </Form.Field>
        <Form.Subscribe
          selector={({ isSubmitting }) => [isSubmitting]}
          children={([isSubmitting]) => (
            <Button
              variant="primary"
              leadingVisual={
                isSubmitting ? InlineSpinner : PiFolderNotchPlusBold
              }
              disabled={isSubmitting}
              onClick={Form.handleSubmit}
              size="medium"
            >
              {isSubmitting ? "Creating Project..." : "Create Project"}
            </Button>
          )}
        />
      </Box>
    </OverlayMenu>
  );
}

export default CreateProject;
