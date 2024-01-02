import { ContentBody, ContentContainer } from "../Shared/styles";
import { useLink } from "src/hooks/content/useLink";
import { EmbeddableUrl } from "../Shared/EmbeddableUrl";
import { ContentState } from "../Shared/ContentState";

export const Link = () => {
  const { link } = useLink();

  return (
    <ContentContainer>
      <ContentBody>
        {!link?.isLoadable ? (
          <ContentState
            description="Enter supported url to embed link"
            state="invalidUrl"
          />
        ) : (
          <EmbeddableUrl src={link?.url || ""} />
        )}
      </ContentBody>
    </ContentContainer>
  );
};
