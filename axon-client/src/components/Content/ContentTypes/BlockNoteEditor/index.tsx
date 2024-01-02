import { useContext } from "react";
import { ContentBody, ContentContainer } from "../Shared/styles";
import { BlockNoteEditor as AxonBlockNoteEditor } from "src/components/BlockNoteEditor";
import NoteContext from "src/context/notes";

const BlockNoteEditor = () => {
  const { selectedNode } = useContext(NoteContext);

  return (
    <ContentContainer>
      <ContentBody>
        <AxonBlockNoteEditor namespace={selectedNode?.id!!} />
      </ContentBody>
    </ContentContainer>
  );
};

export default BlockNoteEditor;
