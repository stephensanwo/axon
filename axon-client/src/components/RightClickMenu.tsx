import { Menu, MenuItem } from "@carbon/react";

export const RightClickMenu = () => {
  return (
    <Menu>
      <MenuItem label="Copy" shortcut="⌘C" />
      <MenuItem label="Paste" shortcut="⌘V" disabled />
      <MenuItem label="Delete" kind="danger" />
    </Menu>
  );
};
