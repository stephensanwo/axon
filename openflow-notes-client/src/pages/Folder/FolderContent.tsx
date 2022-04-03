import React, { useContext } from "react";
import { Folder } from "@carbon/pictograms-react";
import { Add32 } from "@carbon/icons-react";
import { NoteContext } from "../../context/notes";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const FolderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 80px;
`;

const FolderContent: React.FC = () => {
  const noteData = useContext(NoteContext);
  const { pathname } = useLocation();
  return (
    <FolderContainer>
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
            New Folder
          </small>
        </div>
      </div>
      {noteData.folders.map((folder, index) => (
        <div
          key={index}
          style={{
            width: "150px",
            height: "150px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Folder fill="#262626" style={{ width: "100px", height: "100px" }} />
          <div>
            <Link
              to={`${pathname}/${folder.id}`}
              style={{ textAlign: "center", fontSize: "0.8rem" }}
            >
              {" "}
              {`${folder.name}`.slice(0, 20)}
              {folder.name.length > 20 ? "..." : ""}
            </Link>
          </div>
        </div>
      ))}
    </FolderContainer>
  );
};

export default FolderContent;
