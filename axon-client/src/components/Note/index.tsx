import React, { useRef } from "react";
import { Box } from "@primer/react";
import { INote, NoteMenuTypes } from "src/types/notes";
import { useNoteContext } from "src/hooks/notes/useNoteContext";
import FlowTree from "src/components/FlowTree";
import { NoteMenuModalKeys } from "./NoteMenu/index.types";
import NodePanel from "../NodeOptions";
import { NoteModals } from "./NoteMenu/NoteModals";

function Note(props: INote) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { noteMenu, setNoteMenu } = useNoteContext();

  const renderModal = (noteMenu: NoteMenuTypes) => {
    return React.createElement(NoteModals[noteMenu as NoteMenuModalKeys], {
      props,
      noteMenuDialog: noteMenu,
      closeNoteMenuDialog: setNoteMenu,
      ref: buttonRef,
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <NodePanel />
      <FlowTree />
      {noteMenu !== null && renderModal(noteMenu)}
    </Box>
  );
}

export default Note;
