import { ModalHeader, ModalBody, ComposedModal } from "@carbon/react";
import { INoteModal, ISelectedNote } from "src/types/notes";

const PublishNote: React.FC<{
  noteModal: INoteModal;
  setNoteModal: React.Dispatch<React.SetStateAction<INoteModal>>;
  note: ISelectedNote;
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
        title={note?.note_name}
        label={"Publish Note"}
        style={{ marginBottom: "20px" }}
      />
      <ModalBody></ModalBody>
    </ComposedModal>
  );
};

export default PublishNote;
