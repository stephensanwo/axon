import { useState, useEffect, useContext, Fragment, useRef } from "react";
import {
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
} from "@carbon/react";
import { AddAlt, FolderAdd } from "@carbon/icons-react";
import styled from "styled-components";
import "./style.scss";
import AppContext from "src/context/app";
import { ThemeColors } from "src/shared/themes";
import FolderContext from "src/context/folder";
import EditFolder from "src/components/Folder/EditFolder";
import OptionsButton from "./OptionsButton";
import { IFolderList } from "src/types/folders";
import { NewFolder } from "src/components/Folder";
import { NewNote } from "src/components/Note";
import { SkeletonText } from "@carbon/react";
import EditNote from "src/components/Note/EditNote";
import { LocalKeys } from "src/types/app";

const StyledSideNavMenu = styled(SideNavMenu)`
  background-color: transparent;
`;

const StyledSideNav = styled(SideNav)`
  background-color: ${ThemeColors.bgDark};
  min-width: 320px;
  padding-bottom: 40px;
  border-right: 1px solid ${ThemeColors.border};
`;

const Folders = () => {
  const { isSideNavExpanded, onClickSideNavExpand } = useContext(AppContext);
  const [detectHoverNote, setDetectHoverNote] = useState<string>("");
  const [folderModal, setFolderModal] = useState(false);
  const [editFolderModal, setEditFolderModal] = useState(false);
  const [newNoteModal, setNewNoteModal] = useState(false);
  const [updateNoteModal, setUpdateNoteModal] = useState(false);
  const { folders, folderStatus, selectedNote, setSelectedNote } =
    useContext(FolderContext);
  const [selectedFolder, setSelectedFolder] = useState<IFolderList>();

  useEffect(() => {
    if (window.innerWidth >= 1080) onClickSideNavExpand(true);
  }, [onClickSideNavExpand]);

  const handleNewNote = (selectedFolder: IFolderList) => {
    setNewNoteModal(true);
    setSelectedFolder(selectedFolder);
  };

  // Create a ref for the side navigation to handle outside click event
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        onClickSideNavExpand(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <Fragment>
      {isSideNavExpanded ? (
        <StyledSideNav
          // ref={navRef}
          tabIndex={1}
          isFixedNav
          expanded={isSideNavExpanded}
          isChildOfHeader={true}
          aria-label="Side Navigation"
          style={{ paddingTop: "40px" }}
        >
          {folderStatus === "success" && (
            <div
              className="new-folder-button"
              onClick={() => setFolderModal(true)}
            >
              <h6 style={{ color: ThemeColors.primary, paddingLeft: "20px" }}>
                New Folder
              </h6>
              <FolderAdd size="16" fill={ThemeColors.primary} />
            </div>
          )}
          {folderStatus === "loading" && (
            <SideNavItems>
              <div
                style={{
                  width: "90%",
                  margin: "auto",
                }}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonText
                    style={{
                      height: "32px",
                      backgroundColor: ThemeColors.bgDark2,
                    }}
                    key={index}
                  />
                ))}
              </div>
            </SideNavItems>
          )}
          <div style={{ overflowY: "scroll" }}>
            {folders && (
              <SideNavItems>
                {folders?.map((folder, index) => (
                  <StyledSideNavMenu
                    key={index}
                    id={folder.folder_id}
                    renderIcon={() => (
                      <OptionsButton
                        action={setEditFolderModal}
                        onClick={() => setSelectedFolder(folder)}
                      />
                    )}
                    title={folder.folder_name}
                    onClick={() => setSelectedFolder(folder)}
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
                    {folder.notes?.length > 0 &&
                      folder.notes?.map((note, index) => (
                        <SideNavMenuItem
                          key={index}
                          id={note?.note_id || ""}
                          onClick={() => {
                            setSelectedNote({
                              ...note,
                              folder_id: folder.folder_id,
                              folder_name: folder.folder_name,
                            });
                            // Set last note id and folder name in local storage
                            localStorage.setItem(
                              LocalKeys.LAST_NOTE_ID,
                              note.note_id
                            );
                            localStorage.setItem(
                              LocalKeys.LAST_FOLDER_ID,
                              folder.folder_id
                            );
                          }}
                          className={`side-nav-menu-item-overrides ${
                            selectedNote?.note_id === note?.note_id &&
                            "side-nav-menu-item-overrides-selected"
                          }`}
                          onMouseEnter={() => setDetectHoverNote(note.note_id)}
                          onMouseLeave={() => setDetectHoverNote("")}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "231px",
                            }}
                          >
                            {note?.note_name || ""}
                            {detectHoverNote &&
                              note?.note_id === detectHoverNote && (
                                <OptionsButton action={setUpdateNoteModal} />
                              )}
                          </div>
                        </SideNavMenuItem>
                      ))}
                  </StyledSideNavMenu>
                ))}
              </SideNavItems>
            )}
          </div>
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
          {newNoteModal && selectedFolder && (
            <NewNote
              noteModal={newNoteModal}
              setNoteModal={setNewNoteModal}
              folder={selectedFolder}
            />
          )}
          {updateNoteModal && selectedNote && (
            <EditNote
              noteModal={updateNoteModal}
              setNoteModal={setUpdateNoteModal}
              note={selectedNote}
            />
          )}
        </StyledSideNav>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
};

export default Folders;
