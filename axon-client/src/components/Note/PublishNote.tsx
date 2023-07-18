import { ModalHeader, ModalBody, ComposedModal } from "@carbon/react";
import { NoteProps, INoteModal } from "src/types/notes";

const PublishNote: React.FC<{
  noteModal: INoteModal;
  setNoteModal: React.Dispatch<React.SetStateAction<INoteModal>>;
  note: NoteProps;
}> = ({ note, noteModal, setNoteModal }) => {
  return (
    <ComposedModal
      size="sm"
      open={noteModal}
      onClose={() =>
        setNoteModal({
          ...noteModal,
          publish: false,
        })
      }
      preventCloseOnClickOutside={true}
    >
      <ModalHeader
        title={note?.name}
        label={"Publish Note"}
        style={{ marginBottom: "20px" }}
      />
      <ModalBody></ModalBody>
    </ComposedModal>
  );
};

export default PublishNote;
