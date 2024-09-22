import { Truncate, useTheme } from "@primer/react";
import Select, { SelectMenuItem } from "src/components/Common/Select";
import { BaseContentProps } from "../index.types";

function ContentListNav({
  navTitle,
}: {
  navTitle: string;
} & BaseContentProps) {
  const { theme } = useTheme();
  const options: SelectMenuItem[] = [
    {
      id: "projects",
      name: "Projects",
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
          title={navTitle}
          maxWidth={150}
          expandable
          sx={{
            color: theme?.colors.text.gray,
          }}
        >
          {navTitle}
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

export default ContentListNav;
