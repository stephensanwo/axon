import {
  NoteMenuContainer,
  NoteMenuContent,
  NoteMenuContentBody,
  NoteMenuContentHeader,
} from "./styles";
import { CodeSnippet } from "@carbon/react";
import { useContext } from "react";
import { BASE_URL } from "src/config";
import NoteContext from "src/context/notes";
import { useNoteMutation } from "src/hooks/notes/useNoteMutation";
import { ThemeColors } from "src/shared/themes";
import { INoteSummary } from "src/types/folders";
import { AxonButton } from "../Button";
import { Share } from "@carbon/icons-react";

const PublishNote: React.FC<{
  note: INoteSummary;
}> = (props) => {
  const { publicId } = useContext(NoteContext);
  const { publishPublicNote } = useNoteMutation(props.note);
  return (
    <NoteMenuContainer>
      <NoteMenuContent>
        <NoteMenuContentHeader marginBottom={"32px"}>
          <h2>Publish Note</h2>
        </NoteMenuContentHeader>
        <NoteMenuContentHeader marginBottom={"16px"}>
          Public Url
        </NoteMenuContentHeader>
        <NoteMenuContentBody>
          <CodeSnippet
            type="single"
            feedback="Copied"
            copyButtonDescription="Copy"
            style={{
              width: "99%",
            }}
          >
            {publicId?.length!! > 0
              ? `${BASE_URL() + "public/note/" + publicId}`
              : "Click share to display url"}
          </CodeSnippet>
          <div
            style={{
              width: "100%",
              display: "flex",
            }}
          >
            <small
              style={{
                color: ThemeColors.textDark,
                fontSize: "12px",
                fontStyle: "italic",
              }}
            >
              ⚠️ Note that anyone with the public url will be able to view the
              note. Sharing notes privately is not yet supported.
            </small>
          </div>
          <AxonButton
            id="publish-public-note"
            kind="primary"
            renderIcon={() => <Share size="16" />}
            iconDescription={"Make Note Public"}
            style={{ marginTop: "8px" }}
            maxWidth={"100%"}
            height={"40px"}
            size="md"
            onClick={() => {
              publishPublicNote.mutate("publish-public-note");
            }}
            disabled={publicId || publishPublicNote.isLoading ? true : false}
          >
            {publishPublicNote.isLoading ? "Publishing..." : "Share"}
          </AxonButton>
        </NoteMenuContentBody>
      </NoteMenuContent>
    </NoteMenuContainer>
  );
};

export default PublishNote;
