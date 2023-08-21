import React, { useContext, useState } from "react";
import { IconButton } from "@carbon/react";
import styled from "styled-components";
import "./style.scss";
import AppContext from "../../context/app";
import { StateColors, ThemeColors } from "../../shared/themes";
import { INoteModal } from "src/types/notes";
import FolderContext from "src/context/folder";
import PublishNote from "src/components/Note/PublishNote";
import { usePageActions } from "src/hooks/usePageActions";

interface PageHeaderProps {
  theme?: "dark" | "light";
  documentTitle: string;
}
export interface HeaderMenuProps {
  menuText: string;
  menuIcon: React.ReactNode;
  action?: any;
  isDisabled?: boolean;
  menuOptions: Array<{
    text: React.ReactNode;
    className: string;
    isDisabled: boolean;
    isDelete: boolean;
    action?: any;
  }>;
}

export const PageHeaderContainer = styled.div`
  width: 50vw;
  background-color: ${ThemeColors.bgDark};
  margin-left: 320px;
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

  const pageActions = usePageActions();

  return (
    <PageHeaderContainer expand={isSideNavExpanded && true}>
      <NavMenu>
        <NavActions>
          {pageActions.map((menu, index) => {
            return (
              <IconButton
                size="md"
                focusTrap={false}
                iconDescription={"Close"}
                key={index}
                ariaLabel="Close"
                onClick={menu.action}
                disabled={false}
                kind="secondary"
                style={{
                  width: "50px",
                  height: "47px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 0,
                }}
                label={""}
              >
                {menu.menuIcon}
              </IconButton>
            );
          })}
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
