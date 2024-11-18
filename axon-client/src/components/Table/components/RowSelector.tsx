import { Box } from "@primer/react";
import { Input } from "../../Common/Input";

function RowSelector({
  rowId,
  onChangeCallback,
  checked,
}: {
  rowId: string;
  onChangeCallback: (isChecked: boolean) => void;
  checked: boolean;
}) {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Input.Checkbox
        label=""
        checked={checked}
        error={""}
        onChange={() => {
          onChangeCallback(!checked);
        }}
        htmlFor={`row-selector-${rowId}`}
        type="checkbox"
        sx={{
          marginBottom: "2px",
        }}
      />
    </Box>
  );
}

export default RowSelector;
