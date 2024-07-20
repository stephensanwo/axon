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
import {
  DocumentAction,
  DocumentState,
} from "src/context/document/document.types";

function CreateDocumentFolder({
  documentState,
  documentStateDispatch,
}: {
  documentState: DocumentState;
  documentStateDispatch: React.Dispatch<DocumentAction>;
}) {
  const {
    documentFolders: { createDocumentFolderForm },
  } = documentState;
  const { createDocumentFolder } = useDocument();

  const formOpts = formOptions<CreateDocumentFolderDto>({
    defaultValues: {
      name: createDocumentFolderForm?.name || "",
      description: createDocumentFolderForm?.description || "",
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
      minHeight={300}
      side="outside-top"
      anchorOffset={10}
      alignmentOffset={-150}
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
        documentStateDispatch({
          type: "SET_CREATE_DOCUMENT_FOLDER_FORM",
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
                htmlFor="create-document-folder-description"
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
