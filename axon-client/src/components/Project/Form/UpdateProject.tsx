import { Box, Button, IconButton } from "@primer/react";
import { LuFolderEdit } from "react-icons/lu";
import OverlayMenu from "../../Common/OverlayMenu";
import { Text } from "../../Common/Text";
import { formOptions, useForm } from "@tanstack/react-form";
import { InlineSpinner } from "../../Common/Spinner";
import { Input } from "src/components/Common/Input";
import { formValidation } from "src/common/forms/forms.validation";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { PiFolderBold } from "react-icons/pi";
import { BaseProjectProps } from "../index.types";
import { ProjectData } from "src/domain/project/project.entity";
import { UpdateProjectDto } from "src/domain/project/project.dto";
import { useProject } from "src/context/project/hooks/useProject";

function UpdateProject({ projectState }: BaseProjectProps) {
  const { updateProject } = useProject();
  const {
    projectFolders: { selectedProjects },
  } = projectState;

  // UpdateDocumentFolder.tsx is only rendered when a single folder is selected
  const projectData = selectedProjects[0];

  const formOpts = formOptions<ProjectData>({
    defaultValues: {
      name: projectData?.name || "",
      description: projectData?.description || "",
      pinned: projectData?.pinned,
    },
  });

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      const dto: UpdateProjectDto = {
        ...projectData,
        ...value,
      };
      updateProject.mutate(dto);
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
          aria-label="Update Project"
          sx={{
            flexShrink: 0,
          }}
        />
      }
      heading={<Text.Heading5>Update Project</Text.Heading5>}
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
                htmlFor="update-project-name"
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
                htmlFor="update-project-description"
              />
            );
          }}
        </Form.Field>
        <Form.Subscribe
          selector={({ isSubmitting }) => [isSubmitting]}
          children={([isSubmitting]) => (
            <Button
              variant="primary"
              leadingVisual={isSubmitting ? InlineSpinner : LuFolderEdit}
              disabled={isSubmitting}
              onClick={Form.handleSubmit}
              size="medium"
            >
              {isSubmitting ? "Updating Project..." : "Update Project"}
            </Button>
          )}
        />
      </Box>
    </OverlayMenu>
  );
}

export default UpdateProject;
