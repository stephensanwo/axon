import { Box } from "@primer/react";
import { Input } from "../../Common/Input";
import { useState } from "react";

function RowSelector({
  rowId,
  onChangeCallback,
}: {
  rowId: string;
  onChangeCallback: (isChecked: boolean) => void;
}) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Input.Checkbox
        label=""
        checked={isChecked}
        error={""}
        onChange={() => {
          setIsChecked(!isChecked);
          onChangeCallback(!isChecked);
        }}
        htmlFor={`row-selector-${rowId}`}
        type="checkbox"
      />
    </Box>
  );
}

export default RowSelector;
