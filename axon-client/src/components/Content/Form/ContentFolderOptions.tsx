import {
  CopyIcon,
  ExternalLinkIcon,
  StarFilledIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { formOptions, useForm } from "@tanstack/react-form";
import { SettingsIcon } from "lucide-react";
import { Button } from "src/components/Common/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "src/components/Common/Dropdown";
import { useContent } from "src/context/content/hooks/useContent";
import { UpdateContentFolderDto } from "src/domain/content/content.dto";
import {
  ContentFolderData,
  ContentFolderEntity,
} from "src/domain/content/content.entity";
import UpdateContentFolder from "./UpdateContentFolder";
import DeleteContentFolder from "./DeleteContentFolder";

function ContentFolderOptions({
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
    onSubmit: async () => {
      const dto: UpdateContentFolderDto = {
        ...contentFolder,
        pinned: !contentFolder.pinned,
      };
      updateContentFolder.mutate(dto);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          disabled={false}
          aria-label="Update Content"
          size="icon"
        >
          <SettingsIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <form>
          <DropdownMenuLabel>Folder Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              window.open(`${window.location.href}`, "_blank");
            }}
          >
            Open in New Tab
            <DropdownMenuShortcut>
              <ExternalLinkIcon />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.href}`);
            }}
          >
            Copy Link
            <DropdownMenuShortcut>
              <CopyIcon />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <UpdateContentFolder
            contentFolder={contentFolder}
            renderType="dropdown-dialog"
          />
          <Form.Field name="pinned">
            {() => {
              return (
                <DropdownMenuItem
                  onClick={() => {
                    Form.handleSubmit();
                  }}
                >
                  {contentFolder.pinned
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                  <DropdownMenuShortcut>
                    {contentFolder.pinned ? (
                      <StarFilledIcon color="#E8C33F" />
                    ) : (
                      <StarIcon />
                    )}
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              );
            }}
          </Form.Field>
          <DropdownMenuSeparator />
          <DeleteContentFolder
            contentFolder={contentFolder}
            renderType="dropdown-dialog"
          />
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ContentFolderOptions;
