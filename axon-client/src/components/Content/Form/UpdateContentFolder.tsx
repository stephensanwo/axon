import { LuFolderEdit } from "react-icons/lu";
import { formOptions, useForm } from "@tanstack/react-form";
import { InlineSpinner } from "../../Common/Spinner";
import { Input } from "src/components/Common/Input";
import { formValidation } from "src/common/forms/forms.validation";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useContent } from "src/context/content/hooks/useContent";
import { Button } from "src/components/Common/Button";
import {
  ContentFolderData,
  ContentFolderEntity,
} from "src/domain/content/content.entity";
import { UpdateContentFolderDto } from "src/domain/content/content.dto";
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "src/components/Common/Popover";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/components/Common/Dialog";
import { DropdownMenuItem } from "src/components/Common/Dropdown";

function UpdateContentFolder({
  contentFolder,
  renderType = "popover",
}: {
  contentFolder: ContentFolderEntity;
  renderType?: "popover" | "dropdown-dialog";
}) {
  return renderType === "dropdown-dialog" ? (
    <Dialog>
      <DialogTrigger className="w-full">
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Rename Folder
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="top-[15%] max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Rename Folder</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <UpdateContentFolderForm contentFolder={contentFolder} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  ) : (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="outline"
          size="icon"
          disabled={false}
          aria-label="Update Folder"
        >
          <LuFolderEdit />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <PopoverHeader>Update Folder</PopoverHeader>
        <PopoverBody></PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

function UpdateContentFolderForm({
  contentFolder,
}: {
  contentFolder: ContentFolderEntity;
}) {
  const { updateContentFolder } = useContent();

  const formOpts = formOptions<ContentFolderData>({
    defaultValues: {
      name: contentFolder?.name || "",
      pinned: contentFolder?.pinned,
    },
  });

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      const dto: UpdateContentFolderDto = {
        ...contentFolder,
        ...value,
      };
      updateContentFolder.mutate(dto);
    },
  });
  return (
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
              placeholder="e.g. My Folder"
              value={state.value || ""}
              error={formValidation.fieldError(state.meta)}
              onChange={handleChange}
              onBlur={handleBlur}
              required={true}
              requiredText={`(${state.value?.length || 0}/50)`}
              htmlFor="update-content-folder-name"
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
                Updating Folder...
              </>
            ) : (
              "Update Folder"
            )}
          </Button>
        )}
      />
    </form>
  );
}

export default UpdateContentFolder;
