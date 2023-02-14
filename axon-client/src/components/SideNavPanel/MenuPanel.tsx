import React, { useState, useEffect, useContext, Fragment } from "react";
import {
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
  TextInput,
  Dropdown,
} from "carbon-components-react";
import { Folder16, Add24, FolderAdd24 } from "@carbon/icons-react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { NoteContext } from "../../context/notes";
import "./style.scss";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Modal from "../Modal";
import AppContext from "../../context/app";
import { NotesActionType } from "../../types/notes";

const StyledSideNavMenu = styled(SideNavMenu)`
  background-color: transparent;
`;

const StyledSideNav = styled(SideNav)`
  background-color: rgb(27, 27, 27);
  min-width: 320px;
`;

const SideNavPanel = () => {
  const noteData = useContext(NoteContext);
  const { isSideNavExpanded, onClickSideNavExpand } = useContext(AppContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const { pathname } = useLocation();
  const [clickedItemId, setClickedItemId] = useState("");
  const [clickedFolderId, setClickedFolderId] = useState("1");
  const [folderModal, setFolderModal] = useState("");
  const [noteModal, setNoteModal] = useState("");

  const toggleModal = (type: "folder" | "note") => {
    if (folderModal === "" && type === "folder") {
      setFolderModal("is-visible");
    } else if (noteModal === "" && type === "note") {
      setNoteModal("is-visible");
    } else {
      setFolderModal("");
      setNoteModal("");
    }
  };

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

  const handleNewFolder = () => {
    noteData.folderDispatch({
      type: NotesActionType.NEW_FOLDER,
      payload: {
        id: "1",
        name: "Untitled Folder",
        created_by: "Stephen Sanwo",
        created_on: Date.now().toLocaleString(),
        last_edit: Date.now().toLocaleString(),
        notes: [],
      },
    });
    // Create a temporary store for the folder details
    // Add folder to the context
    // Navigate to the new folder with react router navigate
  };

  console.log(noteData.folders);

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
            onClick={() => toggleModal("folder")}
            // onClick={handleNewFolder}
          >
            <h5 style={{ color: "#AEC948", paddingLeft: "20px" }}>
              New Folder
            </h5>
            <FolderAdd24 fill="#AEC948" />
          </div>
          <SideNavItems isSideNavExpanded={isSideNavExpanded}>
            {noteData.folders.map((folder, index) => (
              <StyledSideNavMenu
                key={index}
                id={folder.id}
                renderIcon={Folder16}
                title={folder.name}
                className="side-nav-menu-overrides"
                aria-current={
                  noteData.flowSelectedFolder === folder.id ? "folder" : ""
                }
                onClick={() => noteData.setFlowSelectedFolder(folder.id)}
              >
                <div
                  className="new-note-button"
                  // onClick={() => toggleModal("note")}
                >
                  <p
                    style={{
                      color: "#AEC948",
                      paddingLeft: "20px",
                      fontSize: "0.875rem",
                    }}
                  >
                    Add New Note
                  </p>
                  <Add24 fill="#AEC948" />
                </div>
                {folder.notes.map((note, index) => (
                  <SideNavMenuItem
                    key={index}
                    id={note.id}
                    onClick={(e: any) => handleMenuClick(e, folder.id, note.id)}
                    aria-current={clickedItemId === note.id ? "page" : ""}
                    className="side-nav-menu-item-overrides"
                  >
                    {note.name}
                  </SideNavMenuItem>
                ))}
              </StyledSideNavMenu>
            ))}
          </SideNavItems>
          {/* <Modal
            modal={folderModal}
            toggleModal={toggleModal}
            header={"Add New Folder"}
            size="sm"
          >
            <div>
              <TextInput
                id="folder-name"
                invalidText="A valid folder name is required"
                labelText=""
                placeholder="Folder Name"
              />
            </div>
          </Modal> */}
          {/* <Modal
            modal={noteModal}
            toggleModal={toggleModal}
            header={"Add New Note"}
            size="md"
          >
            <div>
              <TextInput
                id="note-name"
                invalidText="A valid note name is required"
                labelText="Note Name"
                placeholder="Give your note a name"
              />
              <div style={{ marginTop: "20px" }}></div>
              <TextInput
                id="note-description"
                invalidText="A valid note description is required"
                labelText="Note Description"
                placeholder="Short description of your note"
              />
            </div>
          </Modal> */}
        </StyledSideNav>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
};

export default SideNavPanel;
