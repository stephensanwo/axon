import { Fragment, useContext } from "react";
import { ThemeColors } from "../../shared/themes";
import FolderContext from "src/context/folder";
import { Close } from "@carbon/icons-react";
import {
  NavButton,
  NavCloseButton,
  NavMenu,
  PageHeaderContainer,
} from "./styles";
import { useNoteEvents } from "src/hooks/notes/useNoteEvents";

const PageHeader = () => {
  const { folderQuery, activeNotes, selectedNote, folders, setSelectedNote } =
    useContext(FolderContext);
  const {
    getFilteredNotes,
    deleteActiveNotes,
    deleteCachedNote,
    setCachedNote,
  } = useNoteEvents();

  const filteredNotes = getFilteredNotes(folders!!, activeNotes);

  return (
    <Fragment>
      {folderQuery?.status === "success" && (
        <PageHeaderContainer>
          <NavMenu>
            {filteredNotes?.map((note, index) => (
              <NavButton
                isActive={note.note_id === selectedNote?.note_id}
                key={index}
              >
                <div
                  onClick={() => {
                    setSelectedNote?.(note);
                    // cacheActiveNotes(activeNotes, note.note_id); // cacheActiveNotes Not needed since the note is already in the activeNotes set
                    setCachedNote(note.note_id, note.folder_id);
                  }}
                  style={{
                    height: "100%",
                    padding: "8px 8px 8px 16px",
                  }}
                >
                  <div>
                    <small
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      {note.note_name}
                    </small>
                  </div>
                </div>
                <div
                  style={{
                    padding: "8px 8px 8px 8px",
                  }}
                >
                  <NavCloseButton
                    onClick={() => {
                      deleteActiveNotes(activeNotes, note.note_id);
                      deleteCachedNote();
                      const currentFilteredNotes = getFilteredNotes(
                        folders!!,
                        activeNotes
                      );
                      console.log(
                        "currentFilteredNotes",
                        currentFilteredNotes[currentFilteredNotes.length - 1]
                      );
                      setSelectedNote(
                        currentFilteredNotes[currentFilteredNotes.length - 1] ||
                          null
                      );
                      currentFilteredNotes.length > 0 &&
                        setCachedNote(
                          currentFilteredNotes[currentFilteredNotes.length - 1]
                            .note_id,
                          currentFilteredNotes[currentFilteredNotes.length - 1]
                            .folder_id
                        );
                    }}
                  >
                    <Close size={16} fill={ThemeColors.border} />
                  </NavCloseButton>
                </div>
              </NavButton>
            ))}
          </NavMenu>
        </PageHeaderContainer>
      )}
    </Fragment>
  );
};

export default PageHeader;
