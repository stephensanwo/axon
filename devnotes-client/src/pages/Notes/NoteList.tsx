import React, { useContext } from "react";
import { NoteContext } from "../../context/notes";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { ListContainer } from "../../shared/pages";
import ListTable, { ListDataProps } from "../../components/ListTable";

const NoteList: React.FC = () => {
  const noteData = useContext(NoteContext);
  const { folderId } = useParams();
  const { pathname } = useLocation();

  const folder = noteData.folders.filter((folder) => folder.id === folderId)[0];

  const list_data: Array<ListDataProps> = folder.notes.map((note) => ({
    data: [
      note.name,
      note.category,
      note.description,
      note.created_on,
      note.last_edit,
    ],
    actions: true,
    link: `${pathname}/${note.id}`,
  }));

  return (
    <ListContainer>
      <ListTable
        header={[
          "Name",
          "Category",
          "Description",
          "Date Created",
          "Date Modified",
          "Actions",
        ]}
        body={list_data}
      />
    </ListContainer>
  );
};

export default NoteList;
