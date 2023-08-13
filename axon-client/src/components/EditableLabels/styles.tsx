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
  color: #000;

  ::placeholder {
    font-weight: 600;
    font-size: 1rem;
    font-family: "IBM Plex Sans", sans-serif;
    text-align: left;
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
  color: #000;

  :hover {
    cursor: text;
  }
`;

export const HeaderTitleInput = styled.input`
  height: ${(props: { height: string }) => props.height};
  min-width: 600px;
  background-color: transparent;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0;
  padding: 0;
  text-align: left;
  color: #000;

  ::placeholder {
    font-size: 2rem;
    font-weight: 600;
    font-family: "IBM Plex Sans", sans-serif;
    text-align: left;
  }
  :focus {
    outline: none;
    border: none;
  }
`;

export const ParagraphInput = styled.textarea`
  height: ${(props: { height: string }) => props.height};
  width: calc(280px - 32px);
  background-color: transparent;
  margin: 0;
  text-align: left;
  color: #000;
  overflow: auto;
  resize: none;
  font-size: 14px;
  font-weight: 400;
  font-family: "IBM Plex Sans", sans-serif;
  text-align: left;
  line-height: 1.4;
  letter-spacing: 0;
  border: none;

  ::placeholder {
    font-size: 14px;
    font-weight: 400;
    font-family: "IBM Plex Sans", sans-serif;
    text-align: left;
    line-height: 1.4;
    letter-spacing: 0;
    color: #000;
  }
  :focus {
    outline: none;
    border: none;
  }
`;

export const ParagraphTextContent = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-family: "IBM Plex Sans", sans-serif;
  line-height: 1.4;
  letter-spacing: 0;
  text-align: left;
  color: #000;
  width: calc(280px - 32px);

  :hover {
    cursor: text;
  }
`;