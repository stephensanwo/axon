import { ActionList, ActionMenu, Truncate } from "@primer/react";
import { IFolderList } from "src/types/folders";
import { IFolderDropdown } from "./index.types";
import FolderDropdownItems from "./FolderDropdownItems";
import FolderDorpdownMenu from "./FolderDorpdownMenu";

function FolderDropdown({ folder }: IFolderDropdown) {
  return (
    <ActionMenu>
      <ActionMenu.Anchor>
        <ActionMenu.Button size="small" variant="invisible">
          <Truncate
            maxWidth={350}
            expandable={false}
            title={"Golang Developer Roadmap 2023 "}
          >
            {folder?.folder_name}
          </Truncate>
        </ActionMenu.Button>
      </ActionMenu.Anchor>
      <ActionMenu.Overlay width="medium" align="center" maxHeight="large">
        <ActionList>
          {folder?.notes?.map((note, index) => (
            <FolderDropdownItems note={note} key={index} />
          ))}
          <FolderDorpdownMenu />
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
}

export default FolderDropdown;
