import React, { useMemo } from "react";
import { SideNavItems } from "@carbon/react";
import FolderListItem from "src/components/Folder/FolderListItem";
import { IFolderList } from "src/types/folders";

const FolderList: React.FC<{
  folders: IFolderList[] | null;
}> = ({ folders }) => {
  const folderList = useMemo(() => {
    {
      return (
        folders && (
          <SideNavItems>
            {folders?.map((folder, index) => (
              <FolderListItem key={index} index={index} folder={folder} />
            ))}
          </SideNavItems>
        )
      );
    }
  }, [folders]);
  return <>{folderList}</>;
};

export default FolderList;
