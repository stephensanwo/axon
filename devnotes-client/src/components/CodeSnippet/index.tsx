import React, { Fragment, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Heading5 } from "../../shared/layout";
import Code, { CodeProps } from "../../components/Code";
import { CodeSnippetProps, NoteContext } from "../../context/notes";
import { useParams } from "react-router-dom";
import CodeDescriptionPanel from "../CodeDescriptionPanel";

const CodeSnippetDiv = styled.div`
  width: 65%;
  padding: 20px;
  background-color: #262626;
  margin-bottom: 40px;
`;

const CodeSnippet = () => {
  const { folderId, noteId } = useParams();
  const noteData = useContext(NoteContext);
  const folder = noteData.folders.filter((folder) => folder.id === folderId)[0];
  const note = folder.notes.filter((note) => note.id === noteId)[0];
  const [codeData, setCodeData] = useState<Array<CodeSnippetProps>>(note.code);

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedCode = note.code;
    updatedCode.map((code) => {
      if (code.id === event.target.id) {
        console.log(event.target.value);
        return (code.code_text = event.target.value);
      }
    });

    let updatedNote = noteData.folders.map((folder) => {
      folder.notes.map((note) => {
        if (note.id === noteId) {
          return updatedCode;
        }
      });
      return folder;
    });

    noteData.setFolders([...updatedNote]);
  };

  return (
    <Fragment>
      {codeData.map((codeItem, index) => (
        <CodeSnippetDiv key={index}>
          <small>{codeItem.language_desc}</small>
          <Heading5 theme="dark">Code Snippet #{codeItem.id}</Heading5>
          <Code
            id={codeItem.id}
            language={codeItem.language}
            codeData={codeItem.code_text}
            handleCodeChange={handleCodeChange}
            placeholder={"Your code starts here"}
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              color: "#fff",
              backgroundColor: "#262626",
              fontFamily: "IBM Plex Mono",
              minHeight: "400px",
              width: "100%",
            }}
          />
        </CodeSnippetDiv>
      ))}
      <CodeDescriptionPanel expanded={true} />
    </Fragment>
  );
};

export default CodeSnippet;
