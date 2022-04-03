import React, { useContext } from "react";
import { Assets } from "@carbon/pictograms-react";
import { Add32 } from "@carbon/icons-react";
import { NoteContext } from "../../context/notes";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

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
          width: "150px",
          height: "150px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
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
          <Add32 fill="#1192e8" />
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
      {folder.notes.map((note, index) => (
        <div
          key={index}
          style={{
            width: "150px",
            height: "150px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Assets fill="#262626" style={{ width: "80px", height: "80px" }} />
          <div>
            <Link
              to={`${pathname}/${note.id}`}
              style={{ textAlign: "center", fontSize: "0.8rem" }}
            >
              {" "}
              {`${note.name}`.slice(0, 20)}
              {note.name.length > 20 ? "..." : ""}
            </Link>
          </div>
        </div>
      ))}
    </NoteContainer>
  );
};

export default NoteList;
