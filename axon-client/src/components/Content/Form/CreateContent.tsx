import { ActionList, Box, IconButton } from "@primer/react";
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
  ContentEntity,
  ContentFolderEntity,
  ContentTypeKeys,
} from "src/domain/content/content.entity";
import { CheckCircleIcon } from "@primer/octicons-react";
import startCase from "lodash/startCase";
import { useSettingsContext } from "src/context/settings/hooks/useSettingsContext";
import { ContentListQuery } from "src/context/content/index.types";
import { Button } from "src/components/Common/Button";
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "src/components/Common/Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/Select";

function CreateContent({
  contentListFolder,
}: {
  contentListFolder: ContentFolderEntity;
}) {
  const { createContent } = useContent();
  const { settingsState } = useSettingsContext();
  const contentTypes = settingsState.settings.data?.contentTypes!!;

  const formOpts = formOptions<ContentData>({
    defaultValues: {
      name: "",
      content_type: "block",
      pinned: false,
      content_folder_id: contentListFolder.id,
    },
  });

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      const dto: CreateContentDto = {
        ...value,
      };
      createContent.mutate(dto);
      formApi.reset();
    },
  });

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="outline"
          size="icon"
          disabled={false}
          aria-label="Create New Content"
        >
          <PiPlusBold />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <PopoverHeader>Add Content</PopoverHeader>
        <PopoverBody>
          <form
            className="flex flex-col gap-3"
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
                    placeholder="e.g. Markdown"
                    value={state.value || ""}
                    error={formValidation.fieldError(state.meta)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={true}
                    requiredText={`(${state.value?.length || 0}/50)`}
                    htmlFor="add-content"
                  />
                );
              }}
            </Form.Field>
            <Form.Field name="content_type">
              {({ state }) => {
                return (
                  // <ActionList>
                  //   <Box
                  //     sx={{
                  //       marginBottom: 2,
                  //     }}
                  //   >
                  //     <Text.Small>Select Content Type *</Text.Small>
                  //   </Box>
                  //   {Object.values(contentTypes).map((item, index) => (
                  //     <ActionList.Item
                  //       key={index}
                  //       sx={{
                  //         margin: 0,
                  //         width: "100%",
                  //       }}
                  //       onClick={() =>
                  //         Form.setFieldValue("content_type", item.content_type)
                  //       }
                  //     >
                  //       <Text.ParagraphSecondary>
                  //         {startCase(item.content_type)}
                  //       </Text.ParagraphSecondary>
                  //       {state.value === item.content_type && (
                  //         <ActionList.TrailingVisual>
                  //           <CheckCircleIcon />
                  //         </ActionList.TrailingVisual>
                  //       )}
                  //     </ActionList.Item>
                  //   ))}
                  // </ActionList>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Content Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(contentTypes).map((item, index) => (
                        <SelectItem
                          key={index}
                          value={item.content_type}
                          onChange={() =>
                            Form.setFieldValue(
                              "content_type",
                              item.content_type
                            )
                          }
                        >
                          {startCase(item.content_type)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      Creating Content...
                    </>
                  ) : (
                    "Create Content"
                  )}
                </Button>
              )}
            />
          </form>
        </PopoverBody>
      </PopoverContent>
      {/* </OverlayMenu> */}
    </Popover>
  );
}

export default CreateContent;
