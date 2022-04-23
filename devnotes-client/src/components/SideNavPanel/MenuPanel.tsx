import React, { useState, useEffect, useContext } from "react";
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

const StyledSideNavMenu = styled(SideNavMenu)`
  background-color: transparent;
`;
const StyledSideNav = styled(SideNav)`
  background-color: #262626;
  min-width: 320px;
`;

const noteCategory = [
  {
    id: "markdown",
    label: "Markdown Notes",
  },

  {
    id: "flow",
    label: "Flow Notes",
  },
  {
    id: "code-snippets",
    label: "Code Snippets",
  },
];

const SideNavPanel = () => {
  const noteData = useContext(NoteContext);
  const [showSideNav, setShowSideNav] = useState(false);
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
    if (window.innerWidth >= 1080) setShowSideNav(true);
  }, []);

  const handleMenuClick = (
    e: React.MouseEvent<HTMLElement>,
    folderId: string,
    noteId: string,
    link: string
  ) => {
    console.log(e);
    console.log(folderId);
    console.log(noteId);
    console.log(link);
    setClickedItemId(noteId);
    setClickedFolderId(folderId);
    // navigate(link);
  };

  const handleNewFolder = () => {
    // Create a temporary store for the folder details
    // Add folder to the context
    // Navigate to the new folder with react router navigate
  };

  return (
    <StyledSideNav
      isFixedNav
      expanded={showSideNav}
      isChildOfHeader={true}
      aria-label="Side navigation"
      style={{ paddingTop: "40px" }}
    >
      <div className="new-folder-button" onClick={() => toggleModal("folder")}>
        <h5 style={{ color: "#1192e8", paddingLeft: "20px" }}>New Folder</h5>
        <FolderAdd24 fill="#1192e8" />
      </div>
      <SideNavItems isSideNavExpanded={false}>
        {noteData.folders.map((folder, index) => (
          <StyledSideNavMenu
            key={index}
            id={folder.id}
            renderIcon={Folder16}
            title={folder.name}
            className="side-nav-menu-overrides"
            aria-current={clickedFolderId === folder.id ? "folder" : ""}
            onClick={(e: any) =>
              handleMenuClick(e, folder.id, "", `${pathname}/${folder.id}`)
            }
          >
            <div
              className="new-note-button"
              onClick={() => toggleModal("note")}
            >
              <p
                style={{
                  color: "#1192e8",
                  paddingLeft: "20px",
                  fontSize: "0.875rem",
                }}
              >
                Add New Note
              </p>
              <Add24 fill="#1192e8" />
            </div>
            {folder.notes.map((note, index) => (
              <SideNavMenuItem
                key={index}
                id={note.id}
                onClick={(e: any) =>
                  handleMenuClick(
                    e,
                    "",
                    note.id,
                    `${pathname}/${folder.id}/${note.id}`
                  )
                }
                aria-current={clickedItemId === note.id ? "page" : ""}
                className="side-nav-menu-item-overrides"
              >
                {note.name}
              </SideNavMenuItem>
            ))}
          </StyledSideNavMenu>
        ))}
      </SideNavItems>
      <Modal
        modal={folderModal}
        toggleModal={toggleModal}
        header={"Add New Folder"}
        size="sm"
      >
        <div>
          <TextInput
            id="folder-name"
            invalidText="A valid folder name is required"
            labelText="Folder Name"
            placeholder="Give your folder a name"
          />
        </div>
      </Modal>
      <Modal
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

          <div style={{ marginTop: "20px" }}></div>
          <Dropdown
            ariaLabel="Dropdown"
            items={noteCategory}
            titleText="Note Type"
            label="Select Note Type"
            onChange={"handleSelect"}
            invalid={false}
            invalidText={"Select at least one note type"}
            light={false}
          />
        </div>
      </Modal>
    </StyledSideNav>
  );
};

export default SideNavPanel;
