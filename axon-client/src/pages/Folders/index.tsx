import { useContext, Fragment, useEffect } from "react";
import { SideNav as CarbonSideNav, SideNavItems } from "@carbon/react";
import styled from "styled-components";
import AppContext from "src/context/app";
import { ThemeColors } from "src/shared/themes";
import FolderContext from "src/context/folder";
import EditFolder from "src/components/Folder/EditFolder";
import NewFolder from "src/components/Folder/NewFolder";
import EditNote from "src/components/Note/EditNote";
import NewNote from "src/components/Note/NewNote";
import { EmptyFolders } from "../../components/Folder/states/EmptyFolders";
import NewFolderButton from "src/components/Folder/buttons/NewFolderButton";
import FolderList from "./FolderList";
import LoadingFolders from "../../components/Folder/states/LoadingFolders";

const SideNav = styled(CarbonSideNav)`
  background-color: ${ThemeColors.bgDark};
  min-width: 320px;
  border-right: 1px solid ${ThemeColors.border};
  z-index: 110;
  top: 35px;
`;

const Folders = () => {
  const { isSideNavExpanded } = useContext(AppContext);
  const { folders, folderQuery, selectedNote, folderMenu, selectedFolder } =
    useContext(FolderContext);

  return (
    <Fragment>
      {isSideNavExpanded && (
        <SideNav
          tabIndex={1}
          isFixedNav
          expanded={isSideNavExpanded}
          isChildOfHeader={true}
          aria-label="Side Navigation"
        >
          {folderQuery.status === "error" && <EmptyFolders />}
          {folderQuery.status === "success" && <NewFolderButton />}
          {folderQuery.status === "loading" && (
            <SideNavItems>
              <LoadingFolders />
            </SideNavItems>
          )}
          <div style={{ overflowY: "scroll" }}>
            <FolderList folders={folders} />
          </div>
          {folderMenu.newFolder && <NewFolder />}
          {folderMenu.updateFolder && selectedFolder && (
            <EditFolder folder={selectedFolder} />
          )}
          {folderMenu.newNote && selectedFolder && (
            <NewNote folder={selectedFolder} />
          )}
          {folderMenu.updateNote && selectedNote && (
            <EditNote note={selectedNote} />
          )}
        </SideNav>
      )}
    </Fragment>
  );
};

export default Folders;
