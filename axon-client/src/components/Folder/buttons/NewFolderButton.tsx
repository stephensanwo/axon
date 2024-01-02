import { useContext } from "react";
import FolderContext from "src/context/folder";
import { ThemeColors } from "src/shared/themes";
import styled from "styled-components";

const NewFolderButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  padding-left: 35px;
  padding-right: 15px;
  cursor: pointer;

  > h6 {
    color: ${ThemeColors.textDark};
    padding-left: 22px;

    :hover {
      color: ${ThemeColors.primary};
    }
  }
`;

const NewFolderButton = () => {
  const { folderMenu, setFolderMenu } = useContext(FolderContext);

  return (
    <NewFolderButtonWrapper
      className="new-folder-button"
      onClick={() => setFolderMenu({ ...folderMenu, newFolder: true })}
      style={{ marginTop: "24px" }}
    >
      <h6>New Folder</h6>
    </NewFolderButtonWrapper>
  );
};

export default NewFolderButton;
