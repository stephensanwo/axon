import { ActionList, ActionMenu, Truncate, useTheme } from "@primer/react";
import { BsClockHistory } from "react-icons/bs";
import { useFolderContext } from "src/hooks/folders/useFolderContext";

function PageHeader() {
  const { theme } = useTheme();
  const { selectedNote } = useFolderContext();
  return (
    <ActionMenu>
      <ActionMenu.Button size="small">
        <Truncate
          maxWidth={350}
          expandable={false}
          title={"Golang Developer Roadmap 2023 "}
        >
          {selectedNote?.note_name}
        </Truncate>
      </ActionMenu.Button>
      <ActionMenu.Overlay width="small" align="center">
        <ActionList>
          <ActionList.Group>
            <ActionList.Item onSelect={() => alert("Copy link clicked")}>
              Copy link
              <ActionList.TrailingVisual>
                <BsClockHistory fill={theme?.colors.text.primary} size={16} />
              </ActionList.TrailingVisual>
            </ActionList.Item>
            <ActionList.Item onSelect={() => alert("Quote reply clicked")}>
              Quote reply
              <ActionList.TrailingVisual>
                <BsClockHistory fill={theme?.colors.text.primary} size={16} />
              </ActionList.TrailingVisual>
            </ActionList.Item>
            <ActionList.Item onSelect={() => alert("Edit comment clicked")}>
              Edit comment
              <ActionList.TrailingVisual>
                <BsClockHistory fill={theme?.colors.text.primary} size={16} />
              </ActionList.TrailingVisual>
            </ActionList.Item>
          </ActionList.Group>
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
}

export default PageHeader;
