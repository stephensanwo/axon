import { Fragment, useContext } from "react";
import { StyledHeaderPanel } from "./styles";
import Content from "src/components/Content";
import { useNoteMenuEvents } from "src/hooks/notes/useNoteMenuEvents";
import NoteContext from "src/context/notes";

const PublicNoteMenu = () => {
  const { noteMenu } = useNoteMenuEvents();
  const REGULAR_WIDTH: number = 385;
  const EXPANDED_WIDTH: number = window.innerWidth / 3 + 47;

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
          {noteMenu === "toggle-content" ? <Content /> : <Fragment></Fragment>}
        </StyledHeaderPanel>
      )}
    </Fragment>
  );
};

export default PublicNoteMenu;
