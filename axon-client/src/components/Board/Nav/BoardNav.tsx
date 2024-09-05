import { Truncate, useTheme } from "@primer/react";
import Select, { SelectMenuItem } from "src/components/Common/Select";
import { BaseBoardProps } from "../index.types";

function BoardNav({
  isLoading,
  boardState,
}: {
  isLoading: boolean;
} & BaseBoardProps) {
  const { theme } = useTheme();
  const boardNavTitle = `${isLoading ? "..." : boardState.board?.name}`;

  const options: SelectMenuItem[] = [
    {
      id: "notes",
      name: "Notes",
      onClick: (item: string) => {},
    },
    {
      id: "documents",
      name: "Documents",
      onClick: (item: string) => {},
    },
  ];

  return (
    <Select
      title={
        <Truncate
          title={boardNavTitle}
          maxWidth={150}
          expandable
          sx={{
            color: theme?.colors.text.gray,
          }}
        >
          {boardNavTitle}
        </Truncate>
      }
      menuItems={options}
      data={""}
      anchor="text"
      width={"auto"}
      textProps={{ variant: "invisible" }}
    />
  );
}

export default BoardNav;
