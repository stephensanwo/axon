import React, { useState, useEffect, useContext, Fragment } from "react";
import {
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
} from "@carbon/react";
import { Folder, Add, FolderAdd } from "@carbon/icons-react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { NoteContext } from "../../context/notes";
import "./style.scss";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AppContext from "../../context/app";
import { NotesActionType } from "../../types/notes";
import { ThemeColors } from "../../shared/themes";
import { NewFolder } from "../Folder";
import { NewNote } from "../Note";
import FolderContext from "../../context/folder";

const StyledSideNavMenu = styled(SideNavMenu)`
  background-color: transparent;
`;

const StyledSideNav = styled(SideNav)`
  background-color: #262626;
  min-width: 320px;
  padding-bottom: 40px;
  position: fixed;
`;

const SideNavPanel = () => {
  const noteData = useContext(NoteContext);
  const { user, isSideNavExpanded, onClickSideNavExpand } =
    useContext(AppContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const { pathname } = useLocation();
  const [clickedItemId, setClickedItemId] = useState("");
  const [clickedFolderId, setClickedFolderId] = useState("1");
  const [folderModal, setFolderModal] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  const { folders } = useContext(FolderContext);
  console.log(user);
  console.log(folders);

  useEffect(() => {
    if (window.innerWidth >= 1080) onClickSideNavExpand(true);
    setClickedItemId("1");
    noteData.setFlowSelectedFolder("1");
  }, [onClickSideNavExpand]);

  const handleMenuClick = (
    e: React.MouseEvent<HTMLElement>,
    folderId: string,
    noteId: string
  ) => {
    setClickedItemId(noteId);
    // noteData.setFlowSelectedFolder(folderId);
    navigate(`/${userId}/folders/${folderId}/${noteId}`);
  };

  console.log(noteData.flowSelectedFolder);

  return (
    <Fragment>
      {isSideNavExpanded ? (
        <StyledSideNav
          isFixedNav
          expanded={isSideNavExpanded}
          isChildOfHeader={true}
          aria-label="Side navigation"
          style={{ paddingTop: "40px" }}
        >
          <div
            className="new-folder-button"
            onClick={() => setFolderModal(true)}
            style={{ marginBottom: "10px" }}
          >
            <h6 style={{ color: ThemeColors.primary, paddingLeft: "20px" }}>
              New Folder
            </h6>
            <FolderAdd size="16" fill={ThemeColors.primary} />
          </div>
          <SideNavItems>
            {folders &&
              folders.map((folder, index) => (
                <StyledSideNavMenu
                  key={index}
                  id={folder.folder_id}
                  renderIcon={() => <Folder size="16" />}
                  title={folder.name}
                  className="side-nav-menu-overrides"
                  aria-current={
                    noteData.flowSelectedFolder === folder.folder_id
                      ? "folder"
                      : ""
                  }
                  onClick={() =>
                    noteData.setFlowSelectedFolder(folder.folder_id)
                  }
                >
                  <div
                    className="new-note-button"
                    onClick={() => setNoteModal((prevCheck) => !prevCheck)}
                  >
                    <p
                      style={{
                        color: ThemeColors.primary,
                        paddingLeft: "20px",
                        fontSize: "0.875rem",
                      }}
                    >
                      Add New Note
                    </p>
                    <Add size="24" fill={ThemeColors.primary} />
                  </div>
                  {folder.notes !== null &&
                    folder.notes.map((note, index) => (
                      <SideNavMenuItem
                        key={index}
                        id={note.note_id}
                        onClick={(e: any) =>
                          handleMenuClick(e, folder.folder_id, note.note_id)
                        }
                        aria-current={
                          clickedItemId === note.note_id ? "page" : ""
                        }
                        className="side-nav-menu-item-overrides"
                      >
                        {note.name}
                      </SideNavMenuItem>
                    ))}
                </StyledSideNavMenu>
              ))}
          </SideNavItems>
          {folderModal && (
            <NewFolder
              folderModal={folderModal}
              setFolderModal={setFolderModal}
            />
          )}
          {noteModal && <NewNote noteModal={noteModal} />}
        </StyledSideNav>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
};

export default SideNavPanel;
