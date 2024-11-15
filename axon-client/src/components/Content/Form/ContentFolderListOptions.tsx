import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { SettingsIcon } from "lucide-react";
import { Button } from "src/components/Common/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "src/components/Common/Dropdown";
import { useContentStore } from "src/context/content/hooks/useContentStore";
import { ContentSortVariants } from "src/context/content/index.types";

function ContentFolderListOptions() {
  const {
    showFavoriteFolders,
    setShowFavoriteFolders,
    sortContentFoldersBy,
    setSortContentFoldersBy,
  } = useContentStore();

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
      <DropdownMenuContent align="center">
        <form>
          <DropdownMenuLabel>Content Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowFavoriteFolders(!showFavoriteFolders)}
          >
            {showFavoriteFolders
              ? "Hide Favorite Folders"
              : "Show Favorite Folders"}
            <DropdownMenuShortcut>
              {showFavoriteFolders ? (
                <StarFilledIcon color="#E8C33F" />
              ) : (
                <StarIcon />
              )}
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Sort Folders By</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={sortContentFoldersBy}
            onValueChange={(value) =>
              setSortContentFoldersBy(value as ContentSortVariants)
            }
          >
            <DropdownMenuRadioItem value={"name"}>Name</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="updated">
              Updated
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="created">
              Created
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ContentFolderListOptions;
