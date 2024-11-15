import { Truncate, useTheme } from "@primer/react";
import Select, { SelectMenuItem } from "src/components/Common/Select";

function ContentViewNav({ navTitle }: { navTitle: string }) {
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
      width={"small"}
      textProps={{ variant: "invisible" }}
    />
  );
}

export default ContentViewNav;
