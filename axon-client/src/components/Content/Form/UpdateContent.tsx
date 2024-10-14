import { Box, Button, IconButton } from "@primer/react";
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
import { useContentStore } from "src/context/content/content.store";

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
      side="outside-top"
      anchorOffset={10}
      alignmentOffset={0}
      align="center"
      anchorComponent={
        <IconButton
          variant="default"
          icon={LuFolderEdit}
          disabled={false}
          aria-label="Update Content"
          sx={{
            flexShrink: 0,
          }}
        />
      }
      heading={<Text.Heading5>Update Content</Text.Heading5>}
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
                placeholder="e.g. My Content"
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
              {isSubmitting ? "Creating Content..." : "Create Content"}
            </Button>
          )}
        />
      </Box>
    </OverlayMenu>
  );
}

export default UpdateContent;
