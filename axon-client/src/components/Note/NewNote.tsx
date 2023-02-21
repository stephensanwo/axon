import {
  TextInput,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ComposedModal,
} from "@carbon/react";

const NewNote: React.FC<{ noteModal: boolean }> = ({ noteModal }) => {
  return (
    <ComposedModal
      size="sm"
      modalHeading="Modal heading"
      modalLabel="Label"
      open={noteModal}
    >
      <ModalHeader title="Add New Note" />
      <ModalBody hasForm>
        <TextInput data-modal-primary-focus labelText="Note Name" />
        <div style={{ marginTop: "20px" }}></div>
        <TextInput data-modal-primary-focus labelText="Note Description" />
      </ModalBody>
      <ModalFooter primaryButtonText="OK" secondaryButtonText="Cancel" />
    </ComposedModal>
  );
};

export default NewNote;
