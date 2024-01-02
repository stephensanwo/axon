import {
  Settings,
  Share,
  NotebookReference,
  UserAvatar,
  Cube,
} from "@carbon/icons-react";
import IconButton from "src/components/Button/IconButton";
import { ThemeColors } from "src/shared/themes";
import { NavActions } from "./styles";
import { useNoteMenuEvents } from "src/hooks/notes/useNoteMenuEvents";
import { useContext } from "react";
import FolderContext from "src/context/folder";
import AuthContext from "src/context/auth";
import NoteContext from "src/context/notes";

const NoteMenuList: React.FC<{
  isPublic?: boolean;
}> = ({ isPublic }) => {
  const { noteQuery } = useContext(NoteContext);
  const { toggleNoteMenu } = useNoteMenuEvents();
  const { selectedNote, folderQuery } = useContext(FolderContext);
  const { user } = useContext(AuthContext);
  return (
    <NavActions>
      <IconButton
        id="toggle-content"
        name="Toggle Content"
        onClick={() => toggleNoteMenu("toggle-content")}
        width="47px"
        height="47px"
        selected={false}
        hideTooltip={true}
        background={ThemeColors.bgDark}
        disabled={
          selectedNote?.note_id === undefined || noteQuery?.status !== "success"
        }
      >
        <NotebookReference size={20} />
      </IconButton>
      {!isPublic && (
        <>
          <IconButton
            id="toggle-publish"
            name="Toggle Publish"
            onClick={() => toggleNoteMenu("toggle-publish")}
            width="47px"
            height="47px"
            selected={false}
            hideTooltip={true}
            background={ThemeColors.bgDark}
            disabled={
              selectedNote?.note_id === undefined ||
              noteQuery?.status !== "success"
            }
          >
            <Share size={20} />
          </IconButton>
          <IconButton
            id="toggle-extensions"
            name="Toggle Extensions"
            onClick={() => toggleNoteMenu("toggle-extensions")}
            width="47px"
            height="47px"
            selected={false}
            hideTooltip={true}
            background={ThemeColors.bgDark}
            disabled={
              selectedNote?.note_id === undefined ||
              noteQuery?.status !== "success"
            }
          >
            <Cube size={20} />
          </IconButton>
          <IconButton
            id="toggle-settings"
            name="Toggle Settings"
            onClick={() => toggleNoteMenu("toggle-settings")}
            width="47px"
            height="47px"
            selected={false}
            hideTooltip={true}
            background={ThemeColors.bgDark}
            disabled={
              selectedNote?.note_id === undefined ||
              noteQuery?.status !== "success"
            }
          >
            <Settings size={20} />
          </IconButton>
          <IconButton
            id="toggle-settings"
            name="Toggle Settings"
            onClick={() => toggleNoteMenu("toggle-user")}
            width="47px"
            height="47px"
            selected={false}
            hideTooltip={true}
            background={ThemeColors.bgDark}
            disabled={user === undefined || folderQuery.status === "error"}
          >
            <UserAvatar size={20} />
          </IconButton>
        </>
      )}
    </NavActions>
  );
};

export default NoteMenuList;
