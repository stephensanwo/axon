import { Box } from "@primer/react";
import { LuFolderEdit } from "react-icons/lu";
import OverlayMenu from "../../Common/OverlayMenu";
import { Text } from "../../Common/Text";
import { formOptions, useForm } from "@tanstack/react-form";
import { InlineSpinner } from "../../Common/Spinner";
import { Input } from "src/components/Common/Input";
import { formValidation } from "src/common/forms/forms.validation";
import { zodValidator } from "@tanstack/zod-form-adapter";
import Icon from "src/components/Common/Icon";
import { ContentData } from "src/domain/content/content.entity";
import { UpdateContentDto } from "src/domain/content/content.dto";
import { useContent } from "src/context/content/hooks/useContent";
import { useContentStore } from "src/context/content/hooks/useContentStore";
import { Button } from "src/components/Common/Button";

function UpdateContent() {
  const { updateContent } = useContent();
  const { selectedContent } = useContentStore();

  // UpdateContent.tsx is only rendered when a single content is selected
  const contentData = selectedContent[0];

  const formOpts = formOptions<ContentData>({
    defaultValues: {
      name: contentData?.name || "",
      pinned: contentData?.pinned,
      content_type: contentData?.content_type,
      content_folder_id: contentData?.content_folder_id,
    },
  });

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      const dto: UpdateContentDto = {
        ...contentData,
        ...value,
      };
      updateContent.mutate(dto);
    },
  });

  return (
    <OverlayMenu
      width={300}
      minHeight={150}
      side="outside-bottom"
      anchorOffset={10}
      alignmentOffset={0}
      align="center"
      anchorComponent={
        <Button
          variant="outline"
          disabled={false}
          aria-label="Update Content"
          size="icon"
        >
          <LuFolderEdit />
        </Button>
      }
      heading={<Text.Heading5Secondary>Update Content</Text.Heading5Secondary>}
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
                label="Name"
                placeholder="e.g. My Content"
                value={state.value || ""}
                error={formValidation.fieldError(state.meta)}
                onChange={handleChange}
                onBlur={handleBlur}
                leadingVisual={<Icon.BoardAlt />}
                required={true}
                htmlFor="update-board-name"
                caption="Max 50 characters"
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
                  Updating Content...
                </>
              ) : (
                "Update Content"
              )}
            </Button>
          )}
        />
      </Box>
    </OverlayMenu>
  );
}

export default UpdateContent;
