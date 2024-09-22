import { ActionList, Box, Button, IconButton } from "@primer/react";
import { Input } from "../../Common/Input";
import { PiFolderBold, PiPlusBold } from "react-icons/pi";
import OverlayMenu from "../../Common/OverlayMenu";
import { Text } from "../../Common/Text";
import { formOptions, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { formValidation } from "src/common/forms/forms.validation";
import { InlineSpinner } from "../../Common/Spinner";
import Icon from "src/components/Common/Icon";
import { useContent } from "src/context/content/hooks/useContent";
import { CreateContentDto } from "src/domain/content/content.dto";
import {
  ContentData,
  ContentTypeKeys,
} from "src/domain/content/content.entity";
import { CheckCircleIcon } from "@primer/octicons-react";
import startCase from "lodash/startCase";
import { useSettingsContext } from "src/context/settings/hooks/useSettingsContext";

function CreateContent() {
  const { createContent } = useContent();
  const { settingsState } = useSettingsContext();
  const contentTypes = settingsState.settings.data?.contentTypes!!;

  const formOpts = formOptions<ContentData>({
    defaultValues: {
      name: "",
      content_type: "block",
      pinned: false,
    },
  });

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      const content = contentTypes[value.content_type as ContentTypeKeys];
      const dto: CreateContentDto = {
        ...value,
        content,
      };
      console.log("CreateContentDto", dto);
      createContent.mutate(dto);
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
          aria-label="Create New Content"
          sx={{
            flexShrink: 0,
          }}
        />
      }
      heading={<Text.Heading5>Create New Content</Text.Heading5>}
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
                placeholder="e.g. Markdown"
                value={state.value || ""}
                error={formValidation.fieldError(state.meta)}
                onChange={handleChange}
                onBlur={handleBlur}
                leadingVisual={<PiFolderBold />}
                required={true}
                htmlFor="create-content-name"
                type="text"
                caption="Max 50 characters"
              />
            );
          }}
        </Form.Field>
        <Form.Field
          name="content_type"
          validatorAdapter={zodValidator()}
          validators={{
            onChangeAsyncDebounceMs: 500,
            onChange: formValidation.fieldValidation("string", 50),
          }}
        >
          {({ state }) => {
            return (
              <ActionList>
                <Box
                  sx={{
                    marginBottom: 2,
                  }}
                >
                  <Text.Small>Select Content Type *</Text.Small>
                </Box>
                {Object.values(contentTypes).map((item, index) => (
                  <ActionList.Item
                    key={index}
                    sx={{
                      margin: 0,
                      width: "100%",
                    }}
                    onClick={() =>
                      Form.setFieldValue("content_type", item.content_type)
                    }
                  >
                    <Text.ParagraphSecondary>
                      {startCase(item.content_type)}
                    </Text.ParagraphSecondary>
                    {state.value === item.content_type && (
                      <ActionList.TrailingVisual>
                        <CheckCircleIcon />
                      </ActionList.TrailingVisual>
                    )}
                  </ActionList.Item>
                ))}
              </ActionList>
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

export default CreateContent;
