import { ActionList, ActionMenu, Truncate, useTheme } from "@primer/react";
import { BsClockHistory } from "react-icons/bs";

function PageHeaderMenu() {
  const { theme } = useTheme();
  return (
    <ActionMenu.Overlay width="large" align="center">
      <ActionList>
        <ActionList.GroupHeading as="h1">Recent Notes</ActionList.GroupHeading>
        <ActionList.Group>
          <ActionList.Item onSelect={() => alert("Copy link clicked")}>
            Copy link
            <ActionList.Description variant="block">
              Roadmaps | 2 mins ago
            </ActionList.Description>
            <ActionList.TrailingVisual>
              <BsClockHistory fill={theme?.colors.text.primary} size={16} />
            </ActionList.TrailingVisual>
          </ActionList.Item>
          <ActionList.Item onSelect={() => alert("Quote reply clicked")}>
            Quote reply
            <ActionList.Description variant="block">
              Roadmaps | 2 mins ago
            </ActionList.Description>
            <ActionList.TrailingVisual>
              <BsClockHistory fill={theme?.colors.text.primary} size={16} />
            </ActionList.TrailingVisual>
          </ActionList.Item>
          <ActionList.Item onSelect={() => alert("Edit comment clicked")}>
            Edit comment
            <ActionList.Description variant="block">
              Roadmaps | 2 mins ago
            </ActionList.Description>
            <ActionList.TrailingVisual>
              <BsClockHistory fill={theme?.colors.text.primary} size={16} />
            </ActionList.TrailingVisual>
          </ActionList.Item>
        </ActionList.Group>
      </ActionList>
    </ActionMenu.Overlay>
  );
}

export default PageHeaderMenu;
