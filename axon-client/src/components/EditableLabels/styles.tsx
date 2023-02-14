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
  color: #fff;

  ::placeholder {
    font-weight: 400;
    font-size: 16px;
    font-family: "IBM Plex Sans", sans-serif;
    text-align: left;
  }
  :focus {
    outline: none;
    border: none;
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
  color: #fff;

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

export const LabelInput = styled.input`
  height: ${(props: { height: string }) => props.height};
  width: 100%;
  background-color: transparent;
  font-size: 0.675rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.16px;
  padding: 0;
  text-align: left;
  color: #1192e8;

  ::placeholder {
    font-weight: 600;
    font-size: 0.675rem;
    font-family: "IBM Plex Sans", sans-serif;
    text-align: left;
    color: #1192e8;
  }
  :focus {
    outline: none;
    border: none;
  }
`;

export const ParagraphInput = styled.textarea`
  height: ${(props: { height: string }) => props.height};
  width: 220px;
  height: 50px;
  background-color: transparent;
  line-height: 1.4;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.16px;
  margin: 0;
  margin-top: 0.3rem;
  text-align: left;
  color: #f4f4f4;
  overflow: auto;
  resize: none;

  ::placeholder {
    font-size: 12px;
    font-weight: 400;
    font-family: "IBM Plex Sans", sans-serif;
    text-align: left;
    color: #f4f4f4;
  }
  :focus {
    outline: none;
    border: none;
  }
`;
