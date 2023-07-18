import React, { useContext, useState } from "react";
import { OverflowMenu, OverflowMenuItem } from "@carbon/react";
import styled from "styled-components";
import "./style.scss";
import AppContext from "../../context/app";
import { StateColors } from "../../shared/themes";
import DeleteNote from "src/components/Note/DeleteNote";

import {
  AddAlt,
  Edit,
  Information,
  ColorPalette,
  TrashCan,
  Share,
} from "@carbon/icons-react";
import { INoteModal } from "src/types/notes";
import FolderContext from "src/context/folder";
import NoteInfo from "src/components/Note/NoteInfo";
import PublishNote from "src/components/Note/PublishNote";
import NoteContext from "src/context/notes";

interface PageHeaderProps {
  theme?: "dark" | "light";
  documentTitle: string;
}

interface HeaderMenuProps {
  menuText: string;
  menuIcon: React.ReactNode;
  action?: any;
  menuOptions: Array<{
    text: string;
    className: string;
    isDisabled: boolean;
    isDelete: boolean;
    action?: any;
  }>;
}

export const PageHeaderContainer = styled.div`
  /* background-color: #262626; */
  border-bottom: 1px solid #393939;
  width: 100vw;
  top: 0;
  margin-top: 40px;
  position: fixed;
  z-index: 9000;
  height: 40px;
  padding-left: ${(props: { expand: boolean }) =>
    props.expand ? "320px" : "0px"};
`;

const NavMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavActions = styled.div`
  min-width: 50%;
  display: flex;
  justify-content: center;
`;

const OnlinePresence = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props: { isOnline: boolean }) =>
    props.isOnline ? StateColors.success : StateColors.warning};
`;

const NavDocumentTitle = styled.div`
  min-width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { isOnline, isSideNavExpanded } = useContext(AppContext);
  const [noteModal, setNoteModal] = useState<INoteModal>({
    delete: false,
    info: false,
    new: false,
    publish: false,
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const { selectedNote } = useContext(FolderContext);
  const { note, noteDispatch } = useContext(NoteContext);

  console.log(selectedNote);

  const HeaderMenu: Array<HeaderMenuProps> = [
    {
      menuText: "Add Node",
      menuIcon: <AddAlt size={16} />,
      menuOptions: [
        {
          text: "Default Node",
          className: "create-new-node",
          isDisabled: false,
          isDelete: false,
          action: () => {
            note &&
              noteDispatch({
                type: "add_node",
                payload: {
                  node_type: "input-node",
                  node_data: note,
                },
              });
          },
        },
        {
          text: "Connector",
          className: "marketplace-import",
          isDisabled: false,
          isDelete: false,
          action: () => {
            note &&
              noteDispatch({
                type: "add_node",
                payload: {
                  node_type: "anchor-node",
                  node_data: note,
                },
              });
          },
        },
      ],
    },
    {
      menuText: "Edit Note",
      menuIcon: <Edit size={16} />,
      menuOptions: [
        {
          text: "Create new node",
          className: "create-new-node",
          isDisabled: false,
          isDelete: false,
        },
        {
          text: "Import from marketplace",
          className: "marketplace-import",
          isDisabled: false,
          isDelete: false,
        },
        {
          text: "Import custom node",
          className: "custom-import",
          isDisabled: false,
          isDelete: false,
        },
      ],
    },
    {
      menuText: "Delete Note",
      menuIcon: <TrashCan size={16} />,
      menuOptions: [],
      action: () => setDeleteModal(true),
    },
    {
      menuText: "Node Styles",
      menuIcon: <ColorPalette size={16} />,
      menuOptions: [
        {
          text: "Create new node",
          className: "create-new-node",
          isDisabled: false,
          isDelete: false,
        },
        {
          text: "Import from marketplace",
          className: "marketplace-import",
          isDisabled: false,
          isDelete: false,
        },
        {
          text: "Import custom node",
          className: "custom-import",
          isDisabled: false,
          isDelete: false,
        },
      ],
    },
    {
      menuText: "Publish Note",
      menuIcon: <Share size={16} />,
      menuOptions: [],
      action: () =>
        setNoteModal({
          ...noteModal,
          publish: true,
        }),
    },
    {
      menuText: "Note Information",
      menuIcon: <Information size={16} />,
      menuOptions: [],
      action: () =>
        setNoteModal({
          ...noteModal,
          info: true,
        }),
    },
  ];

  return (
    <PageHeaderContainer expand={isSideNavExpanded && true}>
      <NavMenu>
        <NavActions>
          {HeaderMenu.map((menu, index) => (
            <OverflowMenu
              data-floating-menu-container
              size="md"
              renderIcon={() => menu.menuIcon}
              id="overflow-menu"
              focusTrap={false}
              iconDescription={menu.menuText}
              key={index}
              ariaLabel="Menu"
              onClick={menu.action}
            >
              {menu.menuOptions.map((option, index) => (
                <OverflowMenuItem
                  className={option.className}
                  itemText={option.text}
                  disabled={option.isDisabled}
                  isDelete={option.isDelete}
                  key={index}
                  onClick={option.action}
                />
              ))}
            </OverflowMenu>
          ))}
        </NavActions>
        <NavDocumentTitle>
          <p>{props.documentTitle}</p>
          <OnlinePresence isOnline={isOnline} />
        </NavDocumentTitle>
      </NavMenu>
      {deleteModal && (
        <DeleteNote
          noteModal={deleteModal}
          setNoteModal={setDeleteModal}
          note={selectedNote}
        />
      )}
      {noteModal.info && (
        <NoteInfo
          noteModal={noteModal}
          setNoteModal={setNoteModal}
          note={selectedNote}
        />
      )}
      {noteModal.publish && (
        <PublishNote
          noteModal={noteModal}
          setNoteModal={setNoteModal}
          note={selectedNote}
        />
      )}
    </PageHeaderContainer>
  );
};

export default PageHeader;
