import { NodeOptions, NodeTypes } from "src/types/node";
import { NoteMenuContentBody, NoteMenuContentHeader } from "../../styles";
import IconButton from "src/components/Button/IconButton";
import { Close } from "@carbon/icons-react";

const Config: React.FC<{
  nodeOption: NodeOptions | null;
  setNodeOption: React.Dispatch<React.SetStateAction<NodeOptions | null>>;
}> = ({ nodeOption, setNodeOption }) => {
  return (
    <>
      <NoteMenuContentHeader
        marginBottom={"32px"}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>{nodeOption?.name}</h2>
        <IconButton
          id={`close-${nodeOption?.id}`}
          name={`Close ${nodeOption?.name}`}
          onClick={() => setNodeOption(null)}
          width="24px"
          height="24px"
          borderradius="50%"
        >
          <Close size={18} />
        </IconButton>
      </NoteMenuContentHeader>
      <NoteMenuContentBody>
        <p>{nodeOption?.description}</p>
      </NoteMenuContentBody>
    </>
  );
};

export default Config;
