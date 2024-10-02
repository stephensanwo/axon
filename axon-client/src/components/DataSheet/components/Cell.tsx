import { CellContext } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import { flushSync } from "react-dom";
import { TableMeta } from "../index.types";
import { Input } from "src/components/Common/Input";
import { Text } from "src/components/Common/Text";
import { Box, useTheme } from "@primer/react";

export function EditableCell({
  getValue,
  row,
  column,
  table,
}: CellContext<Record<string, string>, unknown>) {
  const initialValue = getValue() as string;
  const [value, setValue] = useState(initialValue);

  const debouncedOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      flushSync(() => {
        setValue(e.target.value);
        (table.options.meta as TableMeta).updateData(
          table,
          row.index,
          column.id,
          e.target.value
        );
      });
    },
    [row.index, column.id, table.options.meta]
  );

  const onBlur = () => {
    flushSync(() => {
      (table.options.meta as TableMeta).updateData(
        table,
        row.index,
        column.id,
        value
      );
    });
  };

  return (
    <Input.Box
      value={value}
      onChange={(e) => debouncedOnChange(e)}
      onBlur={onBlur}
      autoFocus={
        (table.options.meta as TableMeta).focusedCell?.rowIndex === row.index &&
        (table.options.meta as TableMeta).focusedCell?.columnId === column.id
      }
      onKeyDown={(e) => {
        if (
          e.shiftKey &&
          e.key === "Enter" &&
          table.getRowModel().rows.length === row.index + 1
        ) {
          (table.options.meta as TableMeta).addRow(
            table,
            table.getRowModel().rows.length
          );
        }
      }}
    />
  );
}

export function TextCell({
  getValue,
  row,
  column,
  table,
}: CellContext<Record<string, string>, unknown>) {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: theme?.colors.bg.default,
        width: "100%",
        border: "none",
        outline: "none",
        height: "32px",
        padding: "0 8px",
      }}
    >
      <Text.Paragraph
        sx={{
          color: theme?.colors.text.gray,
          fontSize: "12px",
          fontFamily: theme?.fonts.mono,
        }}
      >
        {"Data"}
      </Text.Paragraph>
    </Box>
  );
}
