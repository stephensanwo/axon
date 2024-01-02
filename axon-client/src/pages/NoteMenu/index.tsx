import { Fragment, useContext } from "react";
import Settings from "src/components/Note/Settings";
import { StyledHeaderPanel } from "./styles";
import Content from "src/components/Content";
import NoteMenuList from "./NoteMenuList";
import { useNoteMenuEvents } from "src/hooks/notes/useNoteMenuEvents";
import PublishNote from "src/components/Note/PublishNote";
import UserInfo from "src/components/Note/UserInfo";
import NoteContext from "src/context/notes";
import Extensions from "src/components/Note/Extensions";

const NoteMenu = () => {
  const { note } = useContext(NoteContext);
  const { noteMenu } = useNoteMenuEvents();
  const REGULAR_WIDTH: number = 385;
  const EXPANDED_WIDTH: number = window.innerWidth / 3 + 47;
  // const FULLSCREEN_WIDTH: number = window.innerWidth - 320 - 47;
  const FULLSCREEN_WIDTH: number = window.innerWidth;

  return (
    <Fragment>
      {noteMenu !== null && (
        <StyledHeaderPanel
          expanded={true}
          width={
            noteMenu === "toggle-content"
              ? EXPANDED_WIDTH
              : noteMenu !== null && REGULAR_WIDTH
          }
          isDrawable={true}
          noteMenuPanel={noteMenu}
        >
          {noteMenu === "toggle-content" ? (
            <Content />
          ) : noteMenu === "toggle-settings" ? (
            <Settings />
          ) : noteMenu === "toggle-publish" ? (
            <PublishNote
              note={{
                user_id: note?.user_id,
                folder_id: note?.folder_id,
                note_id: note?.note_id,
                note_name: note?.note_name,
                description: note?.description,
                date_created: note?.date_created,
                last_edited: note?.last_edited,
              }}
            />
          ) : noteMenu === "toggle-user" ? (
            <UserInfo />
          ) : noteMenu === "toggle-extensions" ? (
            <Extensions />
          ) : (
            <Fragment></Fragment>
          )}
        </StyledHeaderPanel>
      )}
      <StyledHeaderPanel width={47}>
        <NoteMenuList />
      </StyledHeaderPanel>
    </Fragment>
  );
};

export default NoteMenu;
