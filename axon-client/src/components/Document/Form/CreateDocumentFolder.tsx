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
import { CreateDocumentFolderDto } from "src/domain/document/document.dto";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { formValidation } from "src/common/forms/forms.validation";
import { InlineSpinner } from "../../Common/Spinner";
import { useDocument } from "src/context/document/hooks/useDocument";
import { useDocumentStore } from "src/context/document/document.store";

function CreateDocumentFolder() {
  const { createDocumentFolderForm, setCreateDocumentFolderForm } =
    useDocumentStore();
  const { createDocumentFolder } = useDocument();

  const formOpts = formOptions<CreateDocumentFolderDto>({
    defaultValues: {
      name: createDocumentFolderForm?.name || "",
      pinned: false,
    },
  });

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      createDocumentFolder.mutate(value);
      formApi.reset();
    },
  });

  return (
    <OverlayMenu
      width={300}
      minHeight={200}
      side="outside-top"
      anchorOffset={10}
      alignmentOffset={0}
      align="center"
      anchorComponent={
        <IconButton
          variant="default"
          icon={PiPlusBold}
          disabled={false}
          aria-label="Create New Folder"
          sx={{
            flexShrink: 0,
          }}
        />
      }
      heading={<Text.Heading5>Create New Folder</Text.Heading5>}
      onCloseCallback={() => {
        setCreateDocumentFolderForm(Form.state.values);
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
                placeholder="e.g. My Folder"
                value={state.value || ""}
                error={formValidation.fieldError(state.meta)}
                onChange={handleChange}
                onBlur={handleBlur}
                leadingVisual={<PiFolderBold />}
                required={true}
                htmlFor="create-document-folder-name"
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
              leadingVisual={
                isSubmitting ? InlineSpinner : PiFolderNotchPlusBold
              }
              disabled={isSubmitting}
              onClick={Form.handleSubmit}
              size="medium"
            >
              {isSubmitting ? "Creating Folder..." : "Create Folder"}
            </Button>
          )}
        />
      </Box>
    </OverlayMenu>
  );
}

export default CreateDocumentFolder;
