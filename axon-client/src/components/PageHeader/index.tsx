import React, { useContext, useState } from "react";
import { OverflowMenu, OverflowMenuItem } from "@carbon/react";
import styled from "styled-components";
import "./style.scss";
import AppContext from "../../context/app";
import { StateColors } from "../../shared/themes";

import { AddAlt, Share } from "@carbon/icons-react";
import { INoteModal } from "src/types/notes";
import FolderContext from "src/context/folder";
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
    new: false,
    publish: false,
  });
  const { selectedNote } = useContext(FolderContext);
  const { note, noteDispatch } = useContext(NoteContext);

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
                type: "ADD_NODE",
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
                type: "ADD_NODE",
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
      menuText: "Publish Note",
      menuIcon: <Share size={16} />,
      menuOptions: [],
      action: () =>
        setNoteModal({
          ...noteModal,
          publish: true,
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
              disabled={!selectedNote.note_id && true}
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
