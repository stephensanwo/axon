import React, { useContext } from "react";
import { Folder } from "@carbon/pictograms-react";
import { Add32 } from "@carbon/icons-react";
import { NoteContext } from "../../context/notes";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import FolderIcon from "../../assets/icons/folder.svg";
import FolderAddIcon from "../../assets/icons/folder-add.svg";

const FolderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 80px;
`;

const FolderContent: React.FC = () => {
  const noteData = useContext(NoteContext);
  const { userId } = useParams();

  return (
    <FolderContainer>
      <div
        style={{
          width: "200px",
          height: "200px",
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
          <img
            src={FolderAddIcon}
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
            New Folder
          </small>
        </div>
      </div>
      {noteData.folders.map((folder, index) => (
        <Link
          key={index}
          style={{
            width: "200px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          to={`/folders/${userId}/${folder.id}`}
        >
          <img
            src={FolderIcon}
            alt=""
            style={{ width: "100px", height: "100px", fill: "#1192e8" }}
          />

          <div>
            <Link
              to={`/folders/${userId}/${folder.id}`}
              style={{ textAlign: "center", fontSize: "0.8rem" }}
            >
              {" "}
              {`${folder.name}`.slice(0, 20)}
              {folder.name.length > 20 ? "..." : ""}
            </Link>
          </div>
        </Link>
      ))}
    </FolderContainer>
  );
};

export default FolderContent;
