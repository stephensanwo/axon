import { ActionList, ActionMenu, IconButton, Truncate } from "@primer/react";
import { KebabHorizontalIcon } from "@primer/octicons-react";
import React from "react";
import { useFolderContext } from "src/hooks/folders/useFolderContext";

function FolderMenu() {
  const { selectedNote } = useFolderContext();
  return (
    <ActionMenu>
      <ActionMenu.Anchor>
        <ActionMenu.Button size="small" variant="invisible">
          <Truncate
            maxWidth={350}
            expandable={false}
            title={"Golang Developer Roadmap 2023 "}
          >
            {selectedNote?.note_name}
          </Truncate>
        </ActionMenu.Button>
      </ActionMenu.Anchor>
      <ActionMenu.Overlay width="medium">
        <ActionList>
          <ActionList.Item onSelect={() => alert("Copy link clicked")}>
            Copy link
            <ActionList.TrailingVisual>⌘C</ActionList.TrailingVisual>
          </ActionList.Item>
          <ActionList.Item onSelect={() => alert("Quote reply clicked")}>
            Quote reply
            <ActionList.TrailingVisual>⌘Q</ActionList.TrailingVisual>
          </ActionList.Item>
          <ActionList.Item onSelect={() => alert("Edit comment clicked")}>
            Edit comment
            <ActionList.TrailingVisual>⌘E</ActionList.TrailingVisual>
          </ActionList.Item>
          <ActionList.Divider />
          <ActionList.Item
            variant="danger"
            onSelect={() => alert("Delete file clicked")}
          >
            Delete file
            <ActionList.TrailingVisual>⌘D</ActionList.TrailingVisual>
          </ActionList.Item>
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
}

export default FolderMenu;
