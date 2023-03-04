import React, { useContext, useState } from "react";
import { OverflowMenu, OverflowMenuItem, Tag } from "@carbon/react";
import styled from "styled-components";
import "./style.scss";
import AppContext from "../../context/app";
import { StateColors, ThemeColors } from "../../shared/themes";
import DeleteNote from "components/Note/DeleteNote";

import {
  AddAlt,
  Edit,
  Information,
  ColorPalette,
  TrashCan,
  Share,
} from "@carbon/icons-react";
import { NoteProps } from "types/notes";

interface PageHeaderProps {
  theme?: "dark" | "light";
  documentTitle: string;
  note: NoteProps;
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
  const [deleteModal, setDeleteModal] = useState(false);

  const HeaderMenu: Array<HeaderMenuProps> = [
    {
      menuText: "Add Node",
      menuIcon: <AddAlt size={16} />,
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
      menuText: "Note Information",
      menuIcon: <Information size={16} />,
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
          note={props.note}
        />
      )}
    </PageHeaderContainer>
  );
};

export default PageHeader;
