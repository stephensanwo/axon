import { ActionList } from "@primer/react";
import React from "react";
import { INoteSummary } from "src/types/folders";

function FolderDropdownItems({ note }: { note: INoteSummary }) {
  return (
    <ActionList.Item onSelect={() => alert("Copy link clicked")}>
      {note.note_name}
      <ActionList.TrailingVisual>⌘C</ActionList.TrailingVisual>
    </ActionList.Item>
  );
}

export default FolderDropdownItems;
