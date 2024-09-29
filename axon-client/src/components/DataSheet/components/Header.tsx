import { Box, useTheme } from "@primer/react";
import { HeaderContext } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import { flushSync } from "react-dom";
import { TableMeta } from "../index.types";
import Select, { SelectMenuItem } from "src/components/Common/Select";
import { Input } from "src/components/Common/Input";

// EditableHeader component
export function EditableHeader({
  column,
  table,
  header,
}: HeaderContext<Record<string, string>, unknown>) {
  const initialValue = column.columnDef.header as string;
  const [value, setValue] = useState(initialValue);
  const { theme } = useTheme();

  const debouncedOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      (table.options.meta as TableMeta).updateHeader(table, column.id, value);
    },
    [column.id, table.options.meta]
  );

  const onBlur = () => {
    (table.options.meta as TableMeta).updateHeader(table, column.id, value);
  };

  const options: SelectMenuItem[] = [
    {
      id: "moveColumnLeft",
      name: "Move Column Left",
      onClick: () => {
        (table.options.meta as TableMeta).moveColumn(table, column.id, "left");
      },
    },
    {
      id: "moveColumnRight",
      name: "Move Column Right",
      onClick: () => {
        (table.options.meta as TableMeta).moveColumn(table, column.id, "right");
      },
    },
    {
      id: "duplicateColumn",
      name: "Duplicate Column",
      onClick: () => {
        (table.options.meta as TableMeta).duplicateColumn(table, column.id);
      },
    },
    {
      id: "deleteColumn",
      name: "Delete Column",
      onClick: () => {
        (table.options.meta as TableMeta).deleteColumn(table, column.id);
      },
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Input.Box
        value={value}
        onChange={(e) => debouncedOnChange(e)}
        onBlur={onBlur}
      />
      <Select<any>
        title={`Actions`}
        menuItems={options}
        data={[]}
        anchor="icon"
        iconProps={{
          style: {
            borderRadius: 0,
          },
        }}
      />
      <div
        style={{
          width: "2px",
          backgroundColor: header.column.getIsResizing()
            ? theme?.colors.primary.default
            : "transparent",
          cursor: "col-resize",
        }}
        onMouseDown={header.getResizeHandler()}
        onTouchStart={header.getResizeHandler()}
      ></div>
    </Box>
  );
}
