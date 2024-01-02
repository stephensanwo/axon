import { useContext } from "react";
import NoteContext from "src/context/notes";
import { NoteMenuEvents } from "src/types/notes";

export const useNoteMenuEvents = (): {
  noteMenu: NoteMenuEvents | null;
  toggleNoteMenu: (selectedMenu: NoteMenuEvents) => void;
} => {
  const { noteMenu, setNoteMenu } = useContext(NoteContext);

  /*
  Toggle Note Menu
  
  */
  const toggleNoteMenu = (selectedMenu: NoteMenuEvents): void => {
    setNoteMenu((prevMenu) => {
      if (prevMenu === selectedMenu) {
        return null;
      } else {
        return selectedMenu;
      }
    });
  };

  return {
    noteMenu,
    toggleNoteMenu,
  };
};
