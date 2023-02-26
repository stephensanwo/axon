import React, { useState, useEffect, useContext, Fragment } from "react";
import {
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
} from "@carbon/react";
import { Folder, AddAlt, FolderAdd, Pending } from "@carbon/icons-react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { NoteContext } from "../../context/notes";
import "./style.scss";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AppContext from "../../context/app";
import { NotesActionType } from "../../types/notes";
import { StateColors, ThemeColors } from "../../shared/themes";
import { NewFolder } from "../Folder";
import { NewNote } from "../Note";
import FolderContext from "context/folder";
import EditFolder from "components/Folder/EditFolder";
import OptionsButton from "./OptionsButton";
import { FolderListProps, FolderProps } from "types/folders";

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
  const { isSideNavExpanded, onClickSideNavExpand } = useContext(AppContext);
  const [clickedItemId, setClickedItemId] = useState("");
  const [folderModal, setFolderModal] = useState(false);
  const [editFolderModal, setEditFolderModal] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  const { folders, selectedNote, setSelectedNote } = useContext(FolderContext);
  const [selectedFolder, setSelectedFolder] = useState<FolderListProps>();

  useEffect(() => {
    if (window.innerWidth >= 1080) onClickSideNavExpand(true);
    setClickedItemId("1");
  }, [onClickSideNavExpand]);

  useEffect(() => {
    console.log(folders);
  }, [folders]);

  const handleNewNote = (selectedFolder: FolderListProps) => {
    setNoteModal(true);
    setSelectedFolder(selectedFolder);
  };

  console.log(selectedFolder);
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
                  renderIcon={() => (
                    <OptionsButton
                      action={setEditFolderModal}
                      onClick={() => setSelectedFolder(folder)}
                    />
                  )}
                  title={folder.name}
                  onClick={() => setSelectedFolder(folder)}

                  // aria-current={
                  //   selectedFolder?.folder_id === folder.folder_id
                  //     ? "folder"
                  //     : ""
                  // }
                >
                  <div
                    className="new-note-button"
                    onClick={() => handleNewNote(folder)}
                  >
                    <p
                      style={{
                        color: ThemeColors.primary,
                        paddingLeft: "20px",
                      }}
                    >
                      Add New Note
                    </p>
                    <AddAlt size="16" fill={ThemeColors.primary} />
                  </div>
                  {folder.notes !== null &&
                    folder.notes.map((note, index) => (
                      <SideNavMenuItem
                        key={index}
                        id={note.note_id}
                        onClick={() =>
                          setSelectedNote({
                            ...selectedNote,
                            folder_id: folder.folder_id,
                            note_id: note.note_id,
                          })
                        }
                        // aria-current={
                        //   clickedItemId === note.note_id ? "page" : ""
                        // }
                        className="side-nav-menu-item-overrides"
                        // className={`side-nav-menu-overrides ${
                        //   selectedNote.note_id === note.note_id
                        //     ? "side-nav-menu-item-overrides-selected"
                        //     : ""
                        // }`}
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
          {editFolderModal && selectedFolder && (
            <EditFolder
              folderModal={editFolderModal}
              setFolderModal={setEditFolderModal}
              folder={selectedFolder}
            />
          )}
          {noteModal && selectedFolder && (
            <NewNote
              noteModal={noteModal}
              setNoteModal={setNoteModal}
              folder={selectedFolder}
            />
          )}
        </StyledSideNav>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
};

export default SideNavPanel;
