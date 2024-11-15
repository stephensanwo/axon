import { Box } from "@primer/react";
import { Input } from "../../Common/Input";
import { PiFolderFill, PiPlusBold } from "react-icons/pi";
import OverlayMenu from "../../Common/OverlayMenu";
import { Text } from "../../Common/Text";
import { formOptions, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { formValidation } from "src/common/forms/forms.validation";
import { useContent } from "src/context/content/hooks/useContent";
import { CreateContentFolderDto } from "src/domain/content/content.dto";
import { ContentFolderData } from "src/domain/content/content.entity";
import { Button } from "src/components/Common/Button";
import { InlineSpinner } from "../../Common/Spinner";
import { CircleCheck } from "lucide-react";

function CreateContentFolder() {
  const { createContentFolder } = useContent();

  const formOpts = formOptions<ContentFolderData>({
    defaultValues: {
      name: "",
      pinned: false,
    },
  });

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      const dto: CreateContentFolderDto = {
        ...value,
      };
      createContentFolder.mutate(dto);
      formApi.reset();
    },
  });

  return (
    <OverlayMenu
      width={250}
      minHeight={150}
      side="outside-top"
      anchorOffset={10}
      alignmentOffset={0}
      align="center"
      anchorComponent={
        <Button
          variant="outline"
          size="icon"
          disabled={false}
          aria-label="Create New Folder"
        >
          <PiPlusBold />
        </Button>
      }
      heading={<Text.Heading5>New Folder</Text.Heading5>}
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
                label={`Folder Name`}
                placeholder="e.g. New Folder"
                value={state.value || ""}
                error={formValidation.fieldError(state.meta)}
                onChange={handleChange}
                onBlur={handleBlur}
                leadingVisual={<PiFolderFill />}
                required={true}
                requiredText={`(${state.value?.length || 0}/50)`}
                htmlFor="create-content-folder"
                caption=""
              />
            );
          }}
        </Form.Field>
        <Form.Subscribe
          selector={({ isSubmitting }) => [isSubmitting]}
          children={([isSubmitting]) => (
            <Button
              type="submit"
              variant="outline"
              disabled={isSubmitting}
              size="default"
            >
              {isSubmitting ? (
                <>
                  <InlineSpinner />
                  Creating Folder...
                </>
              ) : (
                <>
                  <CircleCheck />
                  Create Folder
                </>
              )}
            </Button>
          )}
        />
      </Box>
    </OverlayMenu>
  );
}

export default CreateContentFolder;
