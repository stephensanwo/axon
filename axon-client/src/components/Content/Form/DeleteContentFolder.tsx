import { Text } from "../../Common/Text";
import { formOptions, useForm } from "@tanstack/react-form";
import { InlineSpinner } from "../../Common/Spinner";
import { useContent } from "src/context/content/hooks/useContent";
import { Button } from "src/components/Common/Button";
import { ContentFolderEntity } from "src/domain/content/content.entity";
import { Input } from "src/components/Common/Input";
import { LuFolderX } from "react-icons/lu";
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

function DeleteContentFolder({
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
          Delete Folder
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="top-[15%] max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Delete Folder</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DeleteContentFolderForm contentFolder={contentFolder} />
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
          aria-label="Delete Folder"
        >
          <LuFolderX />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <PopoverHeader>Delete Folder</PopoverHeader>
        <PopoverBody>
          <DeleteContentFolderForm contentFolder={contentFolder} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

function DeleteContentFolderForm({
  contentFolder,
}: {
  contentFolder: ContentFolderEntity;
}) {
  const { deleteContentFolder } = useContent();

  const formOpts = formOptions<{ confirmation: string }>({
    defaultValues: {
      confirmation: "",
    },
  });

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      if (value.confirmation !== "DELETE") {
        return;
      }
      deleteContentFolder.mutate([contentFolder.id]);
    },
  });

  const confirmation = Form.useStore((state) => state.values.confirmation);
  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e: any) => {
        e.preventDefault();
        Form.handleSubmit();
      }}
    >
      <Text.SmallSecondary
        sx={{
          textAlign: "center",
        }}
      >
        {`Are you sure you want to delete this folder and all its contents? This action CANNOT be undone.`}
      </Text.SmallSecondary>
      <Form.Field name="confirmation">
        {({ state, handleChange, handleBlur }) => {
          return (
            <Input.Text
              label=""
              placeholder="Type DELETE to confirm"
              value={state.value || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              required={true}
              requiredIndicator={false}
              requiredText=""
              htmlFor="delete-content-folder-confirmation"
              error={""}
            />
          );
        }}
      </Form.Field>
      <Form.Subscribe
        selector={({ isSubmitting }) => [isSubmitting]}
        children={([isSubmitting]) => (
          <Button
            type="submit"
            variant="outline-destructive"
            disabled={isSubmitting || confirmation !== "DELETE"}
            size="default"
          >
            {isSubmitting ? (
              <>
                <InlineSpinner />
                {`Deleting Folder...`}
              </>
            ) : (
              `Delete Folder`
            )}
          </Button>
        )}
      />
    </form>
  );
}

export default DeleteContentFolder;
