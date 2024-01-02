import styled from "styled-components";

const AxonIFrame = styled.iframe`
  margin: 0;
  width: 100%;
  height: 100%;
`;

export const EmbeddableUrl: React.FC<{
  src: string;
}> = ({ src }) => {
  return (
    <AxonIFrame
      src={src}
      allow="autoplay; encrypted-media;"
      style={{
        margin: 0,
      }}
      referrerPolicy="no-referrer"
      loading="lazy"
    />
  );
};
