import React, { useContext } from "react";
import { Assets } from "@carbon/pictograms-react";
import { Add32 } from "@carbon/icons-react";
import { NoteContext } from "../../context/notes";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FileAdd from "../../assets/icons/file-add.svg";
import FileCode from "../../assets/icons/file-code.svg";
import FileNote from "../../assets/icons/file-note.svg";
import FileFlow from "../../assets/icons/file-flow.svg";

const NoteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 80px;
`;

const NoteList: React.FC = () => {
  const noteData = useContext(NoteContext);
  const { folderId } = useParams();
  const { pathname } = useLocation();

  console.log(noteData);
  const folder = noteData.folders.filter((folder) => folder.id === folderId)[0];

  return (
    <NoteContainer>
      <div
        style={{
          width: "200px",
          height: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={FileAdd}
            alt=""
            style={{ width: "100px", height: "100px", fill: "#1192e8" }}
          />
        </div>
        <div>
          <small
            style={{
              color: "#1192e8",
              textAlign: "center",
              fontSize: "0.8rem",
            }}
          >
            New Note
          </small>
        </div>
      </div>
      {folder.notes.length > 0 ? (
        folder.notes.map((note, index) => (
          <Link
            key={index}
            style={{
              width: "200px",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              cursor: "pointer",
            }}
            to={`${pathname}/${note.id}`}
          >
            {note.category === "flow" ? (
              <img
                src={FileFlow}
                alt=""
                style={{ width: "100px", height: "100px", fill: "#1192e8" }}
              />
            ) : note.category === "code-snippet" ? (
              <img
                src={FileCode}
                alt=""
                style={{ width: "100px", height: "100px", fill: "#1192e8" }}
              />
            ) : note.category === "notes" ? (
              <img
                src={FileNote}
                alt=""
                style={{ width: "100px", height: "100px", fill: "#1192e8" }}
              />
            ) : (
              <img
                src={FileNote}
                alt=""
                style={{ width: "100px", height: "100px", fill: "#1192e8" }}
              />
            )}
            <div title={note.name}>
              <Link
                to={`${pathname}/${note.id}`}
                style={{ textAlign: "center", fontSize: "0.8rem" }}
              >
                {`${note.name}`.slice(0, 20)}
                {note.name.length > 20 ? "..." : ""}
              </Link>
            </div>
          </Link>
        ))
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h4 style={{ color: "#565656" }}>Empty folder, Add a new note</h4>
        </div>
      )}
    </NoteContainer>
  );
};

export default NoteList;
