import React, { useContext } from "react";
import { NoteContext } from "../../context/notes";
import "@szhsin/react-menu/dist/index.css";
import { ListContainer } from "../../shared/pages";
import ListTable from "../../components/ListTable";
import { useLocation } from "react-router-dom";
import { ListDataProps } from "../../components/ListTable";

const FolderContent: React.FC = () => {
  const noteData = useContext(NoteContext);
  const { pathname } = useLocation();

  const list_data: Array<ListDataProps> = noteData.folders.map((folder) => ({
    data: [folder.name, folder.created_on, folder.last_edit],
    actions: true,
    link: `${pathname}/${folder.id}`,
  }));

  return (
    <ListContainer>
      <ListTable
        header={["Name", "Date Created", "Date Modified", "Actions"]}
        body={list_data}
      />
    </ListContainer>
  );
};

export default FolderContent;
