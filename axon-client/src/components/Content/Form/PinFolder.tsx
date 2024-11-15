import { formOptions, useForm } from "@tanstack/react-form";
import {
  CreateContentFolderDto,
  UpdateContentFolderDto,
} from "src/domain/content/content.dto";
import {
  ContentFolderData,
  ContentFolderEntity,
} from "src/domain/content/content.entity";
import { Button } from "src/components/Common/Button";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { useContent } from "src/context/content/hooks/useContent";
import { Box } from "@primer/react";

export default function PinFolder({
  contentFolder,
}: {
  contentFolder: ContentFolderEntity;
}) {
  const { updateContentFolder } = useContent();

  const Form = useForm({
    onSubmit: async () => {
      const dto: UpdateContentFolderDto = {
        ...contentFolder,
        pinned: !contentFolder.pinned,
      };
      updateContentFolder.mutate(dto);
    },
  });

  return (
    <Box
      as="form"
      onSubmit={(e: any) => {
        e.preventDefault();
        Form.handleSubmit();
      }}
    >
      <Form.Subscribe
        selector={({ isSubmitting }) => [isSubmitting]}
        children={([isSubmitting]) => (
          <Button
            type="submit"
            variant="outline"
            size="icon"
            disabled={false}
            aria-label="Add Folder to Favorites"
          >
            {contentFolder.pinned ? (
              <StarFilledIcon color="#E8C33F" />
            ) : (
              <StarIcon />
            )}
          </Button>
        )}
      />
    </Box>
  );
}
