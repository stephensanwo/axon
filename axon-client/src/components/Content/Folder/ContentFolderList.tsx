import { useMemo } from "react";
import { FileTree, FileTreeProps } from "src/components/Tree";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { PiFolderFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { ContentFolderEntity } from "src/domain/content/content.entity";
import { useContentStore } from "src/context/content/hooks/useContentStore";

function ContentFolderList({
  contentFolders,
  activeFolderId = "",
}: {
  activeFolderId?: string;
  contentFolders: ContentFolderEntity[];
}) {
  const navigate = useNavigate();
  const { showFavoriteFolders, sortContentFoldersBy } = useContentStore();

  const sortedContentFolders = useMemo(() => {
    if (sortContentFoldersBy === "name") {
      return contentFolders.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortContentFoldersBy === "updated") {
      return contentFolders.sort((a, b) => b.updated.localeCompare(a.updated));
    }
    return contentFolders;
  }, [contentFolders, sortContentFoldersBy]);

  const pinnedFolders = useMemo(() => {
    return contentFolders.filter((folder) => folder.pinned);
  }, [contentFolders]);

  const pinnedFoldersTree: FileTreeProps = useMemo(() => {
    const items = pinnedFolders?.map((folder) => ({
      title: folder.name,
      isActive: activeFolderId === folder.id,
      action: {
        onClick: () => navigate(`/content/${folder.name}`),
      },
    }));
    return {
      title: "Favorites",
      isOpen: true,
      icon: <StarFilledIcon color="#E8C33F" />,
      items: items || [],
    };
  }, [pinnedFolders, activeFolderId]);

  const folderTree: FileTreeProps = useMemo(() => {
    const items = sortedContentFolders.map((folder) => ({
      title: folder.name,
      isActive: activeFolderId === folder.id,
      action: {
        onClick: () => navigate(`/content/${folder.name}`),
      },
    }));
    return {
      title: "Folders",
      isOpen: true,
      icon: <PiFolderFill color="#028b42" />,
      items: items || [],
    };
  }, [sortedContentFolders, activeFolderId, sortContentFoldersBy]);

  return (
    <FileTree
      trees={
        showFavoriteFolders ? [pinnedFoldersTree, folderTree] : [folderTree]
      }
    />
  );
}

export default ContentFolderList;
