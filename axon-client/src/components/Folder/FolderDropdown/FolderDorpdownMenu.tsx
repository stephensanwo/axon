import { ActionList } from "@primer/react";
import React from "react";

function FolderDorpdownMenu() {
  return (
    <>
      <ActionList.Item onSelect={() => alert("Copy link clicked")}>
        Edit Folder
        <ActionList.TrailingVisual>⌘C</ActionList.TrailingVisual>
      </ActionList.Item>
      <ActionList.Item
        onSelect={() => alert("Copy link clicked")}
        variant="danger"
      >
        Delete Folder
        <ActionList.TrailingVisual>⌘C</ActionList.TrailingVisual>
      </ActionList.Item>
    </>
  );
}

export default FolderDorpdownMenu;
