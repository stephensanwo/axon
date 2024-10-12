import { Box, Button, IconButton } from "@primer/react";
import { LuFolderEdit } from "react-icons/lu";
import OverlayMenu from "../../Common/OverlayMenu";
import { Text } from "../../Common/Text";
import { formOptions, useForm } from "@tanstack/react-form";
import { InlineSpinner } from "../../Common/Spinner";
import { useDocument } from "src/context/document/hooks/useDocument";
import { UpdateDocumentFolderDto } from "src/domain/document/document.dto";
import { DocumentFolderData } from "src/domain/document/document.entity";
import { Input } from "src/components/Common/Input";
import { formValidation } from "src/common/forms/forms.validation";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { PiFolderBold } from "react-icons/pi";
import { useDocumentStore } from "src/context/document/document.store";

function UpdateDocumentFolder() {
  const { selectedDocumentFolders, setSelectedDocumentFolders } =
    useDocumentStore();
  const { updateDocumentFolder } = useDocument();

  // UpdateDocumentFolder.tsx is only rendered when a single folder is selected
  const folderData = selectedDocumentFolders && selectedDocumentFolders[0];

  const formOpts = formOptions<DocumentFolderData>({
    defaultValues: {
      name: folderData?.name || "",
      pinned: folderData?.pinned,
    },
  });

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      const dto: UpdateDocumentFolderDto = {
        ...folderData!!,
        ...value,
      };
      updateDocumentFolder.mutate(dto);
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
          aria-label="Update Selected Folder"
          sx={{
            flexShrink: 0,
          }}
        />
      }
      heading={<Text.Heading5>Update Selected Folder</Text.Heading5>}
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
                htmlFor="update-document-folder-name"
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
              leadingVisual={isSubmitting ? InlineSpinner : LuFolderEdit}
              disabled={isSubmitting}
              onClick={Form.handleSubmit}
              size="medium"
            >
              {isSubmitting ? "Updating Folder..." : "Update Folder"}
            </Button>
          )}
        />
      </Box>
    </OverlayMenu>
  );
}

export default UpdateDocumentFolder;
