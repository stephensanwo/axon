import { Box } from "@primer/react";
import Select, { SelectMenuItem } from "src/components/Common/Select";

export function RowActionCell() {
  const options: SelectMenuItem[] = [
    {
      id: "newRowAbove",
      name: "Add Row Above",
      onClick: () => {},
    },
    {
      id: "newRowBelow",
      name: "Add Row Below",
      onClick: () => {},
    },
    {
      id: "copyRow",
      name: "Copy Row",
      onClick: () => {},
    },
    {
      id: "deleteRow",
      name: "Delete Row",
      onClick: () => {},
    },
  ];
  return (
    <Box
      sx={{
        width: "32px",
      }}
    >
      <Select<any>
        title={`Actions`}
        menuItems={options}
        data={[]}
        anchor="icon"
        iconProps={{
          style: {
            borderRadius: 0,
            width: "32px",
          },
        }}
      />
    </Box>
  );
}
