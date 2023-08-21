import styled from "styled-components";

export const HeaderTextInput = styled.input`
  height: ${(props: { height: string }) => props.height};
  width: 100%;
  background-color: transparent;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0;
  padding: 0;
  text-align: left;
  font-family: "IBM Plex Sans", sans-serif;
  border: none;
  color: ${(props: { color: string }) => props.color};
  padding-right: 24px;

  ::placeholder {
    font-weight: 600;
    font-size: 1rem;
    font-family: "IBM Plex Sans", sans-serif;
    text-align: left;
    color: ${(props: { color: string }) => props.color};
  }
  :focus {
    outline: none;
    border: none;
  }
`;

export const HeaderTextContent = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0;
  padding: 0;
  text-align: left;
  color: ${(props: { color: string }) => props.color};

  :hover {
    cursor: text;
  }
`;

export const ParagraphInput = styled.textarea`
  height: ${(props: { height: string }) => props.height};
  width: calc(280px - 32px);
  background-color: transparent;
  margin: 0;
  text-align: left;
  overflow: auto;
  resize: none;
  font-size: 14px;
  font-weight: 400;
  font-family: "IBM Plex Sans", sans-serif;
  text-align: left;
  line-height: 1.4;
  letter-spacing: 0;
  border: none;
  color: ${(props: { color: string }) => props.color};

  ::placeholder {
    font-size: 14px;
    font-weight: 400;
    font-family: "IBM Plex Sans", sans-serif;
    text-align: left;
    line-height: 1.4;
    letter-spacing: 0;
    color: ${(props: { color: string }) => props.color};
  }
  :focus {
    outline: none;
    border: none;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const ParagraphTextContent = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-family: "IBM Plex Sans", sans-serif;
  line-height: 1.4;
  letter-spacing: 0;
  text-align: left;
  width: calc(280px - 32px);
  word-wrap: break-word;
  max-height: 38px;
  overflow: hidden;
  color: ${(props: { color: string }) => props.color};

  :hover {
    cursor: text;
  }
`;