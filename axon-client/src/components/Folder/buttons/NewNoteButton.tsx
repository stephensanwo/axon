import React, { useContext } from "react";
import FolderContext from "src/context/folder";
import { ThemeColors } from "src/shared/themes";
import { IFolderList } from "src/types/folders";
import styled from "styled-components";

const NewNoteButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  padding-left: 53px;
  padding-right: 16px;
  cursor: pointer;

  > p {
    color: ${ThemeColors.textDark};
    padding-left: 20px;

    :hover {
      color: ${ThemeColors.primary};
    }
  }
`;
const NewNoteButton: React.FC<{
  folder: IFolderList;
}> = (props) => {
  const { folderMenu, setFolderMenu, setSelectedFolder, selectedNote } =
    useContext(FolderContext);
  return (
    <NewNoteButtonWrapper
      className="new-note-button"
      onClick={() => {
        setFolderMenu({ ...folderMenu, newNote: true });
        setSelectedFolder(props.folder);
      }}
    >
      <p>Add New Note</p>
    </NewNoteButtonWrapper>
  );
};

export default NewNoteButton;
