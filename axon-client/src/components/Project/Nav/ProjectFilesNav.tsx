import { Truncate, useTheme } from "@primer/react";
import Select, { SelectMenuItem } from "src/components/Common/Select";
import { BaseProjectProps } from "../index.types";

function ProjectFilesNav({
  navTitle,
}: {
  navTitle: string;
} & BaseProjectProps) {
  const { theme } = useTheme();
  const options: SelectMenuItem[] = [];

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

export default ProjectFilesNav;
